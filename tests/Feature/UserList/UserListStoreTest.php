<?php

namespace Tests\Feature\UserList;

use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Tests\TestCase;

class UserListStoreTest extends TestCase
{
    public function test_it_can_create_a_user_list(): void
    {
        $this->loginRoot();

        $data = [
            'name' => 'vip_customers',
            'description' => 'Lista de clientes VIP',
        ];

        $response = $this->postJson('/api/v1/user-lists', $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('user_lists', [
            'name' => 'vip_customers',
            'description' => 'Lista de clientes VIP',
        ]);
    }

    public function test_it_can_create_a_user_list_with_users(): void
    {
        $this->loginRoot();

        $users = User::factory()->count(2)->create();

        $data = [
            'name' => 'test_list',
            'description' => 'Test description',
            'user_ids' => $users->pluck('id')->toArray(),
        ];

        $response = $this->postJson('/api/v1/user-lists', $data);

        $response->assertStatus(201);
        $listId = $response->json('data.id');
        $this->assertDatabaseHas('user_list_user', [
            'user_list_id' => $listId,
            'user_id' => $users->first()->id,
        ]);
        $this->assertDatabaseHas('user_list_user', [
            'user_list_id' => $listId,
            'user_id' => $users->last()->id,
        ]);
    }

    public function test_it_requires_name(): void
    {
        $this->withExceptionHandling();
        $this->loginRoot();

        $response = $this->postJson('/api/v1/user-lists', [
            'description' => 'Test',
        ]);

        $response->assertStatus(422);
        $response->assertJsonPath('status', 'error');
    }

    public function test_it_requires_authentication(): void
    {
        $this->withoutExceptionHandling();

        $this->expectException(AuthenticationException::class);

        $this->postJson('/api/v1/user-lists', [
            'name' => 'test',
        ]);
    }
}
