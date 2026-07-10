<?php

namespace App\Logics\UserList;

use App\Data\UserList\UserListUpdateData;
use App\Http\Resources\UserList\UserListShowResource;
use App\Models\UserList;
use AxoloteSource\Logics\Logics\UpdateLogic;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Spatie\LaravelData\Data;

class UserListUpdateLogic extends UpdateLogic
{
    public Model|UserList $model;

    public UserListUpdateData|Data $input;

    public function __construct(UserList $model)
    {
        parent::__construct($model);
    }

    public function run(UserListUpdateData|Data $input): JsonResponse
    {
        return parent::logic($input);
    }

    protected function after(): bool
    {
        if (! empty($this->input->user_ids)) {
            $this->model->users()->syncWithoutDetaching($this->input->user_ids);
        }

        return true;
    }

    protected function withResource(): UserListShowResource
    {
        return new UserListShowResource($this->model);
    }
}
