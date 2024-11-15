<?php

namespace App\Repositories\AccountManagement;

use App\Repositories\BaseRepositoryInterface;

interface AccountManagementRepositoryInterface extends BaseRepositoryInterface
{
    public function search($condition);
}
