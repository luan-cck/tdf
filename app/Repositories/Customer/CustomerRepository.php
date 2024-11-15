<?php

namespace App\Repositories\Customer;

use App\Models\Customer;
use App\Repositories\BaseRepository;

class CustomerRepository extends BaseRepository implements CustomerRepositoryInterface {

    /**
     * Specify Model class name
     *
     * @return string
     */
    function model()
    {
        return Customer::class;
    }
}
