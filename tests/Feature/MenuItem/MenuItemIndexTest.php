<?php

namespace Tests\Feature\MenuItem;

use App\Models\MenuItem;
use Illuminate\Auth\AuthenticationException;
use Tests\TestCase;

class MenuItemIndexTest extends TestCase
{
    public function test_it_returns_paginated_menu_items(): void
    {
        $this->loginRoot();

        MenuItem::factory()->count(3)->create();

        $response = $this->getJson('/api/v1/menu-items');

        $response->assertStatus(206);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'type',
                    'name',
                    'path',
                    'menu',
                    'active',
                    'created_at',
                ],
            ],
            'current_page',
            'columns',
        ]);
    }

    public function test_it_returns_only_top_level_items_by_default(): void
    {
        $this->loginRoot();

        $parent = MenuItem::factory()->create(['sort_order' => 0]);
        $child = MenuItem::factory()->create(['parent_id' => $parent->id]);

        $response = $this->getJson('/api/v1/menu-items');

        $response->assertStatus(206);
        $topLevelIds = collect($response->json('data'))->pluck('id')->toArray();
        $this->assertContains($parent->id, $topLevelIds);
        $this->assertNotContains($child->id, $topLevelIds);
    }

    public function test_it_returns_sidebar_items_by_default(): void
    {
        $this->loginRoot();

        $response = $this->getJson('/api/v1/menu-items');

        $response->assertStatus(206);
        $response->assertJsonFragment(['name' => 'Inicio']);
    }

    public function test_it_requires_authentication(): void
    {
        $this->withoutExceptionHandling();

        $this->expectException(AuthenticationException::class);

        $this->getJson('/api/v1/menu-items');
    }
}
