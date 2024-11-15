<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Carbon\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Storage;

class ArchiveLog extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:archive-log';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Archive Log to S3';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        if (!App::isLocal()) {
            // Initiate
            $localDisk = Storage::disk('localLog');
            $cloudDisk = Storage::disk('s3');

            // Directory /logs/<yyyy-mm-dd>/<host-private-ip>/<log-files>.log
            $hostPrivateIP = getHostByName(getHostName());
            $now = now()->format('Y-m-d');
            $pathPrefix = 'logs' . DIRECTORY_SEPARATOR . $now . DIRECTORY_SEPARATOR . $hostPrivateIP . DIRECTORY_SEPARATOR;
            if(!Storage::exists($pathPrefix)){
                Storage::makeDirectory($pathPrefix);
            }

            $logFiles = $localDisk->allFiles();
            foreach ($logFiles as $file) {
                // Only push VALID logs file
                $fileNameRaw = basename($file);
                if (str($fileNameRaw)->endsWith('.log')) {
                    $fileName = str_replace('laravel', '', $fileNameRaw);
                    $fileDate = str_replace('.log', '', $fileName);
                    $fileDate = $fileDate != '' ? $fileDate : $now;

                    // Only PUT/Overwrite newest log file
                    if($fileDate >= $now) {
                        $contents = $localDisk->get($file);
                        $cloudLocation = $pathPrefix . $fileNameRaw;
                        $cloudDisk->put($cloudLocation, $contents);
                    }
                }
            }
        }
        else {
            logger()->info('[ArchiveLog] ArchiveLog not backing up in local');
        }
    }
}
