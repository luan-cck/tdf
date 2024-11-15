<?php

namespace App\Http\Requests\API;

class RequestFormVerifyBirthdayRequest extends BaseAPIFormRequest
{
    public function rules(): array
    {
        return [
            'birthday' => 'required|date',
        ];
    }
}
