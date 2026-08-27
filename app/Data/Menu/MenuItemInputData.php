<?php

namespace App\Data\Menu;

use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;

class MenuItemInputData extends Data
{
    public function __construct(
        #[Rule('nullable|string|max:255')]
        public ?string $name,

        #[Rule('nullable|string')]
        public ?string $icon,

        #[Rule('nullable|string')]
        public ?string $path,

        #[Rule('nullable|string')]
        public ?string $route,

        #[Rule('nullable|array')]
        public ?array $menu_items,

        #[Rule('nullable|array')]
        public ?array $roles,
    ) {}
}
