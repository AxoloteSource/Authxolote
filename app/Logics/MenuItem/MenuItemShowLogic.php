<?php

namespace App\Logics\MenuItem;

use App\Data\MenuItem\MenuItemShowData;
use App\Http\Resources\MenuItem\MenuItemShowResource;
use App\Models\MenuItem;
use AxoloteSource\Logics\Logics\ShowLogic;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Spatie\LaravelData\Data;
use Symfony\Component\HttpFoundation\StreamedResponse;

class MenuItemShowLogic extends ShowLogic
{
    public MenuItemShowData|Data $input;

    public function __construct(MenuItem $model)
    {
        parent::__construct($model);
    }

    public function run(MenuItemShowData|Data $input): JsonResponse|StreamedResponse
    {
        return $this->logic($input);
    }

    protected function makeQuery(): Builder
    {
        return parent::makeQuery()
            ->with(['menu', 'parent', 'children' => fn ($query) => $query->orderBy('sort_order')]);
    }

    protected function withResource(): MenuItemShowResource
    {
        return new MenuItemShowResource($this->model);
    }
}
