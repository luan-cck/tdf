<?php

namespace App\Http\Controllers\Admin;

use App\Exports\SMSSentExport;
use App\Http\Controllers\Controller;
use App\Services\SmsService;
use App\Services\AccountManagementService;
use App\Services\RequestFormService;
use App\Models\Admin;
use Illuminate\Http\Request;
use App\Repositories\RequestForm\RequestFormRepositoryInterface;
use App\Repositories\Document\DocumentRepositoryInterface;
use App\Repositories\Status\StatusRepositoryInterface;
use Maatwebsite\Excel\Facades\Excel;

class SMSController extends Controller
{
    protected $smsService;
    protected $accountManagementService;
    protected $requestFormService;
    protected $requestFormRepository;
    protected $documentRepository;
    protected $statusRepository;


    public function __construct(
        SmsService $smsService,
        AccountManagementService $accountManagementService,
        RequestFormService $requestFormService,
        RequestFormRepositoryInterface $requestFormRepository,
        DocumentRepositoryInterface $documentRepository,
        StatusRepositoryInterface $statusRepository
    ) {
        $this->smsService               = $smsService;
        $this->accountManagementService = $accountManagementService;
        $this->requestFormService       = $requestFormService;
        $this->requestFormRepository    = $requestFormRepository;
        $this->documentRepository       = $documentRepository;
        $this->statusRepository         = $statusRepository;
    }

    public function index(Request $request) {
        $searchParams = $request->all();

        // $datas = $this->smsService->getDataByCondition($searchParams, ['status' => ['approve', 'block']]);
        $data = $this->requestFormService->smsSentList($searchParams);

        $admins = $this->accountManagementService->getAll();

        if ($searchParams['export'] ?? false) {
            $date = now()->format('ymd');
            $time = now()->format('Hi');
            $fileName = "SMS送信済み一覧＿" . $date . '_' . $time . ".csv";
            return Excel::download(new SMSSentExport($data), $fileName);
        }

        return view('dashboard.sms.index', compact('data', 'admins', 'searchParams'));
    }

    public function receptionList(Request $request) {
        $searchParams = $request->all();
        $datas = $this->requestFormService->receptionList($searchParams);

        return view('dashboard.receptionList.index', compact('datas', 'searchParams'));
    }

    public function receptionDetail($id) {
        $data = $this->requestFormRepository->getReceptionDetail($id);

        // TODO: unread function - Phase 2
        // $status = $this->statusRepository->find($data['status_id']);
        // $statusBeforeUpdate = $status->is_read;
        // if (!$statusBeforeUpdate) {
        //     $status->is_read = true;
        //     $status->save();
        // }

        //logger()->info( "receptionDetail data = " . json_encode($data, JSON_PRETTY_PRINT));
        $customerIds = [$data['customer_id']];
        if ($data['related_customer_id']) {
            $customerIds[] = $data['related_customer_id'];
        }

        $documents = $this->documentRepository->getDocumentsByCustomerId($customerIds);

        return view('dashboard.receptionList.reception-detail', compact('data', 'documents'));
    }

    public function getDetail($id)
    {
        $request = $this->requestFormRepository->find($id);

        // TODO: unread function - Phase 2
        // $status = $request->status;
        // $statusBeforeUpdate = $status->is_read;
        // if (!$statusBeforeUpdate) {
        //     $status->is_read = true;
        //     $status->save();
        // }

        $history = $request->status_approved;

        $data = [
            'id' => $request['id'],
            'request_uid' => $request['request_uid'],
            'reason_for_return' => $request->status->reason_for_return,
            'contractor_name' => $request['contractor_name'],
            'birthday' => $request['birthday'],
            'phone' => $request['phone'],
            'policy_number' => $request['policy_number'],
            'application_reception_number' => $request['application_reception_number'],
            'request_type_name' => $request['request_type_name'],
            'product_name' => $request->product->product_name,
        ];

        $historyData = $history->map(function ($item) use (&$data){
            if ($item->status === 'created') {
                $data['created_by'] = $item->admin['username'];
            }
            if ($item->status === 'reject') {
                $data['reason_for_return'] = $item->reason_for_return;
            }
            return [
                'confirm_date' => $item->confirm_date,
                'name' => $item->admin['username'],
                'status' => $item->status,
            ];
        });

        return view(
            'dashboard.sms.detail',
            compact('data', 'historyData')
        );
    }
}
