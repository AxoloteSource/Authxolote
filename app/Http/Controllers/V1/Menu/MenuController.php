<?php

namespace App\Http\Controllers\V1\Menu;

use App\Data\Menu\MenuDeleteData;
use App\Data\Menu\MenuSetupData;
use App\Data\Menu\MenuShowData;
use App\Data\Menu\MenuStoreData;
use App\Data\Menu\MenuUpdateData;
use App\Http\Controllers\Controller;
use App\Logics\Menu\MenuDeleteLogic;
use App\Logics\Menu\MenuIndexLogic;
use App\Logics\Menu\MenuSetupLogic;
use App\Logics\Menu\MenuShowAllLogic;
use App\Logics\Menu\MenuShowLogic;
use App\Logics\Menu\MenuStoreLogic;
use App\Logics\Menu\MenuUpdateLogic;
use AxoloteSource\Logics\Data\IndexData;
use Illuminate\Http\JsonResponse;

class MenuController extends Controller
{
    public function index(IndexData $data, MenuIndexLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function show(MenuShowData $data, MenuShowLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function showAll(MenuShowData $data, MenuShowAllLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function store(MenuStoreData $data, MenuStoreLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function update(MenuUpdateData $data, MenuUpdateLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function destroy(MenuDeleteData $data, MenuDeleteLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function setup(MenuSetupData $data, MenuSetupLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }
}
