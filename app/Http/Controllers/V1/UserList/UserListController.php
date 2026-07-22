<?php

namespace App\Http\Controllers\V1\UserList;

use App\Data\UserList\UserListDeleteData;
use App\Data\UserList\UserListShowData;
use App\Data\UserList\UserListStoreData;
use App\Data\UserList\UserListUpdateData;
use App\Http\Controllers\Controller;
use App\Logics\UserList\UserListDeleteLogic;
use App\Logics\UserList\UserListIndexLogic;
use App\Logics\UserList\UserListShowLogic;
use App\Logics\UserList\UserListStoreLogic;
use App\Logics\UserList\UserListUpdateLogic;
use AxoloteSource\Logics\Data\IndexData;
use Illuminate\Http\JsonResponse;

class UserListController extends Controller
{
    public function index(IndexData $data, UserListIndexLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function show(UserListShowData $data, UserListShowLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function store(UserListStoreData $data, UserListStoreLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function update(UserListUpdateData $data, UserListUpdateLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function destroy(UserListDeleteData $data, UserListDeleteLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }
}
