<?php

namespace App\Logics\Menu;

use App\Data\Menu\MenuStoreData;
use App\Http\Resources\Menu\MenuShowResource;
use App\Models\Menu;
use AxoloteSource\Logics\Logics\StoreLogic;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Spatie\LaravelData\Data;

class MenuStoreLogic extends StoreLogic
{
    public Model|Menu $model;

    public MenuStoreData|Data $input;

    public function __construct(Menu $model)
    {
        parent::__construct($model);
    }

    public function run(MenuStoreData|Data $input): JsonResponse
    {
        return parent::logic($input);
    }

    protected function withResource(): MenuShowResource
    {
        return new MenuShowResource($this->model);
    }
}
