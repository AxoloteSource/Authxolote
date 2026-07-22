<?php

namespace App\Logics\UserList;

use App\Http\Resources\UserList\UserListIndexResource;
use App\Models\UserList;
use AxoloteSource\Logics\Data\IndexData;
use AxoloteSource\Logics\Logics\IndexLogic;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Spatie\LaravelData\Data;

class UserListIndexLogic extends IndexLogic
{
    public Model|UserList $model;

    public function __construct(UserList $model)
    {
        parent::__construct($model);
    }

    public function run(IndexData|Data $input): JsonResponse
    {
        return $this->logic($input);
    }

    public function makeQuery(): Builder
    {
        return $this->model->newQuery()->withCount('users');
    }

    protected function tableHeaders(): array
    {
        return [
            'name' => 'Name',
            'description' => 'Description',
            'users_count' => 'Users',
            'created_at' => 'Created At',
            'actions' => 'Actions',
        ];
    }

    protected function getColumnSearch(): string
    {
        return 'name';
    }

    protected function withResource(): mixed
    {
        return UserListIndexResource::collection($this->response);
    }
}
