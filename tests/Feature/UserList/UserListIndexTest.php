<?php

namespace Tests\Feature\UserList;

use App\Models\UserList;
use Illuminate\Auth\AuthenticationException;
use Tests\TestCase;

class UserListIndexTest extends TestCase
{
    public function test_it_returns_paginated_user_lists(): void
    {
        $this->loginRoot();

        UserList::factory()
            ->count(3)
            ->create();

        $response = $this->getJson('/api/v1/user-lists');

        $response->assertStatus(206);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'description',
                    'users_count',
                    'created_at',
                ],
            ],
            'current_page',
            'columns',
        ]);
    }

    public function test_it_returns_all_users_list_by_default(): void
    {
        $this->loginRoot();

        $response = $this->getJson('/api/v1/user-lists');

        $response->assertStatus(206);
        $response->assertJsonFragment(['name' => 'All Users']);
    }

    public function test_it_can_search_user_lists_by_name(): void
    {
        $this->loginRoot();

        UserList::factory()->create(['name' => 'vip_customers']);
        UserList::factory()->create(['name' => 'newsletter_subscribers']);
        UserList::factory()->create(['name' => 'inactive_users']);

        $response = $this->getJson('/api/v1/user-lists?search=vip');

        $response->assertStatus(206);
        $response->assertJsonCount(1, 'data');
        $this->assertEquals('vip_customers', $response->json('data.0.name'));
    }

    public function test_it_requires_authentication(): void
    {
        $this->withoutExceptionHandling();

        $this->expectException(AuthenticationException::class);

        $this->getJson('/api/v1/user-lists');
    }
}
