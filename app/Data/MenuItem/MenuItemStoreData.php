<?php

namespace App\Data\MenuItem;

use App\Enums\MenuItemType;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;

class MenuItemStoreData extends Data
{
    public function __construct(
        #[Rule('required|string')]
        public string $menu_id,
        #[Rule('nullable|string')]
        public ?string $parent_id,
        #[Rule('required')]
        public MenuItemType $type,
        #[Rule('required|string|max:255')]
        public string $name,
        #[Rule('required|string|max:255')]
        public string $slug,
        #[Rule('nullable|string|max:255')]
        public ?string $route,
        #[Rule('nullable|string|max:255')]
        public ?string $path,
        #[Rule('nullable|string')]
        public ?string $icon,
        #[Rule('integer')]
        public int $sort_order = 0,
        #[Rule('boolean')]
        public bool $active = true,
    ) {}
}
