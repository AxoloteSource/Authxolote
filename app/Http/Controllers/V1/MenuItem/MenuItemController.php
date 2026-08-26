<?php

namespace App\Http\Controllers\V1\MenuItem;

use App\Data\MenuItem\MenuItemDeleteData;
use App\Data\MenuItem\MenuItemShowData;
use App\Data\MenuItem\MenuItemStoreData;
use App\Data\MenuItem\MenuItemUpdateData;
use App\Http\Controllers\Controller;
use App\Logics\MenuItem\MenuItemDeleteLogic;
use App\Logics\MenuItem\MenuItemIndexLogic;
use App\Logics\MenuItem\MenuItemShowLogic;
use App\Logics\MenuItem\MenuItemStoreLogic;
use App\Logics\MenuItem\MenuItemUpdateLogic;
use AxoloteSource\Logics\Data\IndexData;
use Illuminate\Http\JsonResponse;

class MenuItemController extends Controller
{
    public function index(IndexData $data, MenuItemIndexLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function show(MenuItemShowData $data, MenuItemShowLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function store(MenuItemStoreData $data, MenuItemStoreLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function update(MenuItemUpdateData $data, MenuItemUpdateLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function destroy(MenuItemDeleteData $data, MenuItemDeleteLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }
}
