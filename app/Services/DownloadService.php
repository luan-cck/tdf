<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Aws\S3\S3Client;
use ZipArchive;
use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Promise\Utils;
use Aws\Exception\AwsException;
use App\Repositories\RequestForm\RequestFormRepositoryInterface;
use App\Constants;
use Illuminate\Support\Str;

class DownloadService
{
    protected $bucket;
    protected $requestFormRepository;

    public function __construct(RequestFormRepositoryInterface $requestFormRepository)
    {
        $this->bucket = config('filesystems.disks.s3.bucket');
        $this->requestFormRepository = $requestFormRepository;
    }

    public function processDownload($request, $jobId)
    {
        try {
            if (isset($request['selectAll'])) {
                $dataReturns = $this->requestFormRepository->dataExportCsv($request);
            } else {
                $dataReturns = $this->requestFormRepository->dataExportCsv(json_decode($request['arrayRequest'], true));
            }

            $rows = $this->generateRows($dataReturns);

            $date = now()->format('Ymd');
            $time = now()->format('Hi');
            $randomString = Str::random(6);

            // Generate and save CSV
            $csvContent = $this->generateCsvContent($this->getTitle(), $rows);
            $filenameCsv = 'user_info' . $date . '_' . $time .'_' . $randomString . '.csv';
            // Storage::disk('local')->put($filenameCsv, $csvContent);
            // $filePathCsv = Storage::disk('local')->path($filenameCsv);
            $filePathCsv = storage_path($filenameCsv);
            file_put_contents($filePathCsv, $csvContent);

            $tempDir = storage_path('temp_images_'. $date . '_' . $time .'_' . $randomString);
            if (!file_exists($tempDir)) {
                mkdir($tempDir, 0755, true);
            }
            DB::beginTransaction();
            $keys = $this->requestFormRepository->getPathFiles($dataReturns->pluck('id'));
            DB::commit();

            // Compress downloaded images into a zip file

            $zipFilePath = storage_path('受付一覧_' . $date . '_' . $time .'_' . $randomString . '.zip');
            if (!file_exists($zipFilePath)) {
                touch($zipFilePath);
                chmod($zipFilePath, 0755);
            }

            $promises = $this->createS3DownloadPromises($keys, $tempDir);

            // Execute the batch requests
            $results = Utils::settle($promises['promises'])->wait();

            foreach ($results as $key => $result) {
                if ($result['state'] === 'fulfilled') {
                    Log::info("Successfully downloaded file: " . $keys[$key]);
                } else {
                    Log::error("Failed to download file: " . $key . " - Reason: " . $result['reason']);
                }
            }

            $this->zipImagesAndCsv($tempDir, $filePathCsv, $zipFilePath, $promises['pathFile']);

            // Delete the temporary folder containing the images
            $this->deleteDirectory($tempDir);

            // Store the file path in cache for later retrieval
            Cache::put('job_' . $jobId, basename($zipFilePath), 1200); // cache for 20 minutes

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Error in DownloadService: " . $e->getMessage());
        }
    }

    private function getS3Config()
    {
        return [
            'region' => config('filesystems.disks.s3.region'),
            'version' => 'latest',
            'credentials' => [
                'key' => config('filesystems.disks.s3.key'),
                'secret' => config('filesystems.disks.s3.secret'),
            ],
        ];
    }

    private function getTitle()
    {
        return [
            '管理番号', // 1: request_id
            '業務番号 ', //2 default 002
            '証券番号', // 3: policy_number
            '証券番号_枝番', //4 default 00
            '申出受付番号', //5: application_reception_number
            '契約者氏名', //6: contractor_name
            '改姓_契約者氏名', //7: name (field in customers) (B9FE)
            '電話番号', //8: phone
            '親権者氏名', //9: Parent's name
            '続柄', //10: Relationship
            '申出受付日時', //11:date_approved
            '照会番号', //12 request_uid
            '金融機関名', //13: bank_name, 
            '金融機関コード', //14: bank_code
            '支店名', //15: branh_name
            '支店コード', //16: branh_code
            '種目', //17: bank_type
            '口座番号', //18: account_number
            '口座名義人名', //19: account_name
            '解約理由', //20 cancellation_reason
            '解約理由（その他）', //21
            '支払通貨', //22 currency
            'D02_証券口座_証券会社名', //19
            'D02_証券口座_取扱店番号', //20
            'D02_証券口座_口座番号', //21
            'D02_証券口座_口座名義人名', //22
            'D12_証券口座_証券会社名', //23
            'D12_証券口座_取扱店番号', //24
            'D12_証券口座_口座番号', //25
            'D12_証券口座_口座名義人名', //26
            'D14_証券口座_証券会社名', //27
            'D14_証券口座_口座番号', //28
            'D14_証券口座_口座名義人名', //29
            'D11_金融機関名（円', //30
            'D11_金融機関コード（円）', //31
            'D11_支店名（円）', //32
            'D11_支店コード（円）', //33
            'D11_種目（円）', //34
            'D11_口座番号（円）', //35
            'D11_口座名義人名（円）', //36
            'D11_金融機関名（外貨）', //37
            'D11_金融機関コード（外貨）', //38
            'D11_支店名（外貨）', //39
            'D11_支店コード（外貨）', //40
            'D11_種目（外貨）', //41
            'D11_口座番号（外貨）', //42
            'D11_口座名義人名（外貨' //43:
        ];
    }

