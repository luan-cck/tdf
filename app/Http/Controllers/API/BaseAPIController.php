<?php

namespace App\Http\Controllers\API;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller;

class BaseAPIController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     *  response result success
     *
     * @param array $data
     * @param int $httpStatus
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function successResponse($data = [], $msg = 'success')
    {
        $httpStatus = 200;
        $data = [
            'data' => $data, 'msg' => $msg
        ];
        return response()->json($data, $httpStatus);
    }

    protected function errorResponse($data = [], $msg = 'error', $httpStatus = 400)
    {
        $data = [
            'data' => $data, 'msg' => $msg
        ];
        return response()->json($data, $httpStatus);
    }
}
