<?php

namespace App\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait FileUpload
{
    function uploadFileToS3(UploadedFile $file, $s3Path="/static/files/") {
        $result = Storage::disk('s3')->put($s3Path, $file->get());

        if ($result) {
            return url($s3Path);
        }

        return null;
    }

    function moveFile($sourcePath, $desPath) {
        return Storage::disk('s3')->move($sourcePath, $desPath);
    }
}
