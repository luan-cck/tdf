<?php

namespace App\Http\Requests\API;

use App\Models\BankInfo;
use Illuminate\Validation\Rule;

class PostRequestFormRequest extends BaseAPIFormRequest
{
    public function rules(): array
    {
        return [
            // Security
            'birthday' => 'required|date',

            // Customer
            'customer_name' => 'nullable|string|max:100',
            'customer_over_18' => 'required|boolean',
            'customer_related_name' => 'nullable|string',
            'customer_relationship_type' => 'nullable|string',

            // Document
            'document_identity_document_front' => 'required',
            'document_identity_document_back' => 'nullable',
            'document_parent_identity_document_front' => 'nullable',
            'document_parent_identity_document_back' => 'nullable',
            'document_contract_owner_identity_document_front' => 'nullable',
            'document_contract_owner_identity_document_back' => 'nullable',

            // Bank
            'bank_account_name' => 'nullable',
            'bank_account_number' => 'nullable',
            'bank_account_type' => ['nullable', Rule::in([BankInfo::ACCOUNT_TYPE_NORMAL, BankInfo::ACCOUNT_TYPE_SAVING, BankInfo:: ACCOUNT_TYPE_TEMPORARY])],
            'bank_currency' => [Rule::in([BankInfo::CURRENCY_YEN, BankInfo::CURRENCY_USD_USA, BankInfo::CURRENCY_USD_AUS, BankInfo::CURRENCY_EUR])],
            'bank_name' => 'nullable',
            'bank_code' => 'nullable',
            'bank_branch_name' => 'nullable',
            'bank_branch_type' => ['nullable', Rule::in([BankInfo::BRANCH_TYPE_BRANCH, BankInfo::BRANCH_TYPE_SUB_OFFICE, BankInfo:: BRANCH_TYPE_HEAD_OFFICE])],
            'bank_branch_code' => 'nullable',

            // Reason
            'cancellation_reason' => 'required',
        ];
    }
}
