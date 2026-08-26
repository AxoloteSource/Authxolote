<?php

namespace App\Logics\Application;

use App\Data\Application\ApplicationShowData;
use App\Http\Resources\Application\ApplicationShowResource;
use App\Models\Application;
use AxoloteSource\Logics\Logics\ShowLogic;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Spatie\LaravelData\Data;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ApplicationShowLogic extends ShowLogic
{
    public ApplicationShowData|Data $input;

    public function __construct(Application $model)
    {
        parent::__construct($model);
    }

    public function run(ApplicationShowData|Data $input): JsonResponse|StreamedResponse
    {
        return $this->logic($input);
    }

    protected function makeQuery(): Builder
    {
        return $this->model->newQuery()
            ->where('slug', $this->input->slug)
            ->with(['menus' => fn ($query) => $query->orderBy('sort_order')]);
    }

    protected function withResource(): ApplicationShowResource
    {
        return new ApplicationShowResource($this->model);
    }
}
