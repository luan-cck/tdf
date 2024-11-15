<?php

namespace App\Repositories\CustomerRelationship;

use App\Models\Relationship;
use App\Repositories\BaseRepository;

class CustomerRelationshipRepository extends BaseRepository implements CustomerRelationshipRepositoryInterface
{

    /**
     * Specify Model class name
     *
     * @return string
     */
    function model()
    {
        return Relationship::class;
    }
}
