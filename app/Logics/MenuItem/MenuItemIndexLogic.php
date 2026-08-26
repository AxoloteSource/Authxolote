<?php

namespace App\Logics\MenuItem;

use App\Http\Resources\MenuItem\MenuItemIndexResource;
use App\Models\MenuItem;
use AxoloteSource\Logics\Data\IndexData;
use AxoloteSource\Logics\Logics\IndexLogic;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Spatie\LaravelData\Data;

class MenuItemIndexLogic extends IndexLogic
{
    public Model|MenuItem $model;

    public function __construct(MenuItem $model)
    {
        parent::__construct($model);
    }

    public function run(IndexData|Data $input): JsonResponse
    {
        return $this->logic($input);
    }

    public function makeQuery(): Builder
    {
        return $this->model->newQuery()
            ->whereNull('parent_id')
            ->with('menu')
            ->with('children')
            ->orderBy('sort_order');
    }

    protected function tableHeaders(): array
    {
        return [
            'name' => 'Name',
            'type' => 'Type',
            'path' => 'Path',
            'menu' => 'Menu',
            'active' => 'Active',
            'actions' => 'Actions',
        ];
    }

    protected function getColumnSearch(): string
    {
        return 'name';
    }

    protected function withResource(): mixed
    {
        return MenuItemIndexResource::collection($this->response);
    }
}
