<?php

namespace App\Repositories\Document;

use App\Repositories\BaseRepositoryInterface;

interface DocumentRepositoryInterface extends BaseRepositoryInterface
{
    public function getDocumentsByCustomerId(array $customerIds);
}
