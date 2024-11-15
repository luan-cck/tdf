<?php

namespace App\Repositories\RequestFormToken;

use App\Constants;
use App\Models\RequestFormToken;
use App\Models\Status;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Repositories\BaseRepository;

class RequestFormTokenRepository extends BaseRepository implements RequestFormTokenRepositoryInterface {

    /**
     * Specify Model class name
     *
     * @return string
     */
    function model()
    {
        return RequestFormToken::class;
    }

    public function getNonVeriyToken($token, $birthday=null) {
        return $this->model
            ->where('token', $token)
            ->where('incorrect_times', '<', Constants::MAXIMUM_INCORRECT_TIMES)
            ->where('created_at', '>', now()->subDays(Constants::EXPIRE_AFTER_DAYS))
            ->whereDoesntHave('request_form.status', function($q) {
                // Ignore INVALID STATUS request-form
                $q->whereIn('status', [
                    Status::SUBMIT_STATUS,
                    Status::BLOCK_STATUS,
                ]);
            })
            ->when($birthday, function($q, $birthday) {
                $q->where('birthday', $birthday);
            })->first();
    }

    public function updateIncorrectBirthdayTimes(RequestFormToken $requestFormToken) {
        $isTokenInvalidated = false;
        try {
            DB::beginTransaction();
            // Update form_request_token incorrect_times
            $requestFormToken->incorrect_times += 1;
            $requestFormToken->save();

            // Turn request_form's status to BLOCK state
            if ($requestFormToken->incorrect_times >= Constants::MAXIMUM_INCORRECT_TIMES) {
                $requestStatus = $requestFormToken->request_form->status;
                $requestStatus->status = Status::BLOCK_STATUS;
                $requestStatus->save();

                # Delete Invalid Token
                $requestFormToken->delete();
                $isTokenInvalidated = true;
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e);
        }
        return $isTokenInvalidated;
    }
}
