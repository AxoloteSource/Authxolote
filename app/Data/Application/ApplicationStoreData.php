<?php

namespace App\Data\Application;

use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;

class ApplicationStoreData extends Data
{
    public function __construct(
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
