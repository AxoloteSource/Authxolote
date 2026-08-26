<?php

namespace App\Logics\Application;

use App\Data\Application\ApplicationUpdateData;
use App\Http\Resources\Application\ApplicationShowResource;
use App\Models\Application;
use AxoloteSource\Logics\Logics\UpdateLogic;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Spatie\LaravelData\Data;

class ApplicationUpdateLogic extends UpdateLogic
{
    public Model|Application $model;

    public ApplicationUpdateData|Data $input;

    public function __construct(Application $model)
    {
        parent::__construct($model);
    }

    public function run(ApplicationUpdateData|Data $input): JsonResponse
    {
        return parent::logic($input);
    }

    protected function withResource(): ApplicationShowResource
    {
        return new ApplicationShowResource($this->model);
    }
}
