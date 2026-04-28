<?php

namespace Tests\Feature\Auth;

use App\Models\Otp;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Tests\TestCase;

class ResetPasswordTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_reset_password_with_valid_otp()
    {
        $user = User::factory()->create([
            'password' => bcrypt('old_password'),
        ]);
        $user->attachAction('auth.reset-password');

        $otpCode = '123456';
        $token = (string) Str::uuid();

        $otp = Otp::create([
            'user_id' => $user->id,
            'token' => $token,
            'otp_code' => Hash::make($otpCode),
            'expires_at' => now()->addMinutes(15),
        ]);

        $response = $this->actingAs($user, 'api')
            ->postJson('/api/v1/reset-password', [
                'token' => $token,
                'otp_code' => $otpCode,
                'password' => 'new_password123',
                'password_confirmation' => 'new_password123',
            ]);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'OK',
            ]);

        $this->assertEquals('Password reset successfully.', $response->json('data.message'));

        // Verificar que el password cambió
        $this->assertTrue(Hash::check('new_password123', $user->fresh()->password));

        // Verificar que el OTP fue marcado como usado
        $this->assertNotNull($otp->fresh()->used_at);
    }

    public function test_cannot_reset_password_with_invalid_otp_code()
    {
        $user = User::factory()->create();
        $user->attachAction('auth.reset-password');

        $otpCode = '123456';
        $token = (string) Str::uuid();

        Otp::create([
            'user_id' => $user->id,
            'token' => $token,
            'otp_code' => Hash::make($otpCode),
            'expires_at' => now()->addMinutes(15),
        ]);

        $response = $this->actingAs($user, 'api')
            ->postJson('/api/v1/reset-password', [
                'token' => $token,
                'otp_code' => 'wrong_code',
                'password' => 'new_password123',
                'password_confirmation' => 'new_password123',
            ]);

        $response->assertStatus(422)
            ->assertJson([
                'message' => 'Invalid OTP code.',
            ]);
    }

    public function test_cannot_reset_password_with_expired_otp()
    {
        $user = User::factory()->create();
        $user->attachAction('auth.reset-password');

        $otpCode = '123456';
        $token = (string) Str::uuid();

        Otp::create([
            'user_id' => $user->id,
            'token' => $token,
            'otp_code' => Hash::make($otpCode),
            'expires_at' => now()->subMinutes(1),
        ]);

        $response = $this->actingAs($user, 'api')
            ->postJson('/api/v1/reset-password', [
                'token' => $token,
                'otp_code' => $otpCode,
                'password' => 'new_password123',
                'password_confirmation' => 'new_password123',
            ]);

        $response->assertStatus(422)
            ->assertJson([
                'message' => 'This OTP has expired.',
            ]);
    }

    public function test_cannot_reset_password_with_already_used_otp()
    {
        $user = User::factory()->create();
        $user->attachAction('auth.reset-password');

        $otpCode = '123456';
        $token = (string) Str::uuid();

        Otp::create([
            'user_id' => $user->id,
            'token' => $token,
            'otp_code' => Hash::make($otpCode),
            'expires_at' => now()->addMinutes(15),
            'used_at' => now(),
        ]);

        $response = $this->actingAs($user, 'api')
            ->postJson('/api/v1/reset-password', [
                'token' => $token,
                'otp_code' => $otpCode,
                'password' => 'new_password123',
                'password_confirmation' => 'new_password123',
            ]);

        $response->assertStatus(422)
            ->assertJson([
                'message' => 'This OTP has already been used.',
            ]);
    }

    public function test_cannot_reset_password_with_invalid_token()
    {
        $user = User::factory()->create();
        $user->attachAction('auth.reset-password');

        $response = $this->actingAs($user, 'api')
            ->postJson('/api/v1/reset-password', [
                'token' => 'non-existent-token',
                'otp_code' => '123456',
                'password' => 'new_password123',
                'password_confirmation' => 'new_password123',
            ]);

        $response->assertStatus(422)
            ->assertJson([
                'message' => 'Invalid token.',
            ]);
    }
}
