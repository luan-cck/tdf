<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateReturnDetailRequest;
use App\Models\Status;
use App\Repositories\RequestForm\RequestFormRepositoryInterface;
use App\Repositories\Status\StatusRepositoryInterface;
use App\Services\AccountManagementService;
use App\Services\RequestFormService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Exception;
use Illuminate\Http\Request;

class ReturnListController extends Controller
{
    protected $requestFormRepository;
    protected $statusRepository;
    protected $accountManagementService;
    protected $requestFormService;

    public function __construct(
        RequestFormRepositoryInterface $requestFormRepository,
        StatusRepositoryInterface $statusRepository,
        AccountManagementService $accountManagementService,
        RequestFormService $requestFormService
    ) {
        $this->requestFormRepository = $requestFormRepository;
        $this->statusRepository = $statusRepository;
        $this->accountManagementService = $accountManagementService;
        $this->requestFormService = $requestFormService;
    }

    public function index(Request $request)
    {
        $searchParams = $request->all();
        $listReturn = $this->requestFormService->getListReturn($searchParams);
        $admins = $this->accountManagementService->getAll();
        return view('dashboard.returnList.index', compact('listReturn', 'searchParams', 'admins'));
    }

    public function edit(int $id)
    {
        $request = $this->requestFormRepository->find($id);

        // TODO: unread function - Phase 2
        // $status = $request->status;
        // $statusBeforeUpdate = $status->is_read;
        // if (!$statusBeforeUpdate) {
        //     $status->is_read = true;
        //     $status->save();
        // };

        $history = $request->status_history;

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
            'product_id' => $request['product_id'],
        ];

        $historyData = $history->map(function ($item) use (&$data){
            if ($item->status === 'created') {
                $data['created_by'] = $item->admin['username'];
            }
            return [
                'confirm_date' => $item->confirm_date,
                'name' => $item->admin['username'],
                'status' => $item->status,
            ];
        });

        return view(
            'dashboard.returnList.edit',
            compact('data', 'historyData')
        );
    }

    public function update(UpdateReturnDetailRequest $request, int $id)
    {
        try {
            DB::beginTransaction();

            $this->requestFormRepository->update([
                'contractor_name' => $request['contractor_name'],
                'birthday' => $request['birthday'],
                'request_type_name' => $request['request_type_name'],
                'phone' => $request['phone'],
                'policy_number' => $request['policy_number'],
                'application_reception_number' => $request['application_reception_number'],
                'product_id' => $request['product_id'],
            ], $id);

            $this->statusRepository->create([
                'author_id' => Auth::user()->id,
                'request_id' => $id,
                'status' => Status::PENDING_STATUS,
                'confirm_date' => now(),
            ]);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e);
        }
    }
}
