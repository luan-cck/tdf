<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Relationship extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'related_customer_id',
        'relationship_type'
    ];

    public function customer() {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function relatedCustomer() {
        return $this->belongsTo(Customer::class, 'related_customer_id');
    }
}
