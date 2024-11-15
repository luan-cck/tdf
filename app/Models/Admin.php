<?php

namespace App\Models;

use App\Constants;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['username', 'role_id', 'email', 'password', 'is_active'];

    const GUEST_ID = 1;

    public function role() {
        return $this->belongsTo(Role::class);
    }

    public function statuses() {
        return $this->hasMany(Status::class, 'author_id');
    }

    public function isSuperAdmin() {
        return $this->role_id == Constants::ROLE_SUPER_ADMIN;
    }
}
