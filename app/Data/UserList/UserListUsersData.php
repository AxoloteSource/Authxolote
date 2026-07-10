<?php

namespace App\Data\UserList;

use AxoloteSource\Logics\Data\IndexData;
use Spatie\LaravelData\Attributes\FromRouteParameter;

class UserListUsersData extends IndexData
{
    #[FromRouteParameter('id')]
    public ?string $id = null;
}
