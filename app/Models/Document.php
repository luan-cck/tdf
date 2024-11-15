<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'document_type',
        'document_path'
    ];

    const DOCUMENT_CONTRACT_OWNER_IDENTITY_DOCUMENT_FRONT = 'document_contract_owner_identity_document__front';
    const DOCUMENT_CONTRACT_OWNER_IDENTITY_DOCUMENT_BACK = 'document_contract_owner_identity_document__back';
    const DOCUMENT_IDENTITY_DOCUMENT_FRONT = 'document_identity_document__front';
    const DOCUMENT_IDENTITY_DOCUMENT_BACK = 'document_identity_document__back';
    const DOCUMENT_PARENT_IDENTITY_DOCUMENT_FRONT = 'document_parent_identity_document__front';
    const DOCUMENT_PARENT_IDENTITY_DOCUMENT_BACK = 'document_parent_identity_document__back';

    // Predefine Filename
    const DOCUMENT_IDENTITY_DOCUMENT_FRONT_FILENAME= 'honkaku_k';
    const DOCUMENT_IDENTITY_DOCUMENT_BACK_FILENAME = 'honkaku_k_2';
    const DOCUMENT_PARENT_IDENTITY_DOCUMENT_FRONT_FILENAME = 'honkaku_s';
    const DOCUMENT_PARENT_IDENTITY_DOCUMENT_BACK_FILENAME = 'honkaku_s_2';
    const DOCUMENT_CONTRACT_OWNER_IDENTITY_DOCUMENT_FRONT_FILENAME = 'honkaku_h';
    const DOCUMENT_CONTRACT_OWNER_IDENTITY_DOCUMENT_BACK_FILENAME = 'honkaku_h_2';

    public function customer() {
        return $this->belongsTo(Customer::class, 'customer_id');
    }
}
