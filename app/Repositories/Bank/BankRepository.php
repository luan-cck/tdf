<?php

namespace App\Repositories\Bank;

use App\Models\BankInfo;
use App\Repositories\BaseRepository;

class BankRepository extends BaseRepository implements BankRepositoryInterface
{

    /**
     * Specify Model class name
     *
     * @return string
     */
    function model()
    {
        return BankInfo::class;
    }
}
