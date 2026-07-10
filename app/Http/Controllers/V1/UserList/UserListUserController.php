<?php

namespace App\Http\Controllers\V1\UserList;

use App\Data\UserList\UserListUsersData;
use App\Http\Controllers\Controller;
use App\Logics\UserList\UserListUsersLogic;
use Illuminate\Http\JsonResponse;

class UserListUserController extends Controller
{
    public function index(UserListUsersData $data, UserListUsersLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }
}
