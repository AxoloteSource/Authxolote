<?php

namespace Tests\Feature\Application;

use App\Models\Application;
use Illuminate\Auth\AuthenticationException;
use Tests\TestCase;

class ApplicationIndexTest extends TestCase
{
    public function test_it_returns_paginated_applications(): void
    {
        $this->loginRoot();

        Application::factory()->count(3)->create();

        $response = $this->getJson('/api/v1/applications');

        $response->assertStatus(206);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'slug',
                    'menus_count',
                    'active',
                    'created_at',
                ],
            ],
            'current_page',
            'columns',
        ]);
    }

    public function test_it_can_search_applications_by_name(): void
    {
        $this->loginRoot();

        Application::factory()->create(['name' => 'Storefront']);
        Application::factory()->create(['name' => 'Inventory']);

        $response = $this->getJson('/api/v1/applications?search=storefront');

        $response->assertStatus(206);
        $response->assertJsonCount(1, 'data');
        $this->assertEquals('Storefront', $response->json('data.0.name'));
    }

    public function test_it_returns_auth_application_by_default(): void
    {
        $this->loginRoot();

        $response = $this->getJson('/api/v1/applications');

        $response->assertStatus(206);
        $response->assertJsonFragment(['slug' => 'auth']);
    }

    public function test_it_requires_authentication(): void
    {
        $this->withoutExceptionHandling();

        $this->expectException(AuthenticationException::class);

        $this->getJson('/api/v1/applications');
    }
}
