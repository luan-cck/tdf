<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MProductsDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'syoken_num_upper',
        'product_name',
        'chouhyou_code',
        'product_kind',
        'foreign_currency_contract'
    ];

    public function requestForms() {
        return $this->hasMany(RequestForm::class, 'product_id');
    }
}
