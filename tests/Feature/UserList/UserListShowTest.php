<?php

namespace Tests\Feature\UserList;

use App\Models\UserList;
use Illuminate\Auth\AuthenticationException;
use Tests\TestCase;

class UserListShowTest extends TestCase
{
    public function test_it_returns_a_user_list_by_id(): void
    {
        $this->loginRoot();

        $userList = UserList::factory()->create();

        $response = $this->getJson("/api/v1/user-lists/{$userList->id}");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'description',
                'created_at',
                'updated_at',
            ],
        ]);

        $this->assertEquals($userList->id, $response->json('data.id'));
        $this->assertEquals($userList->name, $response->json('data.name'));
    }

    public function test_it_returns_404_when_user_list_not_found(): void
    {
        $this->loginRoot();

        $response = $this->getJson('/api/v1/user-lists/99999');

        $response->assertStatus(404);
    }

    public function test_it_requires_authentication(): void
    {
        $this->withoutExceptionHandling();

        $this->expectException(AuthenticationException::class);

        $this->getJson('/api/v1/user-lists/1');
    }
}
