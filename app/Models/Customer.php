<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'over_18', 'request_id'];

    public function requestForm() {
        return $this->belongsTo(RequestForm::class, 'request_id');
    }

    public function documents() {
        return $this->hasMany(Document::class);
    }

    public function relationships() {
        return $this->hasMany(Relationship::class);
    }
}
