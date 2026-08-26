<?php

namespace App\Logics\Application;

use App\Data\Application\ApplicationDeleteData;
use App\Models\Application;
use AxoloteSource\Logics\Logics\DeleteLogic;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Spatie\LaravelData\Data;

class ApplicationDeleteLogic extends DeleteLogic
{
    public Model|Application $model;

    public ApplicationDeleteData|Data $input;

    public function __construct(Application $model)
    {
        parent::__construct($model);
    }

    public function run(ApplicationDeleteData|Data $input): JsonResponse
    {
        return parent::logic($input);
    }
}
