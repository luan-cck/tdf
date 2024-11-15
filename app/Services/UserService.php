<?php

namespace App\Services;

use App\Repository\UserRepository;

class UserService extends BaseService
{
    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    public function encryptUId($userId) {
        $hash = hash('sha256', $userId);
        $binaryData = hex2bin($hash);
        $encoded = str_replace(['+', '/', '='], '', base64_encode($binaryData));

        // Return the first 6-10 characters
        return substr($encoded, 0, 10);
    }
}
