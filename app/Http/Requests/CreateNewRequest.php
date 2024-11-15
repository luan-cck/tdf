<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\FullwidthCharacters;

class CreateNewRequest extends FormRequest
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
            'contractor_name' => ['required', new FullwidthCharacters, 'max:24'],
            'birthday' => 'required|date',
            'request_type_name' => 'required|in:1,2,3',
            'phone' => ['required', 'regex:/^\d{11}$/'],
            'policy_number' => ['required', 'regex:/^[\d\-]{10}$/'],
            'application_reception_number' => ['required', 'regex:/^\d{7}$/'],
            'product_id' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'required' => '入力されていません。必ず入力してください。',
            'request_type_name.required' => '選択されていません。必ず選択してください。',
            'product_id.required' => '選択されていません。必ず選択してください。',
        ];
    }
}
