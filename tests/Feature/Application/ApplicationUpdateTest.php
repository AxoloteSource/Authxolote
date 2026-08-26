<?php

namespace Tests\Feature\Application;

use App\Models\Application;
use Illuminate\Auth\AuthenticationException;
use Tests\TestCase;

class ApplicationUpdateTest extends TestCase
{
    public function test_it_can_update_an_application(): void
    {
        $this->loginRoot();

        $application = Application::factory()->create();

        $response = $this->putJson('/api/v1/applications/'.$application->id, [
            'name' => 'Updated Name',
            'slug' => $application->slug,
            'description' => 'Updated description',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('applications', [
            'id' => $application->id,
            'name' => 'Updated Name',
        ]);
    }

    public function test_it_returns_not_found_when_application_does_not_exist(): void
    {
        $this->withExceptionHandling();
        $this->loginRoot();

        $response = $this->putJson('/api/v1/applications/'.fake()->uuid(), [
            'name' => 'Updated Name',
            'slug' => 'updated-slug',
        ]);

        $response->assertStatus(404);
    }

    public function test_it_requires_authentication(): void
    {
        $this->withoutExceptionHandling();

        $application = Application::factory()->create();

        $this->expectException(AuthenticationException::class);

        $this->putJson('/api/v1/applications/'.$application->id, [
            'name' => 'Updated Name',
            'slug' => $application->slug,
        ]);
    }
}