    private function generateRows($dataReturns)
    {
        $rows = [];
        foreach ($dataReturns as $item) {
            $rows[] = [
                '0' . '022' . (string)$item->application_reception_number . (string)$item->policy_number . '00' . '00000',
                '022',
                $item->policy_number,
                '00',
                $item->application_reception_number,
                $item->contractor_name,
                $item->customer_name,
                $item->phone,
                isset($item->related_customer_name) ? $item->related_customer_name : '',
                isset($item->relationship_type) ? $item->relationship_type : '',
                $item->created_at,
                $item->request_uid,
                $item->bank_name,
                $item->bank_code,
                $item->bank_info_branch_name,
                $item->bank_info_branch_code,
                $item->bank_info_bank_type,
                $item->bank_info_account_number,
                $item->bank_info_account_name,
                $item->cancellation_reason,
                $item->other_cancellation_reason,
                !empty($item->bank_info_currency) ? Constants::CURRENCY_LABELS[$item->bank_info_currency] : '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                ''
            ];
        }
        return $rows;
    }

    private function generateCsvContent($title, $rows)
    {
        $data = array_merge([$title], $rows);
        return implode(PHP_EOL, array_map(function ($row) {
            return implode(',', $row);
        }, $data));
    }

    private function createS3DownloadPromises($keys, $tempDir)
    {
        $s3 = new S3Client($this->getS3Config());
        $promises = [];
        $pathFile = [];
        foreach ($keys as $key) {

            $desiredPath = $this->generateRelativePath($key);
            $tempFilePath = $tempDir . '/' . $desiredPath;
            $directory = dirname($tempFilePath);

            if (!file_exists($directory)) {
                mkdir($directory, 0755, true);
            }
            $pathFile[] = $desiredPath;
            $promises[] = $s3->getObjectAsync([
                'Bucket' => $this->bucket,
                'Key' => $key,
                'SaveAs' => $tempFilePath,
            ])->then(
                function ($result) use ($tempFilePath) {
                    // Log::info("Downloaded and saved file to: " . $tempFilePath);
                },
                function ($reason) use ($key) {
                    Log::error("Failed to download file: " . $key);
                }
            );
        }
        return [
            'promises' => $promises,
            'pathFile' => $pathFile
        ];
    }

    private function zipImagesAndCsv($sourceDir, $csvFilePath, $zipFilePath, $partKeys)
    {
        $folder = now()->format('Ymd') . '/' . '022_' . now()->format('Ymd-Hms');
        $zip = new ZipArchive;
        if ($zip->open($zipFilePath, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
            throw new \Exception("Failed to open ZIP file: " . $zipFilePath);
        }

        // Add CSV file to the ZIP archive
        if (!file_exists($csvFilePath)) {
            throw new \Exception("CSV file does not exist: " . $csvFilePath);
        }

        $csvFileName = $folder . '/' . 'user_info.csv';
        $zip->addFile($csvFilePath, $csvFileName);

        foreach ($partKeys as $path) {
            $filePath = $sourceDir . '/' . $path;
            $relativePath = $folder . '/' . $path;
            $zip->addFile($filePath, $relativePath);
        }

        $zip->close();
        if (file_exists($csvFilePath)) {
            unlink($csvFilePath);
        }
    }

    private function generateRelativePath($path) {

        $parts = explode('/', $path);
        
        $fileName = end($parts);

        $prevFolderName = prev($parts);
        $explodeFolder = explode('_', $prevFolderName);
        $subFolder = ($explodeFolder[3] ?? '' ) . ($explodeFolder[5] ?? '' );
        $subFolder = $subFolder != '' ? 'C022' . $subFolder : $prevFolderName;

        $prefix = '';
        if (strlen($prevFolderName) > 16) {
            $prefix = substr($prevFolderName, 0, -16) . '_';
        }
        $fileName = $prefix . $fileName;

        $fileDir = $subFolder . '/' . $fileName;
        return $fileDir;
    }

    // Delete folder and files within it
    private function deleteDirectory($dirPath)
    {
        if (!is_dir($dirPath)) {
            return;
        }

        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($dirPath, RecursiveDirectoryIterator::SKIP_DOTS),
            RecursiveIteratorIterator::CHILD_FIRST
        );

        foreach ($files as $fileinfo) {
            $todo = ($fileinfo->isDir() ? 'rmdir' : 'unlink');
            $todo($fileinfo->getRealPath());
        }

        rmdir($dirPath);
    }
}
