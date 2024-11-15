<?php

namespace App\Repositories\RequestForm;

use App\Repositories\BaseRepositoryInterface;

interface RequestFormRepositoryInterface extends BaseRepositoryInterface
{
    public function getRequestFormForSendSMS($condition);

    public function getListWaiting($conditions);

    public function getReceptionDetail($id);

    public function dataExportCsv($arrayRequestId);

    public function getPathFiles($arrayRequestId);

    public function smsSentList($conditions);

    public function getTotalCount();
}
