<?php

namespace App\Data\MenuItem;

use Spatie\LaravelData\Attributes\FromRouteParameter;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;

class UpdateMenuItemRoleData extends Data
{
    public function __construct(
        #[FromRouteParameter('id')]
        public string $id,
        #[FromRouteParameter('roleId'), Rule(['required', 'exists:roles,id'])]
        public string $roleId,
        #[Rule(['required', 'boolean'])]
        public bool $active,
    ) {}
}
