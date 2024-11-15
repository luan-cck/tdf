<?php

namespace App\Http\Requests\API;

class UploadFileRequest extends BaseAPIFormRequest
{
    public function rules(): array
    {
        return [
            'file' => 'required|file',
        ];
    }
}
