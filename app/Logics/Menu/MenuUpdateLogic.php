<?php

namespace App\Logics\Menu;

use App\Data\Menu\MenuUpdateData;
use App\Http\Resources\Menu\MenuShowResource;
use App\Models\Menu;
use AxoloteSource\Logics\Logics\UpdateLogic;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Spatie\LaravelData\Data;

class MenuUpdateLogic extends UpdateLogic
{
    public Model|Menu $model;

    public MenuUpdateData|Data $input;

    public function __construct(Menu $model)
    {
        parent::__construct($model);
    }

    public function run(MenuUpdateData|Data $input): JsonResponse
    {
        return parent::logic($input);
    }

    protected function withResource(): MenuShowResource
    {
        return new MenuShowResource($this->model);
    }
}
