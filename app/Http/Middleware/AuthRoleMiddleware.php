<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Constants;

class AuthRoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        
        if (!Auth::check()) {
            return redirect()->route('admin.login.show');
        }

        $user = Auth::user();
        if (!in_array($user->role_id, $roles)) {
            abort(401);
        }

        return $next($request);
    }
}
