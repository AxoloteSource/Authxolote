<?php

namespace Database\Seeders;

use App\Enums\MenuItemType;
use App\Models\Application;
use App\Models\Menu;
use App\Models\MenuItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        $application = Application::query()
            ->where('slug', ApplicationSeeder::SLUG_BACKOFFICE)
            ->first();

        if (! $application) {
            return;
        }

        $sidebar = Menu::firstOrCreate(
            ['application_id' => $application->id, 'slug' => 'sidebar'],
            [
                'application_id' => $application->id,
                'name' => 'Sidebar',
                'slug' => 'sidebar',
                'icon' => 'Menu',
                'sort_order' => 0,
            ],
        );

        if ($sidebar->items()->exists()) {
            return;
        }

        $catalog = $this->addItem($sidebar, [
            'type' => MenuItemType::Header,
            'name' => 'Catálogos',
            'icon' => 'Database',
            'sort_order' => 3,
        ]);

        $this->addItem($sidebar, [
            'type' => MenuItemType::Link,
            'name' => 'Inicio',
            'path' => '/',
            'icon' => 'House',
            'sort_order' => 1,
        ]);

        $this->addItem($sidebar, [
            'type' => MenuItemType::Link,
            'name' => 'Usuarios',
            'path' => '/users',
            'icon' => 'Users',
            'sort_order' => 2,
        ]);

        $this->addItem($sidebar, [
            'type' => MenuItemType::Link,
            'name' => 'Roles',
            'path' => '/catalogs/roles',
            'parent_id' => $catalog->id,
            'sort_order' => 1,
        ]);

        $this->addItem($sidebar, [
            'type' => MenuItemType::Link,
            'name' => 'Acciones',
            'path' => '/catalogs/roles/actions',
            'parent_id' => $catalog->id,
            'sort_order' => 2,
        ]);

        $ui = $this->addItem($sidebar, [
            'type' => MenuItemType::Header,
            'name' => 'UI Components',
            'icon' => 'Palette',
            'sort_order' => 4,
        ]);

        $this->addItem($sidebar, [
            'type' => MenuItemType::Link,
            'name' => 'Pricing Card',
            'path' => '/ui/pricing-card',
            'parent_id' => $ui->id,
            'sort_order' => 1,
        ]);
    }

    private function addItem(Menu $menu, array $attributes): MenuItem
    {
        $menuId = $menu->id;
        $parentId = $attributes['parent_id'] ?? null;

        $item = new MenuItem([
            'menu_id' => $menuId,
            'parent_id' => $parentId,
            'type' => $attributes['type'],
            'name' => $attributes['name'],
            'slug' => $this->uniqueSlug($attributes['name']),
            'route' => $attributes['route'] ?? null,
            'path' => $attributes['path'] ?? null,
            'icon' => $attributes['icon'] ?? null,
            'sort_order' => $attributes['sort_order'] ?? 0,
        ]);
        $item->save();

        return $item;
    }

    private function uniqueSlug(string $name): string
    {
        $base = Str::slug($name) ?: 'item';
        $slug = $base;
        $suffix = 1;

        while (MenuItem::where('slug', $slug)->exists()) {
            $slug = $base.'-'.$suffix;
            $suffix++;
        }

        return $slug;
    }
}
