<?php

namespace Tests\Feature\MenuItem;

use App\Models\MenuItem;
use Illuminate\Auth\AuthenticationException;
use Tests\TestCase;

class MenuItemDeleteTest extends TestCase
{
    public function test_it_can_delete_a_menu_item(): void
    {
        $this->loginRoot();

        $item = MenuItem::factory()->create();

        $response = $this->deleteJson('/api/v1/menu-items/'.$item->id);

        $response->assertStatus(204);
        $this->assertSoftDeleted('menu_items', ['id' => $item->id]);
    }

    public function test_it_returns_not_found_when_menu_item_does_not_exist(): void
    {
        $this->withExceptionHandling();
        $this->loginRoot();

        $response = $this->deleteJson('/api/v1/menu-items/'.fake()->uuid());

        $response->assertStatus(404);
    }

    public function test_it_requires_authentication(): void
    {
        $this->withoutExceptionHandling();

        $item = MenuItem::factory()->create();

        $this->expectException(AuthenticationException::class);

        $this->deleteJson('/api/v1/menu-items/'.$item->id);
    }
}
