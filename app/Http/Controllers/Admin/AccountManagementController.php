<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Services\AccountManagementService;
use Illuminate\Http\Request;
use App\Http\Requests\AccountManagement\RegisterRequest;
use App\Http\Requests\AccountManagement\UpdateAccountRequest;
use Hash;
use App\Models\Admin;

class AccountManagementController extends Controller
{
    protected $accountService;

    public function __construct(
        AccountManagementService $accountService
    ) {
        $this->accountService = $accountService;
    }

    public function getListAccount(Request $request)
    {
        $searchParams = $request->only(['keyword', 'limit']);
        $admins = $this->accountService->getAccountByCondition($searchParams);

        return view('dashboard.accountManage.index', compact('admins', 'searchParams'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RegisterRequest $request)
    {
        $data = $request->only('username', 'password', 'role_id', 'email');
        $data['password'] = Hash::make($data['password']);
        $result = $this->accountService->createNewAccount($data);
        if(!$result['success']) {
            return response()->json(['success' => $result['success'], 'msg' => $result['msg']], $result['code']);
        }

        return response()->json(['success' => $result['success'], 'data' => $result['data']], $result['code']); 
    }

    public function update(UpdateAccountRequest $request, $id)
    { 
        if ($request->password) {
            $data = $request->only('username', 'password', 'role_id', 'email', 'id');
            $data['password'] = Hash::make($data['password']);
        } else {
            $data = $request->only('username', 'role_id', 'email', 'id');
        }
        
        $result = $this->accountService->updateAccount($data, $id);
        if(!$result['success']) {
            return response()->json(['success' => $result['success'], 'msg' => $result['msg']], $result['code']);
        }

        return response()->json(['success' => $result['success'], 'data' => $result['data']], $result['code']); 
    }

    public function delete(Request $request, $id)
    { 
        $request->validate([
            'id' => 'required|integer|exists:admins,id',
        ]);
        $result = $this->accountService->delete($id);
        if(!$result['success']) {
            return response()->json(['success' => $result['success'], 'msg' => $result['msg']], $result['code']);
        }

        return response()->json(['success' => $result['success'], 'msg' => $result['msg']], $result['code']); 
    }
}
