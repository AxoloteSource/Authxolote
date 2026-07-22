<?php

namespace Tests\Feature\User;

use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Tests\TestCase;

class UserIndexTest extends TestCase
{
    public function test_it_returns_paginated_users(): void
    {
        $this->loginRoot();

        User::factory()->count(3)->create();

        $response = $this->getJson('/api/v1/users');

        $response->assertStatus(206);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'email',
                    'role',
                    'created_at',
                ],
            ],
            'current_page',
            'columns',
        ]);
    }

    public function test_it_can_search_users_by_email(): void
    {
        $this->loginRoot();

        User::factory()->create(['email' => 'test@example.com']);
        User::factory()->create(['email' => 'other@example.com']);

        $response = $this->getJson('/api/v1/users?search=test@example.com');

        $response->assertStatus(206);
        $response->assertJsonCount(1, 'data');
        $this->assertEquals('test@example.com', $response->json('data.0.email'));
    }

    public function test_it_requires_authentication(): void
    {
        $this->withoutExceptionHandling();

        $this->expectException(AuthenticationException::class);

        $this->getJson('/api/v1/users');
    }
}
