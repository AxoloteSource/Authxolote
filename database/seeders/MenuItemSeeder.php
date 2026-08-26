<?php

namespace Database\Seeders;

use App\Models\Menu;
use App\Models\MenuItem;
use Illuminate\Database\Seeder;

class MenuItemSeeder extends Seeder
{
    public function run(): void
    {
        $menu = Menu::query()->where('slug', 'auth')->first();

        if (! $menu) {
            return;
        }

        $menuId = $menu->id;

        $topLevel = [
            $this->menuItem($menuId, 'inicio', 'link', 'home', null, '/', 'House', 1),
            $this->menuItem($menuId, 'usuarios', 'link', 'users', null, '/users', 'Users', 2),
            $this->menuItem($menuId, 'user-lists', 'link', 'user_lists', null, '/user-lists', 'UserPlus', 3),
            $this->menuItem($menuId, 'aplicaciones', 'link', 'applications', null, '/applications', 'AppWindow', 4),
            $this->menuItem($menuId, 'catalogos', 'header', 'menu.catalogs', null, null, 'Database', 5),
            $this->menuItem($menuId, 'menus', 'header', 'menu.menus', null, null, 'ListTree', 6),
            $this->menuItem($menuId, 'ui-components', 'header', 'UI Components', null, null, 'Palette', 7),
        ];

        MenuItem::upsert(
            $topLevel,
            ['slug'],
            ['menu_id', 'parent_id', 'type', 'name', 'route', 'path', 'icon', 'sort_order', 'active'],
        );

        $parentIds = MenuItem::query()
            ->where('menu_id', $menuId)
            ->whereIn('slug', ['catalogos', 'menus', 'ui-components'])
            ->pluck('id', 'slug');

        $children = [
            $this->menuItem($menuId, 'roles', 'link', 'Roles', $parentIds['catalogos'], '/catalogs/roles', null, 1),
            $this->menuItem($menuId, 'menu-item', 'link', 'Menus', $parentIds['menus'], '/menus', null, 1),
            $this->menuItem($menuId, 'menu-items', 'link', 'Menu Items', $parentIds['menus'], '/menus/items', null, 2),
            $this->menuItem($menuId, 'pricing-card', 'link', 'Pricing Card', $parentIds['ui-components'], '/ui/pricing-card', null, 1),
        ];

        MenuItem::upsert(
            $children,
            ['slug'],
            ['menu_id', 'parent_id', 'type', 'name', 'route', 'path', 'icon', 'sort_order', 'active'],
        );
    }

    private function menuItem(
        string $menuId,
        string $slug,
        string $type,
        string $name,
        ?string $parentId,
        ?string $path,
        ?string $icon,
        int $sortOrder,
    ): array {
        return [
            'menu_id' => $menuId,
            'parent_id' => $parentId,
            'type' => $type,
            'name' => $name,
            'slug' => $slug,
            'route' => null,
            'path' => $path,
            'icon' => $icon,
            'sort_order' => $sortOrder,
            'active' => true,
        ];
    }
}
