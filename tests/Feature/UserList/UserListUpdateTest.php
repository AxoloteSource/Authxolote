<?php

namespace Tests\Feature\UserList;

use App\Models\User;
use App\Models\UserList;
use Illuminate\Auth\AuthenticationException;
use Tests\TestCase;

class UserListUpdateTest extends TestCase
{
    public function test_it_can_update_a_user_list(): void
    {
        $this->loginRoot();

        $userList = UserList::factory()->create([
            'name' => 'old_name',
        ]);

        $data = [
            'name' => 'new_name',
            'description' => 'Updated description',
        ];

        $response = $this->putJson("/api/v1/user-lists/{$userList->id}", $data);

        $response->assertStatus(200);
        $this->assertDatabaseHas('user_lists', [
            'id' => $userList->id,
            'name' => 'new_name',
            'description' => 'Updated description',
        ]);
    }

    public function test_it_can_update_users_in_a_list(): void
    {
        $this->loginRoot();

        $userList = UserList::factory()->create();
        $users = User::factory()->count(2)->create();

        $data = [
            'name' => 'updated_list',
            'user_ids' => $users->pluck('id')->toArray(),
        ];

        $response = $this->putJson("/api/v1/user-lists/{$userList->id}", $data);

        $response->assertStatus(200);
        $this->assertDatabaseHas('user_list_user', [
            'user_list_id' => $userList->id,
            'user_id' => $users->first()->id,
        ]);
        $this->assertDatabaseHas('user_list_user', [
            'user_list_id' => $userList->id,
            'user_id' => $users->last()->id,
        ]);
    }

    public function test_it_returns_404_when_user_list_not_found(): void
    {
        $this->loginRoot();

        $response = $this->putJson('/api/v1/user-lists/99999', [
            'name' => 'test',
        ]);

        $response->assertStatus(404);
    }

    public function test_it_requires_authentication(): void
    {
        $this->withoutExceptionHandling();

        $this->expectException(AuthenticationException::class);

        $this->putJson('/api/v1/user-lists/1', [
            'name' => 'test',
        ]);
    }
}
