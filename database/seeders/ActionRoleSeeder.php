<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\Action;
use App\Models\ActionRole;
use App\Models\Role;
use Illuminate\Database\Seeder;

class ActionRoleSeeder extends Seeder
{
    public function run(): void
    {
        ActionRole::upsert([
            [
                'id' => 1,
                'action_id' => '0195f51f-cdd1-7256-b489-a2d5de9580d4',
                'role_id' => RoleEnum::Admin->value,
            ],
        ], ['id'], ['action_id', 'role_id']);

        $actions = Action::query()
            ->whereIn('name', $this->menuActions())
            ->pluck('id');

        Role::query()
            ->where('id', RoleEnum::Admin->value)
            ->first()
            ?->actions()
            ->syncWithoutDetaching($actions);
    }

    private function menuActions(): array
    {
        return [
            'auth.applications.index',
            'auth.applications.store',
            'auth.applications.show',
            'auth.applications.update',
            'auth.applications.destroy',
            'auth.menus.index',
            'auth.menus.store',
            'auth.menus.show',
            'auth.menus.show_all',
            'auth.menus.update',
            'auth.menus.destroy',
            'auth.menu_items.index',
            'auth.menu_items.store',
            'auth.menu_items.show',
            'auth.menu_items.update',
            'auth.menu_items.destroy',
        ];
    }
}
