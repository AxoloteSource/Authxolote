<?php

namespace Database\Seeders;

use App\Models\UserList;
use Illuminate\Database\Seeder;

class UserListSeeder extends Seeder
{
    public function run(): void
    {
        UserList::upsert(
            [
                [
                    'id' => 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
                    'slug' => 'all-users',
                    'name' => 'All Users',
                    'description' => 'Todos los usuarios registrados en el sistema',
                ],
            ],
            ['slug'],
            ['name', 'description']
        );
    }
}
