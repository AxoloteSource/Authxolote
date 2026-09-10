<?php

namespace Database\Seeders;

use App\Enums\MenuItemType;
use App\Models\Application;
use App\Models\Menu;
use App\Models\MenuItem;
use App\Models\Role;
use Illuminate\Database\Seeder;

class MenuItemSeeder extends Seeder
{
    /**
     * @var array<int, array<string, mixed>>
     */
    private array $items = [
        [
            'slug' => 'inicio',
            'name' => 'home',
            'path' => '/',
            'icon' => 'House',
            'sort_order' => 1,
            'roles' => ['admin', 'customer', 'cashier', 'messages'],
        ],
        [
            'slug' => 'user-lists',
            'name' => 'user_lists',
            'path' => '/user-lists',
            'icon' => 'UserPlus',
            'sort_order' => 3,
            'roles' => ['admin', 'customer', 'cashier', 'messages'],
        ],
        [
            'slug' => 'usuarios',
            'name' => 'users',
            'path' => '/users',
            'icon' => 'Users',
            'sort_order' => 4,
            'roles' => ['admin', 'customer', 'cashier', 'messages'],
        ],
        [
            'slug' => 'aplicaciones',
            'name' => 'applications',
            'path' => '/applications',
            'icon' => 'AppWindow',
            'sort_order' => 4,
            'roles' => ['admin', 'customer', 'cashier', 'messages'],
        ],
        [
            'slug' => 'catalogos',
            'name' => 'menu.catalogs',
            'icon' => 'Database',
            'sort_order' => 5,
            'roles' => ['admin', 'customer', 'cashier', 'messages'],
            'children' => [
                [
                    'slug' => 'roles',
                    'name' => 'Roles',
                    'path' => '/catalogs/roles',
                    'sort_order' => 1,
                    'roles' => ['admin', 'customer', 'cashier', 'messages'],
                ],
                [
                    'slug' => 'acciones',
                    'name' => 'Acciones',
                    'path' => '/catalogs/roles/actions',
                    'sort_order' => 2,
                ],
            ],
        ],
        [
            'slug' => 'menus',
            'name' => 'menu.menus',
            'icon' => 'ListTree',
            'sort_order' => 6,
            'roles' => ['admin', 'customer', 'cashier', 'messages'],
            'children' => [
                [
                    'slug' => 'menu-item',
                    'name' => 'Menus',
                    'path' => '/menus',
                    'sort_order' => 1,
                    'roles' => ['admin', 'customer', 'cashier', 'messages'],
                ],
                [
                    'slug' => 'menu-items',
                    'name' => 'Menu Items',
                    'path' => '/menus/items',
                    'sort_order' => 2,
                    'roles' => ['admin', 'customer', 'cashier', 'messages'],
                ],
            ],
        ],
        [
            'slug' => 'ui-components',
            'name' => 'UI Components',
            'icon' => 'Palette',
            'sort_order' => 7,
            'roles' => ['admin', 'customer', 'cashier', 'messages'],
            'children' => [
                [
                    'slug' => 'pricing-card',
                    'name' => 'Pricing Card',
                    'path' => '/ui/pricing-card',
                    'sort_order' => 1,
                    'roles' => ['admin', 'customer', 'cashier', 'messages'],
                ],
            ],
        ],
    ];

    public function run(): void
    {
        $application = Application::query()
            ->where('slug', ApplicationSeeder::SLUG_AUTH)
            ->first();

        if (! $application) {
            return;
        }

        $menu = Menu::query()
            ->where('application_id', $application->id)
            ->where('slug', 'auth')
            ->first();

        if (! $menu) {
            return;
        }

        $this->createItems($menu, $this->items);
    }

    /**
     * @param  array<int, array<string, mixed>>  $items
     */
    private function createItems(Menu $menu, array $items, ?string $parentId = null): void
    {
        foreach ($items as $item) {
            $hasChildren = ! empty($item['children']);
            $type = $hasChildren ? MenuItemType::Header : MenuItemType::Link;

            $menuItem = MenuItem::withTrashed()->where('slug', $item['slug'])->first();

            if (! $menuItem) {
                $menuItem = MenuItem::create([
                    'menu_id' => $menu->id,
                    'parent_id' => $parentId,
                    'type' => $type,
                    'name' => $item['name'],
                    'slug' => $item['slug'],
                    'route' => $item['route'] ?? null,
                    'path' => $item['path'] ?? null,
                    'icon' => $item['icon'] ?? null,
                    'sort_order' => $item['sort_order'] ?? 0,
                    'active' => true,
                ]);

                if (! empty($item['roles'])) {
                    $roleIds = Role::query()->whereIn('key', $item['roles'])->pluck('id');
                    $menuItem->roles()->syncWithoutDetaching($roleIds);
                }
            }

            if ($hasChildren) {
                $this->createItems($menu, $item['children'], $menuItem->id);
            }
        }
    }
}
