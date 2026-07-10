<?php

namespace App\Data\ActionRole;

use Spatie\LaravelData\Attributes\FromRouteParameter;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;

class UpdateActionRoleData extends Data
{
    public function __construct(
        #[FromRouteParameter('roleId'), Rule(['required', 'exists:roles,id'])]
        public string $roleId,
        #[FromRouteParameter('id'), Rule(['required', 'exists:actions,id'])]
        public string $id,
        #[Rule(['required', 'boolean'])]
        public bool $active,
    ) {}
}
