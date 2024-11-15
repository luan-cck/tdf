<?php

namespace App\Repositories\Status;

use App\Repositories\BaseRepositoryInterface;

interface StatusRepositoryInterface extends BaseRepositoryInterface
{

    public function search($condition, $fixed);

    public function getDetail($id);

    public function getUnreadCount();

    public function markAsRead($request_id);
}
