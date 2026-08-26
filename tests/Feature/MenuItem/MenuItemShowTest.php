<?php

namespace Tests\Feature\MenuItem;

use App\Models\MenuItem;
use Illuminate\Auth\AuthenticationException;
use Tests\TestCase;

class MenuItemShowTest extends TestCase
{
    public function test_it_can_show_a_menu_item_with_children(): void
    {
        $this->loginRoot();

        $parent = MenuItem::factory()->header()->create();
        MenuItem::factory()->create(['parent_id' => $parent->id]);

        $response = $this->getJson('/api/v1/menu-items/'.$parent->id);

        $response->assertStatus(200);
        $response->assertJsonPath('data.id', $parent->id);
        $response->assertJsonStructure(['data' => ['children' => ['*' => ['id', 'name']]]]);
    }

    public function test_it_returns_not_found_when_menu_item_does_not_exist(): void
    {
        $this->withExceptionHandling();
        $this->loginRoot();

        $response = $this->getJson('/api/v1/menu-items/'.fake()->uuid());

        $response->assertStatus(404);
    }

    public function test_it_requires_authentication(): void
    {
        $this->withoutExceptionHandling();

        $item = MenuItem::factory()->create();

        $this->expectException(AuthenticationException::class);

        $this->getJson('/api/v1/menu-items/'.$item->id);
    }
}
