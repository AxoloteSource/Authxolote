<?php

namespace App\Logics\Menu;

use App\Data\Menu\MenuDeleteData;
use App\Models\Menu;
use AxoloteSource\Logics\Logics\DeleteLogic;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Spatie\LaravelData\Data;

class MenuDeleteLogic extends DeleteLogic
{
    public Model|Menu $model;

    public MenuDeleteData|Data $input;

    public function __construct(Menu $model)
    {
        parent::__construct($model);
    }

    public function run(MenuDeleteData|Data $input): JsonResponse
    {
        return parent::logic($input);
    }
}
