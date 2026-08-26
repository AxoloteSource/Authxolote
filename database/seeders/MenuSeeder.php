<?php

namespace Database\Seeders;

use App\Models\Application;
use App\Models\Menu;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        $application = Application::query()
            ->where('slug', ApplicationSeeder::SLUG_AUTH)
            ->first();

        if (! $application) {
            return;
        }

        Menu::firstOrCreate(
            ['application_id' => $application->id, 'slug' => 'auth'],
            [
                'application_id' => $application->id,
                'name' => 'auth',
                'slug' => 'auth',
                'icon' => 'Menu',
                'sort_order' => 0,
            ],
        );
    }
}
