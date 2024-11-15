<?php

namespace App\Http\Controllers\API;

use App\Services\RequestFormService;
use App\Http\Controllers\API\BaseAPIController;
use App\Http\Requests\API\PostRequestFormRequest;
use App\Http\Requests\API\RequestFormVerifyRequest;
use App\Http\Requests\API\RequestFormVerifyBirthdayRequest;
use App\Repositories\RequestFormToken\RequestFormTokenRepositoryInterface;

class RequestFormController extends BaseAPIController
{
    protected $requestFormTokenRepository;
    protected $requestFormService;

    public function __construct(
        RequestFormTokenRepositoryInterface $requestFormTokenRepository,
        RequestFormService $requestFormService
    ) {
        $this->requestFormTokenRepository = $requestFormTokenRepository;
        $this->requestFormService = $requestFormService;
    }

    public function verify()
    {
        return $this->successResponse();
    }

    public function verifyBirthday(RequestFormVerifyBirthdayRequest $request)
    {
        if ($request->birthday != $request->request_form_token->birthday) {
            $isTokenInvalidated = $this->requestFormTokenRepository->updateIncorrectBirthdayTimes($request->request_form_token);
            if ($isTokenInvalidated) {
                return $this->errorResponse([], __('errors.invalid_token'));
            }
            return $this->errorResponse([], __('errors.incorrect_birthday'));
        }
        $requestForm = $request->request_form_token->request_form;

        $result = [
            "contractor_name" => $requestForm->contractor_name,
            "phone" => $requestForm->phone,
            "policy_number" => $requestForm->policy_number,
            "application_reception_number" => $requestForm->application_reception_number,
            "product_chouhyou_code" => $requestForm->product->chouhyou_code,
            "product_syoken_num_upper" => $requestForm->product->syoken_num_upper,
            "product_name" => $requestForm->product->product_name,
        ];

        return $this->successResponse($result);
    }

    public function postRequestForm(PostRequestFormRequest $request)
    {
        if ($request->birthday != $request->request_form_token->birthday) {
            $this->requestFormTokenRepository->updateIncorrectBirthdayTimes($request->request_form_token);
            return $this->errorResponse([], __('errors.incorrect_birthday'));
        }

        // STORE form-data
        $result = $this->requestFormService->saveRequestFormSubmitted(
            $request->request_form_token->request_form,
            $request->all()
        );

        if ($result) {
            return $this->successResponse();
        }

        return $this->errorResponse();
    }
}
