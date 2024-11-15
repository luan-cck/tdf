<?php

namespace App\Repositories\RequestFormToken;

use App\Repositories\BaseRepositoryInterface;
use App\Models\RequestFormToken;

interface RequestFormTokenRepositoryInterface extends BaseRepositoryInterface
{
    public function getNonVeriyToken($token, $birthday=null);

    public function updateIncorrectBirthdayTimes(RequestFormToken $requestFormToken);
}
