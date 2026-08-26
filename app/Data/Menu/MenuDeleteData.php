<?php

namespace App\Data\Menu;

use Spatie\LaravelData\Attributes\FromRouteParameter;
use Spatie\LaravelData\Data;

class MenuDeleteData extends Data
{
    public function __construct(
        #[FromRouteParameter('id')]
        public string $id,
    ) {}
}
