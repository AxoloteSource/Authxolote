<?php

namespace Tests\Feature\UserList;

use App\Models\UserList;
use Illuminate\Auth\AuthenticationException;
use Tests\TestCase;

class UserListDeleteTest extends TestCase
{
    public function test_it_can_delete_a_user_list(): void
    {
        $this->loginRoot();

        $userList = UserList::factory()->create();

        $response = $this->deleteJson("/api/v1/user-lists/{$userList->id}");

        $response->assertStatus(204);
        $this->assertSoftDeleted('user_lists', [
            'id' => $userList->id,
        ]);
    }

    public function test_it_returns_404_when_user_list_not_found(): void
    {
        $this->loginRoot();

        $response = $this->deleteJson('/api/v1/user-lists/99999');
        $response->assertStatus(404);
    }

    public function test_it_requires_authentication(): void
    {
        $this->withoutExceptionHandling();

        $this->expectException(AuthenticationException::class);

        $this->deleteJson('/api/v1/user-lists/1');
    }
}
