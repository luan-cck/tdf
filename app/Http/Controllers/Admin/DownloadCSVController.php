<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\RequestForm\RequestFormRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Jobs\DownloadCsvJob;
use App\Services\DownloadService;
use Illuminate\Support\Facades\Cache;
use Log;

class DownloadCSVController extends Controller
{

    public function __construct() {

    }

    public function downloadReceptionCsv(Request $request, DownloadService $downloadService)
    {
        $jobId = Str::uuid()->toString();
        DownloadCsvJob::dispatch($request->all(), $jobId, $downloadService);

        return response()->json(['jobId' => $jobId]);
    }

    public function checkJobStatus($jobId)
    {
        if (Cache::has('job_' . $jobId)) {
            return response()->json([
                'file' => url('/admin/download-file/' . $jobId)
            ]);
        }
        return response()->json(['status' => 'processing']);
    }

    public function getDownload($jobId)
    {
        $file = Cache::get('job_' . $jobId);
        return response()->download(storage_path(basename($file)))->deleteFileAfterSend(true);
    }

}
