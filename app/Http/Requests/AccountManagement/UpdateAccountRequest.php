<?php

namespace App\Http\Requests\AccountManagement;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAccountRequest extends FormRequest
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
        $rules = [
            'username' => 'required|string|max:100',
            'email' => [
                'required',
                'string',
                'email',
                'max:100',
                Rule::unique('admins')->ignore($this->id)->where(function ($query) {
                    return $query->whereNull('deleted_at');
                }),
            ],
            'role_id' => 'required|in:1,2,3',
            'id' => 'required|integer|exists:admins,id'
        ];

        if ($this->filled('password')) {
            $rules['password'] = ['required', 'string', 'regex:/^(?=.*[a-z])(?=.*\d)[a-z\d]{8,12}$/']; // Add password validation rules
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'password.required' => 'パスワードは半角英数字8〜12文字（a-z,0-9）で指定してください。',
            'password.string' => 'パスワードは半角英数字8〜12文字（a-z,0-9）で指定してください。',
            'password.regex' => 'パスワードは半角英数字8〜12文字（a-z,0-9）で指定してください。',
            'role_id.in' => '権限は必ず指定してください。',
            'required' => '必ずすべての項目を入力してください。',
            'role_id.required' => '選択されていません。必ず選択してください。'
        ];
    }
}
