<?php

namespace App\Services;

use App\Jobs\SendSMS;
use App\Repositories\Status\StatusRepositoryInterface;

class SmsService extends BaseService
{
    protected $statusRepository;

    public function __construct(StatusRepositoryInterface $statusRepository)
    {
        $this->statusRepository = $statusRepository;
    }

    public function send(string $phoneNumber, string $message) {
        SendSMS::dispatch($message, $phoneNumber);
    }

    public function sendApproveMessage(string $phoneNumber, string $token) {
        $url = $this->_prepareURL($token);
        $phoneNumber = $this->_preparePhoneNumber($phoneNumber);
        $message = "【T&Dフィナンシャル生命】\nお申出手続きのご案内です。以下のリンクよりお手続き下さい。\n$url";
        $this->send($phoneNumber, $message);
    }

    public function getDataByCondition($searchParams, $fixed) {
        //logger()->info( "searchParams = " . json_encode($searchParams) );

        if (isset($searchParams['createdDateFrom'])) {
            $conditions['date_from'] = $searchParams['createdDateFrom']
                ." ". ($searchParams['createdTimeFrom'] ? $searchParams['createdTimeFrom'].":00" : "00:00:00");
        }

        if (isset($searchParams['createdDateTo'])) {
            $conditions['date_to'] = $searchParams['createdDateTo']
                ." ". ($searchParams['createdTimeTo'] ? $searchParams['createdTimeTo'].":59" : "23:59:59");
        }

        if (isset($searchParams['statusDateFrom'])) {
            $conditions['status_date_from'] = $searchParams['statusDateFrom']
                ." ". ($searchParams['statusTimeFrom'] ? $searchParams['statusTimeFrom'].":00" : "00:00:00");
        }

        if (isset($searchParams['statusDateTo'])) {
            $conditions['status_date_to'] = $searchParams['statusDateTo']
                ." ". ($searchParams['statusTimeTo'] ? $searchParams['statusTimeTo'].":59" : "23:59:59");
        }

        $conditions['request_types'] = [];
        if (isset($searchParams['cancellation']) && $searchParams['cancellation'] == 1) {
            $conditions['request_types'][] = 1;
        }
        if (isset($searchParams['id_aggregation']) && $searchParams['id_aggregation'] == 1) {
            $conditions['request_types'][] = 2;
        }
        if (isset($searchParams['benefits']) && $searchParams['benefits'] == 1) {
            $conditions['request_types'][] = 3;
        }

        if (isset($searchParams['doc_download_no']) && isset($searchParams['doc_download_yes'])) {
            if ($searchParams['doc_download_no'] && !$searchParams['doc_download_yes']) {
                $conditions['downloaded'] = 0;
            } elseif (!$searchParams['doc_download_no'] && $searchParams['doc_download_yes']) {
                $conditions['downloaded'] = 1;
            }
        }

        $conditions['policyNumber']                 = $searchParams['policyNumber'] ?? null;
        $conditions['applicationReceptionNumber']   = $searchParams['applicationReceptionNumber'] ?? null;
        $conditions['contractorName']               = $searchParams['contractorName'] ?? null;
        $conditions['phone']                        = $searchParams['mobilePhone'] ?? null;
        $conditions['author']                       = !empty($searchParams['author']) ? explode(",", $searchParams['author']) : [];
        $conditions['confirmedBy']                  = !empty($searchParams['confirmedBy']) ? explode(",", $searchParams['confirmedBy']) : [];
        $conditions['productName']                  = !empty($searchParams['productName']) ? explode(",", $searchParams['productName']) : [];
        $conditions['request_type_name']            = $searchParams['request_type_name'] ?? null;

        $conditions['page']                         = $searchParams['page'] ?? null;
        $conditions['limit']                        = $searchParams['limit'] ?? null;

        $conditions['export']                        = $searchParams['export'] ?? false;

        //logger()->info( "condition = " . json_encode($conditions) );

        return $this->statusRepository->search($conditions, $fixed);
    }

    public function getDetail($id) {
        return $this->statusRepository->getDetail($id);
    }

    private function _prepareURL($token) {
        $url = preg_replace('/(https:\/\/)|(http:\/\/)/', '', url("/t/". $token));
        return $url;
    }

    private function _preparePhoneNumber($phoneNumber) {
        // Support Japanese Phone number
        if ($phoneNumber && str_starts_with($phoneNumber, '0')) {
            // 01234556789 -> +81123456789
            $fallbackPrefix = "+81";
            $phoneNumber = $fallbackPrefix . substr($phoneNumber, 1);
        }

        return $phoneNumber;
    }
}
