<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Constants;
use Illuminate\Support\Facades\Cache;
use App\Repositories\Status\StatusRepositoryInterface;
use App\Repositories\RequestForm\RequestFormRepositoryInterface;

class AuthMiddleware
{
    protected $requestFormRepository;

    public function __construct(RequestFormRepositoryInterface $requestFormRepository)
    {
        $this->requestFormRepository = $requestFormRepository;
    }

    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return redirect()->route('admin.login.show');
        }

        $user = Auth::user();
        $authUser = [
            'id'                => $user->id,
            'username'          => $user->username,
            'role_id'           => $user->role_id,
            'is_super_admin'    => in_array($user->role_id, [Constants::ROLE_SUPER_ADMIN]),
            'is_admin'          => in_array($user->role_id, [Constants::ROLE_SUPER_ADMIN, Constants::ROLE_ADMIN]),
            'email'             => $user->email
        ];

        config([
            'global.auth' => $authUser,
            'global.sidebar' => [...$this->requestFormRepository->getTotalCount()]
        ]);

        $this->releaseLocking();

        return $next($request);
    }

    public function releaseLocking() {
        $requestFormIdBeingEdittedKey = Constants::REQUEST_FORM_CACHE_ID . Auth::user()->id;
        $requestFormIdBeingEditted = Cache::get($requestFormIdBeingEdittedKey);
        if (request()->route()->getName() != 'admin.request-form.send' && $requestFormIdBeingEditted) {
            $key = Constants::REQUEST_FORM_CACHE_PREFIX . $requestFormIdBeingEditted;
            $userId = Cache::get($key);
            if ($userId && $userId == Auth::user()->id) {
                // Release locking
                Cache::delete($key);
                Cache::delete($requestFormIdBeingEdittedKey);
            }
        }
    }
}
