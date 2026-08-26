<?php

namespace Database\Seeders;

use App\Models\Application;
use Illuminate\Database\Seeder;

class ApplicationSeeder extends Seeder
{
    public const string SLUG_AUTH = 'auth';

    public function run(): void
    {
        Application::upsert([
            [
                'name' => 'Auth',
                'slug' => self::SLUG_AUTH,
                'description' => 'Aplicación de autenticación',
            ],
        ], ['slug'], ['name', 'description']);
    }
}
