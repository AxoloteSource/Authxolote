<?php

namespace App\Data\UserList;

use Spatie\LaravelData\Attributes\FromRouteParameter;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;

class UserListUpdateData extends Data
{
    public function __construct(
        #[FromRouteParameter('id')]
        public string $id,
        #[Rule('required|string|max:255')]
        public string $name,
        #[Rule('nullable|string|max:255')]
        public ?string $slug,
        #[Rule('nullable|string')]
        public ?string $description,
        #[Rule('nullable|array')]
        public ?array $user_ids,
    ) {}
}
