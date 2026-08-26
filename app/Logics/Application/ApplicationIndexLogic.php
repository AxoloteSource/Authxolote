<?php

namespace App\Logics\Application;

use App\Http\Resources\Application\ApplicationIndexResource;
use App\Models\Application;
use AxoloteSource\Logics\Data\IndexData;
use AxoloteSource\Logics\Logics\IndexLogic;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Spatie\LaravelData\Data;

class ApplicationIndexLogic extends IndexLogic
{
    public Model|Application $model;

    public function __construct(Application $model)
    {
        parent::__construct($model);
    }

    public function run(IndexData|Data $input): JsonResponse
    {
        return $this->logic($input);
    }

    public function makeQuery(): Builder
    {
        return $this->model->newQuery()->withCount('menus');
    }

    protected function tableHeaders(): array
    {
        return [
            'name' => 'Name',
            'slug' => 'Slug',
            'menus_count' => 'Menus',
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
        return ApplicationIndexResource::collection($this->response);
    }
}
