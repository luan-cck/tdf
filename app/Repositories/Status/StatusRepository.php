<?php

namespace App\Repositories\Status;

use App\Models\RequestForm;
use App\Models\Status;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Repositories\BaseRepository;
use App\Constants;

class StatusRepository extends BaseRepository implements StatusRepositoryInterface {

    /**
     * Specify Model class name
     *
     * @return string
     */
    function model()
    {
        return Status::class;
    }


    /**
     * Perform a search query.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function search($condition, $fixed)
    {
        $perPage = $condition['limit'] ?? Constants::PER_PAGE;

        $query = $this->model;

        $query = $query->select([
                'request_forms.id as request_form_id',
                'status.id',
                'request_forms.created_at',
                'request_forms.request_type_name',
                'request_forms.application_reception_number',
                'request_forms.policy_number',
                'request_forms.contractor_name',
                'request_forms.phone',
                'admins.username',
                'status.status'
            ])->join('request_forms', function ($join) {
                $join->on('request_forms.id', '=', 'status.request_id');
            })
            ->join('admins', function ($join) {
                $join->on('admins.id', '=', 'status.author_id');
            })->whereIn('status.status', $fixed['status']);

        if (isset($condition['date_from'])) {
            $query->where('request_forms.created_at', ">=", $condition['date_from']);
        }

        if (isset($condition['date_to'])) {
            $query->where('request_forms.created_at', "<=", $condition['date_to']);
        }

        if (isset($condition['status_date_from'])) {
            $query->where('status.created_at', ">=", $condition['status_date_from']);
        }

        if (isset($condition['status_date_to'])) {
            $query->where('status.created_at', "<=", $condition['status_date_to']);
        }

        if (isset($condition['request_types']) && count($condition['request_types']) > 0) {
            $query->whereIn('request_forms.request_type_name', $condition['request_types']);
        }

        if (isset($condition['downloaded']) && $condition['downloaded'] !== null) {
            $query->where('request_forms.downloaded', $condition['downloaded']);
        }

        if (isset($condition['policyNumber']) && !empty($condition['policyNumber'])) {
            $query->where('request_forms.policy_number', 'like', '%'.$condition['policyNumber'].'%');
        }
        if (isset($condition['applicationReceptionNumber']) && !empty($condition['applicationReceptionNumber'])) {
            $query->where('request_forms.application_reception_number', 'like', '%'.$condition['applicationReceptionNumber'].'%');
        }
        if (isset($condition['contractorName']) && !empty($condition['contractorName'])) {
            $query->where('request_forms.contractor_name', 'like', '%'.$condition['contractorName'].'%');
        }
        if (isset($condition['mobilePhone']) && !empty($condition['mobilePhone'])) {
            $query->where('request_forms.phone', 'like', '%'.$condition['mobilePhone'].'%');
        }

        if (isset($condition['author']) && !empty($condition['author'])) {
            $authors = is_array($condition['author']) ? $condition['author'] : [$condition['author']];
            $query->whereIn('status.author_id', $authors);
        }

        if (isset($condition['confirmedBy']) && !empty($condition['confirmedBy'])) {
            $confirmedBys = is_array($condition['confirmedBy']) ? $condition['confirmedBy'] : [$condition['confirmedBy']];
            $query->whereIn('status.author_id', $confirmedBys)->where('status.status', 'approve');
        }

        if (isset($condition['productName']) && !empty($condition['productName'])) {
            $query->whereIN('request_forms.product_id', $condition['productName']);
        }
        if (isset($condition['request_type_name']) && !empty($condition['request_type_name'])) {
            $query->where('request_forms.request_type_name', $condition['request_type_name']);
        }

        //logger()->info( $query->toSql() );

        if ($condition['export']) {
            $query = $query->orderBy('request_forms.created_at', 'desc')->limit(Constants::MAXIMUM_CSV_RECORDS_SUPPORT)->get();
        } else {
            $query = $query->orderBy('request_forms.created_at', 'desc')->paginate($perPage);
        }

        return $query;
    }


    function getDetail($id) {
        $query = $this->model;

        $query = $query->select([
                'request_forms.id as request_form_id',
                'status.id',
                'request_forms.created_at',
                'request_forms.request_type_name',
                'request_forms.application_reception_number',
                'request_forms.policy_number',
                'request_forms.contractor_name',
                'request_forms.phone',
                'request_forms.birthday',
                'admins.username',
                'status.status',
                'status.cancellation_reason',
                'm_products_details.product_name',

                'customers.id as customer_id',
                'customers.name as customer_name',
                'customers.over_18 as customer_over_18',

                'bank_info.account_name as bank_info_account_name',
                'bank_info.account_number as bank_info_account_number',
                'bank_info.account_type as bank_info_account_type',
                'bank_info.bank_name as bank_info_bank_name',
                'bank_info.bank_code as bank_info_bank_code',
                'bank_info.branch_code as bank_info_branch_code',
                'bank_info.branch_name as bank_info_branch_name',
                'bank_info.currency as bank_info_currency',

                'related_customers.name as related_customer_name',
                'related_customers.id as related_customer_id',
                'relationships.relationship_type',

            ])->join('request_forms', function ($join) {
                $join->on('request_forms.id', '=', 'status.request_id');
            })
            ->join('admins', function ($join) {
                $join->on('admins.id', '=', 'status.author_id');
            })->join('m_products_details', function ($join) {
                $join->on('m_products_details.product_id', '=', 'request_forms.product_id');
            })->leftJoin('customers', function ($join) {
                $join->on('customers.request_id', '=', 'request_forms.id');
            })->leftJoin('relationships', function ($join) {
                $join->on('relationships.customer_id', '=', 'customers.id');
            })->leftJoin('customers as related_customers', function ($join) {
                $join->on('relationships.related_customer_id', '=', 'related_customers.id');
            })->leftJoin('bank_info', function ($join) {
                $join->on('customers.id', '=', 'bank_info.customer_id');
            })->where('status.id', $id);

        return $query->first();

    }

    public function getUnreadCount()
    {
        $totalPending = $this->model
            ->whereIn('status', [Status::CREATED_STATUS, STATUS::PENDING_STATUS])
            ->where('is_read', false)
            ->whereHas('requestForm')
            ->count();

        $totalReject = $this->model
            ->where('status', Status::REJECT_STATUS)
            ->where('is_read', false)
            ->whereHas('requestForm')
            ->count();

        $totalApprove = $this->model
            ->where('status', Status::APPROVE_STATUS)
            ->where('is_read', false)
            ->whereHas('requestForm')
            ->count();

        $totalSubmit = $this->model
            ->where('status', Status::SUBMIT_STATUS)
            ->where('is_read', false)
            ->whereHas('requestForm')
            ->count();

        return compact('totalPending', 'totalReject', 'totalApprove', 'totalSubmit');
    }

    public function markAsRead($request_id)
    {
        return $this->model->where('request_id', $request_id)->update(['is_read' => true]);
    }
}
