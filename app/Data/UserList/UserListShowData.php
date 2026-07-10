<?php

namespace App\Data\UserList;

use Spatie\LaravelData\Attributes\FromRouteParameter;
use Spatie\LaravelData\Data;

class UserListShowData extends Data
{
    public function __construct(
        #[FromRouteParameter('id')]
        public string $id,
    ) {}
}
