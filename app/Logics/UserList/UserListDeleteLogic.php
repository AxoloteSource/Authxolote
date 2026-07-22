<?php

namespace App\Logics\UserList;

use App\Data\UserList\UserListDeleteData;
use App\Models\UserList;
use AxoloteSource\Logics\Logics\DeleteLogic;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Spatie\LaravelData\Data;

class UserListDeleteLogic extends DeleteLogic
{
    public Model|UserList $model;

    public UserListDeleteData|Data $input;

    public function __construct(UserList $model)
    {
        parent::__construct($model);
    }

    public function run(UserListDeleteData|Data $input): JsonResponse
    {
        return parent::logic($input);
    }
}
