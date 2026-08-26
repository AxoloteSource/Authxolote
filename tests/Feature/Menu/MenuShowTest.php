<?php

namespace Tests\Feature\Menu;

use App\Models\Menu;
use App\Models\MenuItem;
use Illuminate\Auth\AuthenticationException;
use Tests\TestCase;

class MenuShowTest extends TestCase
{
    public function test_it_can_show_a_menu(): void
    {
        $this->loginRoot();

        $menu = Menu::factory()->create();

        $response = $this->getJson('/api/v1/menus/'.$menu->slug);

        $response->assertStatus(200);
        $response->assertJsonPath('data.id', $menu->id);
        $response->assertJsonPath('data.slug', $menu->slug);
        $response->assertJsonPath('data.name', $menu->name);
    }

    public function test_it_returns_the_menu_items_as_a_tree(): void
    {
        $this->loginRoot();

        $menu = Menu::factory()->create();
        $parent = MenuItem::factory()->header()->create(['menu_id' => $menu->id]);
        MenuItem::factory()->create(['menu_id' => $menu->id, 'parent_id' => $parent->id]);

        $response = $this->getJson('/api/v1/menus/'.$menu->slug);

        $response->assertStatus(200);
        $response->assertJsonPath('data.id', $menu->id);
        $response->assertJsonStructure(['data' => ['items' => ['*' => ['id', 'name', 'children']]]]);
    }

    public function test_it_returns_not_found_when_menu_does_not_exist(): void
    {
        $this->withExceptionHandling();
        $this->loginRoot();

        $response = $this->getJson('/api/v1/menus/'.fake()->slug());

        $response->assertStatus(404);
    }

    public function test_it_requires_authentication(): void
    {
        $this->withoutExceptionHandling();

        $menu = Menu::factory()->create();

        $this->expectException(AuthenticationException::class);

        $this->getJson('/api/v1/menus/'.$menu->slug);
    }
}
