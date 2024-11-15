<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseAPIController;
use App\Http\Requests\API\UploadFileRequest;
use App\Repositories\RequestFormToken\RequestFormTokenRepositoryInterface;
use App\Traits\FileUpload;
use Illuminate\Support\Str;

class CommonController extends BaseAPIController
{
    use FileUpload;

    protected $requestFormTokenRepository;

    public function __construct(
        RequestFormTokenRepositoryInterface $requestFormTokenRepository,
    ) {
        $this->requestFormTokenRepository = $requestFormTokenRepository;
    }

    public function fileUpload(UploadFileRequest $request)
    {
        $file = $request->file;
        $s3Name = Str::random(6).'_'.$file->getClientOriginalName();
        $s3Path = "static/tmp/".$s3Name;
        $result = $this->uploadFileToS3($file, $s3Path);

        return $this->successResponse($result);
    }
}
