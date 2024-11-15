<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class RequestForm extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_uid',
        'contractor_name',
        'birthday',
        'request_type_name',
        'application_reception_number',
        'phone',
        'policy_number',
        'product_id'
    ];

    protected $primaryKey = 'id';

    protected $keyType = 'int';

    public $incrementing = true;

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->request_uid = self::generateUniqueID();
        });
    }

    public static function generateUniqueID()
    {
        do {
            $id = str_pad(mt_rand(1, 99999999), 8, '0', STR_PAD_LEFT);
        } while (self::where('request_uid', $id)->exists());

        return $id;
    }
    public function product() {
        return $this->belongsTo(MProductsDetail::class, 'product_id', 'product_id');
    }

    public function customer() {
        return $this->hasMany(Customer::class);
    }

    public function status() {
        return $this->hasOne(Status::class, 'request_id')->latestOfMany();
    }

    public function status_history() {
        return $this->hasMany(Status::class, 'request_id')
            ->where(function ($query) {
            $query->where('status', 'created')
                  ->orWhere('status', 'reject');
        });
    }

    public function status_approved() {
        return $this->hasMany(Status::class, 'request_id')
            ->where(function ($query) {
            $query->whereNotIn('status', ['block', 'submit']);
        });
    }

    public function getBirthdayAttribute($value)
    {
        return Carbon::parse($value)->format('Y/m/d');
    }


}
