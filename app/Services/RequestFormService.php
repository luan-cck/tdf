<?php

namespace App\Services;

use App\Models\Admin;
use App\Models\BankInfo;
use App\Models\Document;
use App\Models\RequestForm;
use App\Models\Status;
use App\Repositories\Bank\BankRepositoryInterface;
use App\Repositories\Customer\CustomerRepositoryInterface;
use App\Repositories\CustomerRelationship\CustomerRelationshipRepositoryInterface;
use App\Repositories\Document\DocumentRepositoryInterface;
use App\Repositories\RequestForm\RequestFormRepositoryInterface;
use App\Repositories\RequestFormToken\RequestFormTokenRepositoryInterface;
use App\Repositories\Status\StatusRepositoryInterface;
use App\Traits\FileUpload;
use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RequestFormService extends BaseService
{
    use FileUpload;

    protected $customerRelationshipRepository;
    protected $requestFormTokenRepository;
    protected $requestFormRepository;
    protected $customerRepository;
    protected $documentRepository;
    protected $statusRepository;
    protected $bankRepository;
    protected $smsService;

    public function __construct(
        CustomerRelationshipRepositoryInterface $customerRelationshipRepository,
        RequestFormTokenRepositoryInterface $requestFormTokenRepository,
        RequestFormRepositoryInterface $requestFormRepository,
        CustomerRepositoryInterface $customerRepository,
        DocumentRepositoryInterface $documentRepository,
        StatusRepositoryInterface $statusRepository,
        BankRepositoryInterface $bankRepository,
        SmsService $smsService
    ){
        $this->customerRelationshipRepository = $customerRelationshipRepository;
        $this->requestFormTokenRepository = $requestFormTokenRepository;
        $this->requestFormRepository = $requestFormRepository;
        $this->customerRepository = $customerRepository;
        $this->documentRepository = $documentRepository;
        $this->statusRepository = $statusRepository;
        $this->bankRepository = $bankRepository;
        $this->smsService = $smsService;
    }

    public function approve(RequestForm $requestForm)
    {
        try {
            DB::beginTransaction();
            // [DB] Store records
            $this->statusRepository->create([
                'author_id' => Auth::user()->id,
                'request_id' => $requestForm->id,
                'status' => Status::APPROVE_STATUS,
                'confirm_date' => now()
            ]);

            // [DB] Create token
            $token = $this->generateToken();
            $this->requestFormTokenRepository->create([
                'request_id' => $requestForm->id,
                'birthday' => $requestForm->birthday,
                'token' => $token
            ]);

            // Send SMS
            $this->smsService->sendApproveMessage($requestForm->phone, $token);
            DB::commit();
        } catch (Exception $e) {
            Log::error($e->getMessage());
            DB::rollBack();
        }
    }

    private function generateToken($tries=0)
    {
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10
        $token = vsprintf('%s%s%s', str_split(bin2hex($data), 3)); // 9 characters length

        # Make sure Token is Unique
        $existed = $this->requestFormTokenRepository->getNonVeriyToken($token);
        if ($existed) {
            if ($tries < 10) {
                # Avoid Infinitely Loop
                return $this->generateToken($tries+1);
            }
            throw new Exception("Can't generate token. Please contact Developers");
        }

        return $token;
    }

    public function reject(RequestForm $requestForm, $reason_for_return)
    {
        // [DB] Store records
        $this->statusRepository->create([
            'author_id' => Auth::user()->id,
            'request_id' => $requestForm->id,
            'status' => Status::REJECT_STATUS,
            'reason_for_return' => $reason_for_return,
            'confirm_date' => now()
        ]);
    }

    public function createNewFormRequest($request)
    {
        DB::beginTransaction();
        try {
            $authorID = Auth::user()->id;

            $dataFormRequest = $request->only([
                'contractor_name',
                'birthday',
                'request_type_name',
                'application_reception_number',
                'phone',
                'policy_number',
                'product_id'
            ]);
            $requestForm =  $this->requestFormRepository->create($dataFormRequest);
            $dataStatus = array(
                'request_id' => $requestForm->id,
                'status' => Status::CREATED_STATUS,
                'author_id' => $authorID,
                'confirm_date' => now()
            );
            $status = $this->statusRepository->create($dataStatus);
            DB::commit();
        return ['success' => true, 'msg' =>'success', 'code' =>200];
        } catch (Exception $exception) {
            Log::error('Error create request ' . $exception->getMessage() . ' ' . $exception->getLine());
            DB::rollBack();
            return [
                'success' => false,
                'msg' => $exception->getMessage(),
                'code' => 500
            ];
        }
    }

    public function getListWaiting($searchParams)
    {
        $conditions = $this->buildConditionSearch($searchParams);

        return $this->requestFormRepository->getListWaiting($conditions);
    }
    public function getListReturn($searchParams)
    {
        $conditions = $this->buildConditionSearch($searchParams);

        return $this->requestFormRepository->getListReturn($conditions);
    }

    public function smsSentList($searchParams)
    {
        $conditions = $this->buildConditionSearch($searchParams);

        return $this->requestFormRepository->smsSentList($conditions);
    }

    public function receptionList($searchParams)
    {
        $conditions = $this->buildConditionSearch($searchParams);

        return $this->requestFormRepository->receptionList($conditions);
    }

    private function buildConditionSearch($searchParams) {
        if (isset($searchParams['createdDateFrom'])) {
            $conditions['date_from'] = $searchParams['createdDateFrom']
                ." ". (isset($searchParams['createdTimeFrom']) && $searchParams['createdTimeFrom'] !== null
                ? $searchParams['createdTimeFrom'].":00"
                : "00:00:00");
        }

        if (isset($searchParams['createdDateTo'])) {
            $conditions['date_to'] = $searchParams['createdDateTo']
                ." ". (isset($searchParams['createdTimeTo']) && $searchParams['createdTimeTo'] !== null
                ? $searchParams['createdTimeTo'].":59"
                : "23:59:59");
        }

        if (isset($searchParams['statusDateFrom'])) {
            $conditions['status_date_from'] = $searchParams['statusDateFrom']
                ." ". (isset($searchParams['statusTimeFrom']) && $searchParams['statusTimeFrom'] !== null
                ? $searchParams['statusTimeFrom'].":00"
                : "00:00:00");
        }

        if (isset($searchParams['statusDateTo'])) {
            $conditions['status_date_to'] = $searchParams['statusDateTo']
                ." ". (isset($searchParams['statusTimeTo']) && $searchParams['statusTimeTo'] !== null
                ? $searchParams['statusTimeTo'].":59" : "23:59:59");
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
        $conditions['export']                       = $searchParams['export'] ?? false;

        if (isset($searchParams['limit']) && !empty($searchParams['limit']) && is_numeric($searchParams['limit'])) {
            $conditions['limit']                        = $searchParams['limit'];
        }

        return $conditions;
    }


    public function saveRequestFormSubmitted(RequestForm $requestForm, array $input) {
        try {
            DB::beginTransaction();

            switch ($input["cancellation_reason"]) {
                case '資金が必要になった':
                case '他社の保険に入った':
                case 'T&Dフィナンシャル生命の他の保険に変更した（する）ため':
                case '運用成果の確保':
                case '保険料払込困難（一時払いの契約を除く）':
                case '回答しない':
                  break;
                default:
                    $input['other_cancellation_reason'] = $input['cancellation_reason'];
                    $input['cancellation_reason'] = "その他";
                    break;
            }

            // [S3] Move file to STANDARD Path
            $input = $this->_moveDocumentToStandardPath($requestForm, $input);

            // [DB] Update RequestForm Status
            $this->statusRepository->markAsRead($requestForm->id);
            $this->statusRepository->create([
                'author_id' => Admin::GUEST_ID,
                'request_id' => $requestForm->id,
                'status' => Status::SUBMIT_STATUS,
                'cancellation_reason' => $input['cancellation_reason'],
                'other_cancellation_reason' => isset($input['other_cancellation_reason']) ? $input['other_cancellation_reason'] : '',
                'confirm_date' => now()
            ]);

            // [DB] Store Customer
            $customer = $this->_storeCustomers($requestForm, $input);

            // [DB] Store BankInfos
            if (isset($input['bank_name']) && isset($input['bank_branch_name'])) {
                $this->bankRepository->create([
                    'customer_id' => $customer->id,
                    'account_name' => $input['bank_account_name'] ?? "",
                    'account_number' => $input['bank_account_number'] ?? "",
                    'account_type' => $input['bank_account_type'] ?? BankInfo::ACCOUNT_TYPE_NORMAL,
                    'currency' => $input['bank_currency'] ?? BankInfo::CURRENCY_YEN,
                    'bank_name' => $input['bank_name'] ?? "",
                    'branch_name' => $input['bank_branch_name'] ?? "",
                    'branch_type' => $input['bank_branch_type'] ?? BankInfo::BRANCH_TYPE_BRANCH,
                    'bank_code' => $input['bank_code'] ?? null,
                    'branch_code' => $input['bank_branch_code'] ?? null,
                ]);
            }
            DB::commit();
            return true;
        } catch (Exception $exception) {
            dd($exception);
            DB::rollBack();
        }
        return false;
    }

    private function _storeCustomers(RequestForm $requestForm, array $input) {
        $customer = $this->customerRepository->create([
            'request_id' => $requestForm->id,
            'over_18' => $input['customer_over_18'],
            'name' => $input['customer_name'] ?? '',
        ]);

        $document = [
            [
                'customer_id' => $customer->id,
                'document_type' => Document::DOCUMENT_IDENTITY_DOCUMENT_FRONT,
                'document_path' => $input['document_identity_document_front'],
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];
        if (isset($input['document_identity_document_back'])) {
            $document[] = [
                'customer_id' => $customer->id,
                'document_type' => Document::DOCUMENT_IDENTITY_DOCUMENT_BACK,
                'document_path' => $input['document_identity_document_back'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        $this->documentRepository->insert($document);

        if (isset($input['document_contract_owner_identity_document_front'])) {
            $relatedDocuments = [
                [
                    'customer_id' => $customer->id,
                    'document_type' => Document::DOCUMENT_CONTRACT_OWNER_IDENTITY_DOCUMENT_FRONT,
                    'document_path' => $input['document_contract_owner_identity_document_front'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ];

            if (isset($input['document_contract_owner_identity_document_back'])) {
                $relatedDocuments[] = [
                    'customer_id' => $customer->id,
                    'document_type' => Document::DOCUMENT_CONTRACT_OWNER_IDENTITY_DOCUMENT_BACK,
                    'document_path' => $input['document_contract_owner_identity_document_back'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
            $this->documentRepository->insert($relatedDocuments);
        }

        if (isset($input['customer_related_name'])) {
            // [DB] Store Customer Relationship (parents, spouses, ...)
            $relatedCustomer = $this->customerRepository->create([
                'request_id' => $requestForm->id,
                'over_18' => true,
                'name' => $input['customer_related_name'],
            ]);
            $this->customerRelationshipRepository->create([
                'customer_id' => $customer->id,
                'related_customer_id' => $relatedCustomer->id,
                'relationship_type' => $input['customer_relationship_type'],
            ]);

            if (isset($input['document_parent_identity_document_front'])) {
                $relatedDocuments = [
                    [
                        'customer_id' => $relatedCustomer->id,
                        'document_type' => Document::DOCUMENT_PARENT_IDENTITY_DOCUMENT_FRONT,
                        'document_path' => $input['document_parent_identity_document_front'],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                ];

                if (isset($input['document_parent_identity_document_back'])) {
                    $relatedDocuments[] = [
                        'customer_id' => $relatedCustomer->id,
                        'document_type' => Document::DOCUMENT_PARENT_IDENTITY_DOCUMENT_BACK,
                        'document_path' => $input['document_parent_identity_document_back'],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
                $this->documentRepository->insert($relatedDocuments);
            }
        }

        return $customer;
    }

    private function _moveDocumentToStandardPath($requestForm, array $input) {
        $date = now()->format('Ymd');
        $time = now()->format('His');

        $s3Name = '022_'.$requestForm->policy_number."_00_"
            .$requestForm->application_reception_number."_"
            .$date."_"
            .$time;

        $s3Path = "static/kaiyaku/upload/"
            .$date."/"
            .$s3Name."/";

        $input['document_identity_document_front'] = $this->_moveFile(
            $input['document_identity_document_front'] ?? null,
            $s3Path,
            Document::DOCUMENT_IDENTITY_DOCUMENT_FRONT_FILENAME
        );
        $input['document_identity_document_back'] = $this->_moveFile(
            $input['document_identity_document_back'] ?? null,
            $s3Path,
            Document::DOCUMENT_IDENTITY_DOCUMENT_BACK_FILENAME
        );
        $input['document_parent_identity_document_front'] = $this->_moveFile(
            $input['document_parent_identity_document_front'] ?? null,
            $s3Path,
            Document::DOCUMENT_PARENT_IDENTITY_DOCUMENT_FRONT_FILENAME
        );
        $input['document_parent_identity_document_back'] = $this->_moveFile(
            $input['document_parent_identity_document_back'] ?? null,
            $s3Path,
            Document::DOCUMENT_PARENT_IDENTITY_DOCUMENT_BACK_FILENAME
        );
        $input['document_contract_owner_identity_document_front'] = $this->_moveFile(
            $input['document_contract_owner_identity_document_front'] ?? null,
            $s3Path,
            Document::DOCUMENT_CONTRACT_OWNER_IDENTITY_DOCUMENT_FRONT_FILENAME
        );
        $input['document_contract_owner_identity_document_back'] = $this->_moveFile(
            $input['document_contract_owner_identity_document_back'] ?? null,
            $s3Path,
            Document::DOCUMENT_CONTRACT_OWNER_IDENTITY_DOCUMENT_BACK_FILENAME
        );
        return $input;
    }

    private function _moveFile($url, $s3Path, $desFileName){
        if ($url) {
            $sourcePath = parse_url($url, PHP_URL_PATH);

            // Get File name only
            $pieces = explode('.', $sourcePath);
            $sourceExension = $pieces[count($pieces) - 1];
            $desPath = $s3Path . $desFileName . '.' . $sourceExension;

            $this->moveFile($sourcePath, $desPath);
            return $desPath;
        }

        return null;
    }

}
