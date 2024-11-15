<?php

namespace App\Repositories\AccountManagement;

use App\Models\Admin;
use App\Repositories\BaseRepository;
use App\Constants;
use Illuminate\Support\Facades\Auth;

class AccountManagementRepository extends BaseRepository implements AccountManagementRepositoryInterface {

    /**
     * Specify Model class name
     *
     * @return string
     */
    function model()
    {
        return Admin::class;
    }

    /**
     * Perform a search query.
     *
     * @param string $keyword
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function search($condition)
    {
        $perPage = $condition['limit'] ?? Constants::PER_PAGE;
        $keyword = $condition['keyword'] ?? null;
        $query = $this->model->where('id', '<>',  Auth::user()->id);

        if($keyword) {
            $query = $query->where('username', 'like', '%' . $keyword . '%');
        }

        return $query->orderBy('id', 'desc')->paginate($perPage);
    }

    public function getAll()
    {
        $query = $this->model;

        return $query->whereIn('role_id', [1, 2])->orderBy('username', 'asc')->get();
    }
}
