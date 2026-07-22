<?php

namespace Database\Seeders;

use App\Models\UserList;
use Illuminate\Database\Seeder;

class UserListSeeder extends Seeder
{
    public function run(): void
    {
        UserList::firstOrCreate(
            ['slug' => UserList::SLUG_ALL_USERS],
            [
                'slug' => UserList::SLUG_ALL_USERS,
                'name' => 'All Users',
                'description' => 'Todos los usuarios registrados en el sistema',
            ],
        );
    }
}
