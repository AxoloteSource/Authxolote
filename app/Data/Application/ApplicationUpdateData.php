<?php

namespace App\Data\Application;

use Spatie\LaravelData\Attributes\FromRouteParameter;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;

class ApplicationUpdateData extends Data
{
    public function __construct(
        #[FromRouteParameter('id')]
        public string $id,
        #[Rule('required|string|max:255')]
        public string $name,
        #[Rule('required|string|max:255')]
        public string $slug,
        #[Rule('nullable|string')]
        public ?string $description,
        #[Rule('boolean')]
        public bool $active = true,
    ) {}
}
