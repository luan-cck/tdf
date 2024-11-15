<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Models\Admin;

class EmailExists implements Rule
{
    public function passes($attribute, $value)
    {
        return Admin::where('email', $value)
                   ->whereNull('deleted_at')
                   ->exists();
    }

    public function message()
    {
        return '入力されたメールアドレスが正しくありません。';
    }
}
