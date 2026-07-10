<?php

namespace Tests\Feature\UserList;

use App\Models\User;
use App\Models\UserList;
use Illuminate\Auth\AuthenticationException;
use Tests\TestCase;

class UserListUserIndexTest extends TestCase
{
    public function test_it_returns_paginated_users_from_a_list(): void
    {
        $this->loginRoot();

        $users = User::factory()->count(3)->create();
        $userList = UserList::factory()->create();
        $userList->users()->sync($users->pluck('id'));

        $response = $this->getJson("/api/v1/user-lists/{$userList->id}/users");

        $response->assertStatus(206);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'email',
                ],
            ],
            'current_page',
            'columns',
        ]);
        $this->assertCount(3, $response->json('data'));
    }

    public function test_it_returns_empty_list_when_list_has_no_users(): void
    {
        $this->loginRoot();

        $userList = UserList::factory()->create();

        $response = $this->getJson("/api/v1/user-lists/{$userList->id}/users");

        $response->assertStatus(206);
        $this->assertCount(0, $response->json('data'));
    }

    public function test_it_returns_404_when_list_not_found(): void
    {
        $this->loginRoot();

        $response = $this->getJson('/api/v1/user-lists/99999/users');

        $response->assertStatus(404);
    }

    public function test_it_requires_authentication(): void
    {
        $this->withoutExceptionHandling();

        $this->expectException(AuthenticationException::class);

        $this->getJson('/api/v1/user-lists/1/users');
    }
}
