<?php

namespace Tests\Feature\Menu;

use App\Models\Menu;
use Illuminate\Auth\AuthenticationException;
use Tests\TestCase;

class MenuDeleteTest extends TestCase
{
    public function test_it_can_delete_a_menu(): void
    {
        $this->loginRoot();

        $menu = Menu::factory()->create();

        $response = $this->deleteJson('/api/v1/menus/'.$menu->id);

        $response->assertStatus(204);
        $this->assertSoftDeleted('menus', ['id' => $menu->id]);
    }

    public function test_it_returns_not_found_when_menu_does_not_exist(): void
    {
        $this->withExceptionHandling();
        $this->loginRoot();

        $response = $this->deleteJson('/api/v1/menus/'.fake()->uuid());

        $response->assertStatus(404);
    }

    public function test_it_requires_authentication(): void
    {
        $this->withoutExceptionHandling();

        $menu = Menu::factory()->create();

        $this->expectException(AuthenticationException::class);

        $this->deleteJson('/api/v1/menus/'.$menu->id);
    }
}
