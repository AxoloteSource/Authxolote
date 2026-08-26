<?php

namespace App\Logics\Menu;

use App\Http\Resources\Menu\MenuIndexResource;
use App\Models\Menu;
use AxoloteSource\Logics\Data\IndexData;
use AxoloteSource\Logics\Logics\IndexLogic;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Spatie\LaravelData\Data;

class MenuIndexLogic extends IndexLogic
{
    public Model|Menu $model;

    public function __construct(Menu $model)
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
            ->with('application')
            ->withCount('items');
    }

    protected function tableHeaders(): array
    {
        return [
            'name' => 'Name',
            'application' => 'Application',
            'items_count' => 'Items',
            'active' => 'Active',
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
        return MenuIndexResource::collection($this->response);
    }
}
