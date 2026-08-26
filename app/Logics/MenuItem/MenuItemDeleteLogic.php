<?php

namespace App\Logics\MenuItem;

use App\Data\MenuItem\MenuItemDeleteData;
use App\Models\MenuItem;
use AxoloteSource\Logics\Logics\DeleteLogic;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Spatie\LaravelData\Data;

class MenuItemDeleteLogic extends DeleteLogic
{
    public Model|MenuItem $model;

    public MenuItemDeleteData|Data $input;

    public function __construct(MenuItem $model)
    {
        parent::__construct($model);
    }

    public function run(MenuItemDeleteData|Data $input): JsonResponse
    {
        return parent::logic($input);
    }
}
