<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class RecoveryPasswordTest extends TestCase
{
    use DatabaseTransactions;

    public function test_authenticated_user_can_request_password_recovery()
    {
        $user = User::factory()->create();
        $user->attachAction('auth.recovery-password');

        $response = $this->actingAs($user, 'api')
            ->postJson('/api/v1/recovery-password');

        $response->assertStatus(201)
            ->assertJsonStructure([
                'message',
                'data' => [
                    'token',
                    'expires_at',
                ],
            ]);

        $this->assertDatabaseHas('otps', [
            'user_id' => $user->id,
        ]);
    }

    public function test_unauthenticated_user_cannot_request_password_recovery()
    {
        $this->withoutExceptionHandling();
        try {
            $this->postJson('/api/v1/recovery-password');
        } catch (\Illuminate\Auth\AuthenticationException $e) {
            $this->assertEquals('Unauthenticated.', $e->getMessage());

            return;
        }

        $this->fail('Expected AuthenticationException was not thrown');
    }

    public function test_user_without_permission_cannot_request_password_recovery()
    {
        $role = \App\Models\Role::factory()->create(['id' => '00000000-0000-0000-0000-000000000002']); // Un ID que no sea Root
        $user = User::factory()->create(['role_id' => $role->id]);

        $response = $this->actingAs($user, 'api')
            ->postJson('/api/v1/recovery-password');

        $response->assertStatus(403);
    }
}
