<?php

namespace Database\Seeders;

use App\Models\Application;
use Illuminate\Database\Seeder;

class ApplicationSeeder extends Seeder
{
    public const SLUG_BACKOFFICE = 'backoffice';

    public function run(): void
    {
        Application::firstOrCreate(
            ['slug' => self::SLUG_BACKOFFICE],
            [
                'slug' => self::SLUG_BACKOFFICE,
                'name' => 'Backoffice',
                'description' => 'Panel de administración del Backoffice',
            ],
        );
    }
}
