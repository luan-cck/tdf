<?php

namespace App\Repositories\RequestForm;

use App\Models\RequestForm;
use App\Models\Status;
use App\Repositories\BaseRepository;
use Illuminate\Support\Facades\DB;
use App\Constants;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class RequestFormRepository extends BaseRepository implements RequestFormRepositoryInterface {

    /**
     * Specify Model class name
     *
     * @return string
     */
    function model()
    {
        return RequestForm::class;
    }

    private function isAquiredRequestFormYet($id) {
        $key = Constants::REQUEST_FORM_CACHE_PREFIX . $id;
        $userAcquired = Cache::get($key, null);
        $authUser = Auth::user();
        $ignoreCondition = $authUser->isSuperAdmin();

        # Full access for SuperAdmin Role
        if (!$userAcquired) {
            if (!Cache::add($key, $authUser->id, Constants::REQUEST_FORM_CACHE_TTL_IN_SECONDS)) {
                // Atomic action
                if (!$ignoreCondition) {
                    abort(403);
                }
            }
            $userAcquired = $authUser->id;
        }

        $acquired = $userAcquired != $authUser->id;
        if ($acquired && !$ignoreCondition) {
            abort(403);
        }

        return $userAcquired != $authUser->id;
    }

    function getRequestFormForSendSMS($id) {
        # Locking View/Edit
        $acquired = $this->isAquiredRequestFormYet($id);

        $requestForm = $this->model->where('id', $id)
            ->whereHas('status', function ($q) {
                $q->whereIn('status', [Status::CREATED_STATUS, Status::PENDING_STATUS]);
            })->with(['status' => function ($q) {
                $q->with('admin');
            }])->first();

        if (!$requestForm) {
            abort(404);
        }

        if (!$acquired) {
            // For later release locking after view/edit
            $requestFormIdBeingEditted = Constants::REQUEST_FORM_CACHE_ID . Auth::user()->id;
            Cache::put($requestFormIdBeingEditted, $id, Constants::REQUEST_FORM_CACHE_TTL_IN_SECONDS);
        }
        return compact('requestForm', 'acquired');
    }

    public function createBaseQuery($conditions)
    {
        $query = $this->model;

        $latestStatusCTE = DB::raw('(SELECT id, request_id, status, author_id, created_at
            FROM status
            WHERE id IN (SELECT MAX(id) FROM status GROUP BY request_id)
        ) AS latest_status');

        $createdStatusCTE = DB::raw('(SELECT id, request_id, status, author_id
            FROM status
            WHERE status = "created"
        ) AS created_status');

        $query = $query->join($latestStatusCTE, function ($join) {
                $join->on('request_forms.id', '=', 'latest_status.request_id');
            })
            ->leftJoin($createdStatusCTE, function ($join) {
                $join->on('request_forms.id', '=', 'created_status.request_id');
            })
            ->leftJoin('admins', 'created_status.author_id', '=', 'admins.id')
            ->leftJoin('admins As ad', 'latest_status.author_id', '=', 'ad.id')
            ->select('request_forms.*', 'latest_status.created_at as latest_status_created_at','latest_status.status', 'admins.username', 'ad.username AS confirmed');

        if (!empty($conditions['request_type_name'])) {
            $query = $query->where('request_type_name', $conditions['request_type_name']);
        }

        if (isset($conditions['date_from'])) {
            $query->where('request_forms.created_at', ">=", $conditions['date_from']);
        }

        if (isset($conditions['date_to'])) {
            $query->where('request_forms.created_at', "<=", $conditions['date_to']);
        }

        if (isset($conditions['request_types']) && count($conditions['request_types']) > 0) {
            $query->whereIn('request_forms.request_type_name', $conditions['request_types']);
        }

        if (isset($conditions['policyNumber']) && strlen($conditions['policyNumber']) > 0) {
            $query->where('request_forms.policy_number', 'like', '%'.$conditions['policyNumber'].'%');
        }
        if (isset($conditions['applicationReceptionNumber']) && strlen($conditions['applicationReceptionNumber']) > 0) {
            $query->where('request_forms.application_reception_number', 'like', '%'.$conditions['applicationReceptionNumber'].'%');
        }
        if (isset($conditions['contractorName']) && strlen($conditions['contractorName']) > 0) {
            $query->where('request_forms.contractor_name', 'like', '%'.$conditions['contractorName'].'%');
        }
        if (isset($conditions['phone']) && strlen($conditions['phone']) > 0) {
            $query->where('request_forms.phone', 'like', '%'.$conditions['phone'].'%');
        }

        if (isset($conditions['author']) && !empty($conditions['author'])) {
            $authors = is_array($conditions['author']) ? $conditions['author'] : [$conditions['author']];
            $query->whereIn('created_status.author_id', $authors);
        }

        if (isset($conditions['productName']) && !empty($conditions['productName'])) {
            $query->whereIN('request_forms.product_id', $conditions['productName']);
        }

        return $query;
    }

    public function getListWaiting($conditions)
    {
        $perPage = $conditions['limit'] ?? Constants::PER_PAGE;
        $query = $this->createBaseQuery($conditions)
            ->whereIn('latest_status.status', [Status::CREATED_STATUS, Status::PENDING_STATUS]);

        //logger()->info( $query->toSql() );
        $result = $query->orderBy('request_forms.created_at', 'desc')->paginate($perPage);

        // Handle request-form if already "acquired"
        $ids = $result->getCollection()->pluck('id')->transform(function($item) {
            return Constants::REQUEST_FORM_CACHE_PREFIX . $item;
        });
        $lockIds = Cache::getMultiple($ids);
        $result->getCollection()->transform(function($requestForm) use ($lockIds) {
            $lockValue = $lockIds[Constants::REQUEST_FORM_CACHE_PREFIX . $requestForm->id];
            $requestForm['acquired'] = $lockValue &&  $lockValue != Auth::user()->id;
            return $requestForm;
        });
        return $result;
    }

    public function getListReturn($conditions)
    {
        $perPage = $conditions['limit'] ?? Constants::PER_PAGE;
        $query = $this->createBaseQuery($conditions)
            ->whereIn('latest_status.status', [Status::REJECT_STATUS]);

        if (isset($conditions['confirmedBy']) && !empty($conditions['confirmedBy'])) {
            $approvedStatusCTE = DB::raw('(SELECT id, request_id, status, author_id
                FROM status
                WHERE status = "approve"
            ) AS approve_status');

            $query = $query->leftJoin($approvedStatusCTE, function ($join) {
                $join->on('request_forms.id', '=', 'approve_status.request_id');
            });

            $query->whereIn('approve_status.author_id', $conditions['confirmedBy']);
        }

        //logger()->info( $query->toSql() );
        return $query->orderBy('request_forms.created_at', 'desc')->paginate($perPage);
    }

    public function dataExportCsv($conditions)
    {
        $query = $this->model;
        if(!isset($conditions['selectAll'])) {
            $query =  $query->whereIn('request_forms.id', $conditions);
        }

        $latestStatusCTE = DB::raw('(SELECT id, request_id, status, author_id, cancellation_reason, created_at, other_cancellation_reason
            FROM status
            WHERE id IN (SELECT MAX(id) FROM status GROUP BY request_id)
        ) AS latest_status');

        $subquery = DB::table('customers as c3')
            ->join('relationships as r', 'c3.id', '=', 'r.related_customer_id')
            ->distinct()->pluck('c3.id');
        $queryCustomer = DB::table('customers as c1')
            ->leftJoin('relationships as r', function ($join) {
                $join->on('c1.id', '=', 'r.customer_id');
            })
            ->leftJoin('customers as c2', function ($join) {
                $join->on('r.related_customer_id', '=', 'c2.id')
                    ->whereColumn('c1.request_id', 'c2.request_id');
            })
            ->select(
                'c1.id as customer_id',
                DB::raw('COALESCE(c2.id, NULL) as related_customer_id'),
                'c1.name as customer_name',
                DB::raw('COALESCE(c2.name, NULL) as related_customer_name'),
                DB::raw('COALESCE(r.relationship_type, NULL) as relationship_type'),
                'c1.request_id as request_id'
            )
            ->whereNotIn('c1.id', $subquery);

        $query = $query->select([
                'request_forms.id',
                'request_forms.policy_number',
                'request_forms.application_reception_number',
                'request_forms.contractor_name',
                'subquery.customer_name',
                'request_forms.phone',
                'subquery.related_customer_name',
                'subquery.relationship_type',
                'latest_status.created_at',
                'request_forms.request_uid',
                'bank_info.bank_name',
                'bank_info.bank_code',
                'bank_info.branch_name as bank_info_branch_name',
                'bank_info.branch_code as bank_info_branch_code',
                'bank_info.bank_type as bank_info_bank_type',
                'bank_info.account_number as bank_info_account_number',
                'bank_info.account_name as bank_info_account_name',
                'latest_status.cancellation_reason',
                'latest_status.other_cancellation_reason',
                'bank_info.currency as bank_info_currency'
            ])
            ->join($latestStatusCTE, function ($join) {
                $join->on('request_forms.id', '=', 'latest_status.request_id');
            });

            $query = $query->whereIn('latest_status.status', [Status::SUBMIT_STATUS])
            ->join('m_products_details', function ($join) {
                $join->on('m_products_details.product_id', '=', 'request_forms.product_id');
            })
            ->leftJoinSub($queryCustomer, 'subquery', function ($join) {
                $join->on('request_forms.id', '=', 'subquery.request_id');
            })

            ->leftJoin('bank_info', function ($join) {
                $join->on('bank_info.customer_id', '=', 'subquery.customer_id');
            });

            if (!empty($conditions['request_type_name'])) {
                $query = $query->where('request_type_name', $conditions['request_type_name']);
            }

            if (isset($conditions['date_from'])) {
                $query->where('request_forms.created_at', ">=", $conditions['date_from']);
            }

            if (isset($conditions['date_to'])) {
                $query->where('request_forms.created_at', "<=", $conditions['date_to']);
            }

            if (isset($conditions['request_types']) && count($conditions['request_types']) > 0) {
                $query->whereIn('request_forms.request_type_name', $conditions['request_types']);
            }

            if (isset($conditions['policyNumber']) && strlen($conditions['policyNumber']) > 0) {
                $query->where('request_forms.policy_number', 'like', '%'.$conditions['policyNumber'].'%');
            }
            if (isset($conditions['applicationReceptionNumber']) && strlen($conditions['applicationReceptionNumber']) > 0) {
                $query->where('request_forms.application_reception_number', 'like', '%'.$conditions['applicationReceptionNumber'].'%');
            }
            if (isset($conditions['contractorName']) && strlen($conditions['contractorName']) > 0) {
                $query->where('request_forms.contractor_name', 'like', '%'.$conditions['contractorName'].'%');
            }
            if (isset($conditions['phone']) && strlen($conditions['phone']) > 0) {
                $query->where('request_forms.phone', 'like', '%'.$conditions['phone'].'%');
            }

            if (isset($conditions['author']) && !empty($conditions['author'])) {
                $authors = is_array($conditions['author']) ? $conditions['author'] : [$conditions['author']];
                $query->whereIn('created_status.author_id', $authors);
            }

            if (isset($conditions['productName']) && !empty($conditions['productName'])) {
                $query->whereIN('request_forms.product_id', $conditions['productName']);
            }

            if (isset($conditions['status_date_from'])) {
                $query->where('latest_status.created_at', ">=", $conditions['status_date_from']);
            }

            if (isset($conditions['status_date_to'])) {
                $query->where('latest_status.created_at', "<=", $conditions['status_date_to']);
            }

            if (isset($conditions['downloaded']) && $conditions['downloaded'] !== null) {
                $query->where('request_forms.downloaded', $conditions['downloaded']);
            }

            return $query->orderBy('latest_status.created_at', 'desc')->get();
    }

    public function getPathFiles($arrayRequestId)
    {

        // Update the 'downloaded' status
        $this->model->whereIn('request_forms.id', $arrayRequestId)->update(['downloaded' => 1]);

        // Retrieve the document paths
        $documentPaths = $this->model
            ->leftJoin('customers', function ($join) {
                $join->on('customers.request_id', '=', 'request_forms.id');
            })
            ->leftJoin('documents', function ($join) {
                $join->on('documents.customer_id', '=', 'customers.id');
            })
            ->whereIn('request_forms.id', $arrayRequestId)
            ->whereNotNull('documents.document_path')
            ->pluck('documents.document_path');

        return $documentPaths;
    }

    public function smsSentList($conditions)
    {
        $perPage = $conditions['limit'] ?? Constants::PER_PAGE;
        $query = $this->createBaseQuery($conditions)
            ->whereIn('latest_status.status', [
                Status::APPROVE_STATUS,
                Status::BLOCK_STATUS,
                Status::SUBMIT_STATUS
            ]);

        if (isset($conditions['confirmedBy']) && !empty($conditions['confirmedBy'])) {
            $approvedStatusCTE = DB::raw('(SELECT id, request_id, status, author_id
                FROM status
                WHERE status = "approve"
            ) AS approve_status');

            $query = $query->leftJoin($approvedStatusCTE, function ($join) {
                $join->on('request_forms.id', '=', 'approve_status.request_id');
            });

            $query->whereIn('approve_status.author_id', $conditions['confirmedBy']);
        }

        if ($conditions['export']) {
            $query = $query->orderBy('request_forms.created_at', 'desc')->limit(Constants::MAXIMUM_CSV_RECORDS_SUPPORT)->get();
        } else {
            $query = $query->orderBy('request_forms.created_at', 'desc')->paginate($perPage);
        }

        //logger()->info( $query->toSql() );
        return $query;
    }

    public function receptionList($conditions)
    {
        $perPage = $conditions['limit'] ?? Constants::PER_PAGE;
        $query = $this->createBaseQuery($conditions)
            ->whereIn('latest_status.status', [Status::SUBMIT_STATUS]);

        if (isset($conditions['status_date_from'])) {
            $query->where('latest_status.created_at', ">=", $conditions['status_date_from']);
        }

        if (isset($conditions['status_date_to'])) {
            $query->where('latest_status.created_at', "<=", $conditions['status_date_to']);
        }

        if (isset($conditions['downloaded'])) {
            $query->where('request_forms.downloaded', $conditions['downloaded']);
        }

        return $query->orderBy('latest_status.created_at', 'desc')->paginate($perPage);
    }

    function getReceptionDetail($id) {
        $query = $this->model;

        $latestStatusCTE = DB::raw('(SELECT id, request_id, status, author_id, cancellation_reason, created_at, other_cancellation_reason
            FROM status
            WHERE id IN (SELECT MAX(id) FROM status GROUP BY request_id)
        ) AS latest_status');

        $query = $query->select([
                'request_forms.id',
                'request_forms.created_at',
                'request_forms.request_type_name',
                'request_forms.application_reception_number',
                'request_forms.policy_number',
                'request_forms.contractor_name',
                'request_forms.phone',
                'request_forms.birthday',
                //'admins.username',
                'latest_status.created_at as latest_status_created_at',
                'latest_status.id as status_id',
                'latest_status.status',
                'latest_status.cancellation_reason',
                'latest_status.other_cancellation_reason',
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

                'related_customers.id as related_customer_id',
                'related_customers.name as related_customer_name',
                'relationships.relationship_type',
            ])
            ->join($latestStatusCTE, function ($join) {
                $join->on('request_forms.id', '=', 'latest_status.request_id');
            })
            //->join('admins', function ($join) {
            //    $join->on('admins.id', '=', 'status.author_id');
            //})
            ->join('m_products_details', function ($join) {
                $join->on('m_products_details.product_id', '=', 'request_forms.product_id');
            })->leftJoin('customers', function ($join) {
                $join->on('customers.request_id', '=', 'request_forms.id');
            })->leftJoin('relationships', function ($join) {
                $join->on('relationships.customer_id', '=', 'customers.id');
            })->leftJoin('customers as related_customers', function ($join) {
                $join->on('relationships.related_customer_id', '=', 'related_customers.id');
            })->leftJoin('bank_info', function ($join) {
                $join->on('customers.id', '=', 'bank_info.customer_id');
            })->where('request_forms.id', $id);

        return $query->distinct()->first();
    }

    public function getTotalCount()
    {
        $totalPending = $this->model->whereHas('status', function($q) {
            $q->whereIn('status', [Status::CREATED_STATUS, Status::PENDING_STATUS]);
        })->count();

        $totalReject = $this->model->whereHas('status', function($q) {
            $q->where('status', Status::REJECT_STATUS);
        })->count();

        return compact('totalPending', 'totalReject');
    }
}
