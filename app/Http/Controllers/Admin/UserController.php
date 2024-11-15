<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repository\UserRepository;
use App\Services\UserService;

class UserController extends Controller {
    private $userService;

    public function __construct(UserService $userService){
        $this->userService = $userService;
    }

    public function index() {
        return $this->userService->all();
    }
}
