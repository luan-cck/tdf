<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Http\Requests\SMSRejectRequest;
use App\Repositories\RequestForm\RequestFormRepositoryInterface;
use App\Services\RequestFormService;
use App\Services\AccountManagementService;
use App\Http\Requests\CreateNewRequest;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class RequestFormController extends Controller
{
    protected $requestFormRepository;
    protected $requestFormService;
    protected $accountManagementService;

    public function __construct(
        RequestFormRepositoryInterface $requestFormRepository,
        RequestFormService $requestFormService,
        AccountManagementService $accountManagementService
    ) {
        $this->requestFormRepository = $requestFormRepository;
        $this->requestFormService = $requestFormService;
        $this->accountManagementService = $accountManagementService;
    }

    public function getSend($id)
    {
        try {
            $result = $this->requestFormRepository->getRequestFormForSendSMS($id);
            $requestForm = $result['requestForm'];
            $acquired = $result['acquired'];

            // TODO: unread function - Phase 2
            // $status = $requestForm->status;
            // $statusBeforeUpdate = $status->is_read;
            // if (!$statusBeforeUpdate) {
            //     $status->is_read = true;
            //     $status->save();
            // }

            return view('dashboard.request-form.send', compact('requestForm', 'acquired'));
        } catch (HttpException $e) {
            if ($e->getStatusCode() == 403) {
                return redirect(route('admin.home'))->withErrors(['acquired' => true]);
            }

            # Unhanlde Exception
            abort(403);
        }
    }

    public function approve($id)
    {
        $result = $this->requestFormRepository->getRequestFormForSendSMS($id);
        if ($result['acquired']) {
            abort(403);
        }

        $this->requestFormService->approve($result['requestForm']);
        return redirect(route('admin.home'));
    }

    public function reject(SMSRejectRequest $request, $id)
    {

        $result = $this->requestFormRepository->getRequestFormForSendSMS($id);
        if ($result['acquired']) {
            abort(403);
        }
        $this->requestFormService->reject($result['requestForm'], $request->reason_for_return);
        return redirect(route('admin.home'));
    }

     /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return  view('dashboard.createNew.add');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateNewRequest $request)
    {
        $result = $this->requestFormService->createNewFormRequest($request);

        return response()->json(['success' => $result['success'], 'msg' => $result['msg']], $result['code']);
    }

    public function list(Request $request)
    {
        $searchParams = $request->all();
        $listWating = $this->requestFormService->getListWaiting($searchParams);
        $admins = $this->accountManagementService->getAll();

        return view('dashboard.request-form.list', compact('listWating', 'searchParams', 'admins'));
    }
}
