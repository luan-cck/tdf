<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;
use Illuminate\Session\TokenMismatchException;

class CustomVerifyCsrfToken extends Middleware
{
    protected $addHttpCookie = true;

    protected $except = [
        'api/*',
    ];

    public function handle($request, Closure $next)
    {
        try {
            return parent::handle($request, $next);
        } catch (TokenMismatchException $e) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'CSRF token mismatch. Please refresh the page.'], 419);
            }

            return redirect()->route('admin.login.show')->with('message', 'Session expired. Please log in again.');
        }
    }
}
