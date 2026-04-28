<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class RegisterAuthTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * Test that register route requires authentication.
     */
    public function test_unauthenticated_user_cannot_access_register(): void
    {
        $this->withExceptionHandling();
        $response = $this->postJson('/api/v1/register', []);
        $response->assertStatus(401);
        $response->assertJson(['message' => 'Unauthenticated.']);
    }
}
