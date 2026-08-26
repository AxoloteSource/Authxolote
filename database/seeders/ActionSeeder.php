<?php

namespace Database\Seeders;

use App\Models\Action;
use Illuminate\Database\Seeder;

class ActionSeeder extends Seeder
{
    public function run(): void
    {
        Action::upsert([
            [
                'id' => '0195f51f-cdd1-7256-b489-a2d5de9580d4',
                'name' => 'auth.role.attach.actions',
                'description' => 'Attach actions to role',
            ],
            [
                'id' => 'a537349b-fa89-4a0b-ae4b-a1f92110e30c',
                'name' => 'auth.applications.index',
                'description' => 'List applications',
            ],
            [
                'id' => '013657d9-52d9-41e7-84d0-cb2ac7be3c57',
                'name' => 'auth.applications.store',
                'description' => 'Create applications',
            ],
            [
                'id' => '94029d33-53c0-458c-a3ff-989704807f96',
                'name' => 'auth.applications.show',
                'description' => 'Show applications',
            ],
            [
                'id' => 'b49d931b-33a5-458c-9403-2f073e29a592',
                'name' => 'auth.applications.update',
                'description' => 'Update applications',
            ],
            [
                'id' => '73fdb3d0-a872-4420-a927-e8a10f59bc90',
                'name' => 'auth.applications.destroy',
                'description' => 'Delete applications',
            ],
            [
                'id' => 'ff67f5ec-ac47-43db-b558-430675c178dd',
                'name' => 'auth.menus.index',
                'description' => 'List menus',
            ],
            [
                'id' => '6a33bc94-5a80-404b-8214-18924711f497',
                'name' => 'auth.menus.store',
                'description' => 'Create menus',
            ],
            [
                'id' => 'e30e9aa8-f8fd-428b-974b-325e90902052',
                'name' => 'auth.menus.show',
                'description' => 'Show menus',
            ],
            [
                'id' => '54dd4438-77d3-4b69-bdf9-276f4b694096',
                'name' => 'auth.menus.update',
                'description' => 'Update menus',
            ],
            [
                'id' => '531788d5-e47f-49d2-a39a-8e540ffed904',
                'name' => 'auth.menus.show_all',
                'description' => 'Show all menu items regardless of role',
            ],
            [
                'id' => 'b435dd36-e5a6-48b7-8a86-cf7c8d3ba019',
                'name' => 'auth.menus.destroy',
                'description' => 'Delete menus',
            ],
            [
                'id' => 'e876b3d1-2c0a-4f19-ad06-b17a0dd88f9f',
                'name' => 'auth.menu_items.index',
                'description' => 'List menu items',
            ],
            [
                'id' => '7eb1213b-7064-4e3f-9c2d-0f19dc59e876',
                'name' => 'auth.menu_items.store',
                'description' => 'Create menu items',
            ],
            [
                'id' => '93ca6111-c709-4652-a22d-c279e409c332',
                'name' => 'auth.menu_items.show',
                'description' => 'Show menu items',
            ],
            [
                'id' => '37c40ff7-4816-478f-97f1-205e97c5e233',
                'name' => 'auth.menu_items.update',
                'description' => 'Update menu items',
            ],
            [
                'id' => '5c19c1e7-d5ca-4e5c-9934-82ae107acaeb',
                'name' => 'auth.menu_items.destroy',
                'description' => 'Delete menu items',
            ],
            [
                'id' => 'fdad38fd-e166-c83a-8a0d-89cd70c08a6d',
                'name' => 'auth.menu_items.roles.update',
                'description' => 'Attach or detach a role from a menu item',
            ],
        ], ['id'], ['name', 'description']);
    }
}
