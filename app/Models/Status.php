<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;

    protected $table = 'status';

    protected $fillable = [
        'author_id',
        'request_id',
        'status',
        'reason_for_return',
        'cancellation_reason',
        'other_cancellation_reason',
        'confirm_date',
        'is_read',
    ];

    const CREATED_STATUS = 'created'; // 2
    const PENDING_STATUS = 'pending'; // 2
    const REJECT_STATUS = 'reject'; // 3
    const APPROVE_STATUS = 'approve'; // 4

    const SUBMIT_STATUS = 'submit'; // 4, 5 - customer
    const BLOCK_STATUS = 'block'; // 4 - Expired(>60 days) || more than 3 times incorrect Birthday

    public function admin() {
        return $this->belongsTo(Admin::class, 'author_id');
    }

    public function requestForm() {
        return $this->belongsTo(RequestForm::class, 'request_id');
    }
}
