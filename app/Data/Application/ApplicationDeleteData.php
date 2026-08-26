<?php

namespace App\Data\Application;

use Spatie\LaravelData\Attributes\FromRouteParameter;
use Spatie\LaravelData\Data;

class ApplicationDeleteData extends Data
{
    public function __construct(
        #[FromRouteParameter('id')]
        public string $id,
    ) {}
}
