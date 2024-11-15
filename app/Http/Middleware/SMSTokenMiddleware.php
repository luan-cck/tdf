<?php

namespace App\Http\Middleware;

use App\Repositories\RequestFormToken\RequestFormTokenRepositoryInterface;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SMSTokenMiddleware
{
    protected $requestFormTokenRepository;

    public function __construct(
        RequestFormTokenRepositoryInterface $requestFormTokenRepository
    ) {
        $this->requestFormTokenRepository = $requestFormTokenRepository;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->header('token', null);
        $request_form_token = $this->requestFormTokenRepository->getNonVeriyToken($token);
        if (!$request_form_token) {
            // Bad request
            return response()->json(['data' => [], 'msg' => __('errors.invalid_token')], 400);
        }

        $request->request->add(['request_form_token' => $request_form_token]);
        return $next($request);
    }
}
