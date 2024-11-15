<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankInfo extends Model
{
    use HasFactory;

    protected $table = "bank_info";

    protected $fillable = [
        'account_name',
        'account_number',
        'account_type',
        'currency',
        'customer_id',
        'bank_name',
        'bank_type',
        'bank_code',
        'branch_code',
        'branch_name',
        'branch_type',
    ];

    const BRANCH_TYPE_BRANCH = 'branch';
    const BRANCH_TYPE_HEAD_OFFICE = 'head-office';
    const BRANCH_TYPE_SUB_OFFICE = 'sub-office';

    CONST ACCOUNT_TYPE_NORMAL = 'normal';
    CONST ACCOUNT_TYPE_TEMPORARY = 'temporary';
    CONST ACCOUNT_TYPE_SAVING = 'saving';

    CONST CURRENCY_YEN = 'yen';
    CONST CURRENCY_USD_USA = 'usd_usa';
    CONST CURRENCY_USD_AUS = 'usd_aus';
    CONST CURRENCY_EUR = 'eur';

    public function customer() {
        return $this->belongsTo(Customer::class, 'customer_id');
    }
}
