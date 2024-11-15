<?php

namespace App\Repositories\Document;
use App\Models\Document;
use App\Repositories\BaseRepository;

class DocumentRepository extends BaseRepository implements DocumentRepositoryInterface
{

    /**
     * Specify Model class name
     *
     * @return string
     */
    function model()
    {
        return Document::class;
    }

    public function getDocumentsByCustomerId(array $customerIds) {
        $data = $this->model->whereIn('customer_id', $customerIds)->get();
        $documents = [];
        foreach($data as $item) {
            $documents[$item->document_type] = $item->document_path;
        }
        return $documents;
    }
}
