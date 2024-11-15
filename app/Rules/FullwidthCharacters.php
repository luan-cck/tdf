<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class FullwidthCharacters implements Rule
{
    public function passes($attribute, $value)
    {
        // Regular expression for fullwidth characters (including fullwidth space)
        return preg_match('/^[\x{FF01}-\x{FF5E}\x{3040}-\x{309F}\x{30A0}-\x{30FF}\x{3400}-\x{4DBF}\x{4E00}-\x{9FFF}\x{F900}-\x{FAFF}\x{FF10}-\x{FF19}\x{FF0C}\x{3000}]+$/u', $value);
    }

    public function message()
    {
        return '全角アルファベット、全角カタカナ、ひらがな、漢字、全角スペースで入力してください';
    }
}
