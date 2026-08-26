<?php

namespace App\Logics\Application;

use App\Data\Application\ApplicationStoreData;
use App\Http\Resources\Application\ApplicationShowResource;
use App\Models\Application;
use AxoloteSource\Logics\Logics\StoreLogic;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Spatie\LaravelData\Data;

class ApplicationStoreLogic extends StoreLogic
{
    public Model|Application $model;

    public ApplicationStoreData|Data $input;

    public function __construct(Application $model)
    {
        parent::__construct($model);
    }

    public function run(ApplicationStoreData|Data $input): JsonResponse
    {
        return parent::logic($input);
    }

    protected function withResource(): ApplicationShowResource
    {
        return new ApplicationShowResource($this->model);
    }
}
