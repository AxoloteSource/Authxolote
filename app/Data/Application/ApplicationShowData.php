<?php

namespace App\Data\Application;

use Spatie\LaravelData\Attributes\FromRouteParameter;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;

class ApplicationShowData extends Data
{
    public function __construct(
        #[FromRouteParameter('slug')]
        #[Rule('required|string|max:255')]
        public string $slug,
    ) {}
}
