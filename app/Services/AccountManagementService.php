<?php

namespace App\Services;

use App\Repositories\AccountManagement\AccountManagementRepositoryInterface;
use Log;

class AccountManagementService extends BaseService
{
    protected $accountRepository;

    public function __construct(AccountManagementRepositoryInterface $accountRepository)
    {
        $this->accountRepository = $accountRepository;
    }

    public function getAccountByCondition($conditions)
    {
        return $this->accountRepository->search($conditions);
    }

    public function createNewAccount($data)
    {
        try {
            $account =  $this->accountRepository->create($data);
            return ['success' => true, 'data' => $account,'msg' =>'success', 'code' =>200];
        } catch (Exception $exception) {
            Log::error('Error create request ' . $exception->getMessage() . ' ' . $exception->getLine());
            return [
                'success' => false,
                'msg' => $exception->getMessage(),
                'code' => 500
            ];
        }
    }

    public function updateAccount($data, $id)
    {
        try {
            $account =  $this->accountRepository->update($data, $id);
            return ['success' => true, 'data' => $account,'msg' =>'success', 'code' =>200];
        } catch (Exception $exception) {
            Log::error('Error create request ' . $exception->getMessage() . ' ' . $exception->getLine());
            return [
                'success' => false,
                'msg' => $exception->getMessage(),
                'code' => 500
            ];
        }
    }

    public function delete($id)
    {
        try {
            $account =  $this->accountRepository->delete($id);
            return ['success' => true, 'msg' =>'success', 'code' =>200];
        } catch (Exception $exception) {
            Log::error('Error create request ' . $exception->getMessage() . ' ' . $exception->getLine());
            return [
                'success' => false,
                'msg' => $exception->getMessage(),
                'code' => 500
            ];
        }
    }

    public function getAll() {
        return $this->accountRepository->getAll();
    }
}
