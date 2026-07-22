<?php

namespace App\Http\Controllers\V1\User;

use App\Data\User\UserIndexData;
use App\Http\Controllers\Controller;
use App\Logics\User\UserIndexLogic;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function index(UserIndexData $data, UserIndexLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }
}
