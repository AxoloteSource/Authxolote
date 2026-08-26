<?php

namespace Tests\Feature\Menu;

use App\Models\Menu;
use Illuminate\Auth\AuthenticationException;
use Tests\TestCase;

class MenuIndexTest extends TestCase
{
    public function test_it_returns_paginated_menus(): void
    {
        $this->loginRoot();

        Menu::factory()->count(3)->create();

        $response = $this->getJson('/api/v1/menus');

        $response->assertStatus(206);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'slug',
                    'application',
                    'items_count',
                    'active',
                    'created_at',
                ],
            ],
            'current_page',
            'columns',
        ]);
    }

    public function test_it_can_search_menus_by_name(): void
    {
        $this->loginRoot();

        Menu::factory()->create(['name' => 'Header']);
        Menu::factory()->create(['name' => 'Topbar']);

        $response = $this->getJson('/api/v1/menus?search=topbar');

        $response->assertStatus(206);
        $response->assertJsonCount(1, 'data');
        $this->assertEquals('Topbar', $response->json('data.0.name'));
    }

    public function test_it_returns_sidebar_menu_by_default(): void
    {
        $this->loginRoot();

        $response = $this->getJson('/api/v1/menus');

        $response->assertStatus(206);
        $response->assertJsonFragment(['slug' => 'sidebar']);
    }

    public function test_it_requires_authentication(): void
    {
        $this->withoutExceptionHandling();

        $this->expectException(AuthenticationException::class);

        $this->getJson('/api/v1/menus');
    }
}
