<?php

namespace App\Http\Controllers\V1\Application;

use App\Data\Application\ApplicationDeleteData;
use App\Data\Application\ApplicationShowData;
use App\Data\Application\ApplicationStoreData;
use App\Data\Application\ApplicationUpdateData;
use App\Http\Controllers\Controller;
use App\Logics\Application\ApplicationDeleteLogic;
use App\Logics\Application\ApplicationIndexLogic;
use App\Logics\Application\ApplicationShowLogic;
use App\Logics\Application\ApplicationStoreLogic;
use App\Logics\Application\ApplicationUpdateLogic;
use AxoloteSource\Logics\Data\IndexData;
use Illuminate\Http\JsonResponse;

class ApplicationController extends Controller
{
    public function index(IndexData $data, ApplicationIndexLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function show(ApplicationShowData $data, ApplicationShowLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function store(ApplicationStoreData $data, ApplicationStoreLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function update(ApplicationUpdateData $data, ApplicationUpdateLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function destroy(ApplicationDeleteData $data, ApplicationDeleteLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }
}
