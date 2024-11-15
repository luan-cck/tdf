<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'required|email',
            'password' => [
                'required',
                'string',
                'regex:/^(?=.*[a-z])(?=.*\d)[a-z\d]{8,12}$/',
            ],
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'メールアドレスとパスワードは必ず入力してください。',
            'password.required' => 'パスワードは半角英数字8〜12文字（a-z,0-9）で指定してください。',
            'password.string' => 'パスワードは半角英数字8〜12文字（a-z,0-9）で指定してください。',
            'password.regex' => 'パスワードは半角英数字8〜12文字（a-z,0-9）で指定してください。',
        ];
    }

}
