<?php

namespace App\Logics\UserList;

use App\Http\Resources\UserList\UserListShowResource;
use App\Models\UserList;
use AxoloteSource\Logics\Logics\ShowLogic;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Spatie\LaravelData\Data;
use Symfony\Component\HttpFoundation\StreamedResponse;

class UserListShowLogic extends ShowLogic
{
    public function __construct(UserList $model)
    {
        parent::__construct($model);
    }

    public function run(Data $input): JsonResponse|StreamedResponse
    {
        return $this->logic($input);
    }

    protected function makeQuery(): Builder
    {
        return parent::makeQuery()->with('users');
    }

    protected function withResource(): UserListShowResource
    {
        return new UserListShowResource($this->model);
    }
}
