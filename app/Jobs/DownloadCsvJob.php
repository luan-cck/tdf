<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Services\DownloadService;

class DownloadCsvJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $request;
    protected $jobId;
    protected $downloadService;

    /**
     * Create a new job instance.
     */
    public function __construct($request, $jobId, DownloadService $downloadService)
    {
        $this->request = $request;
        $this->jobId = $jobId;
        $this->downloadService = $downloadService;
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        $this->downloadService->processDownload($this->request, $this->jobId);
    }
   
}
