<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestFormToken extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_id',
        'token',
        'birthday',
    ];

    public function request_form() {
        return $this->belongsTo(RequestForm::class, 'request_id');
    }
}
