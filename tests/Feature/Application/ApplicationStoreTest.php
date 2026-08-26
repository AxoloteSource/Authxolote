<?php

namespace Tests\Feature\Application;

use Illuminate\Auth\AuthenticationException;
use Tests\TestCase;

class ApplicationStoreTest extends TestCase
{
    public function test_it_can_create_an_application(): void
    {
        $this->loginRoot();

        $data = [
            'name' => 'Storefront',
            'slug' => 'storefront',
            'description' => 'Tienda en línea',
        ];

        $response = $this->postJson('/api/v1/applications', $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('applications', [
            'name' => 'Storefront',
            'slug' => 'storefront',
        ]);
    }

    public function test_it_requires_name(): void
    {
        $this->withExceptionHandling();
        $this->loginRoot();

        $response = $this->postJson('/api/v1/applications', [
            'slug' => 'storefront',
        ]);

        $response->assertStatus(422);
        $response->assertJsonPath('status', 'error');
    }

    public function test_it_requires_slug(): void
    {
        $this->withExceptionHandling();
        $this->loginRoot();

        $response = $this->postJson('/api/v1/applications', [
            'name' => 'Storefront',
        ]);

        $response->assertStatus(422);
        $response->assertJsonPath('status', 'error');
    }

    public function test_it_requires_authentication(): void
    {
        $this->withoutExceptionHandling();

        $this->expectException(AuthenticationException::class);

        $this->postJson('/api/v1/applications', [
            'name' => 'Storefront',
            'slug' => 'storefront',
        ]);
    }
}
