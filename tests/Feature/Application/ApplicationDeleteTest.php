<?php

namespace Tests\Feature\Application;

use App\Models\Application;
use Illuminate\Auth\AuthenticationException;
use Tests\TestCase;

class ApplicationDeleteTest extends TestCase
{
    public function test_it_can_delete_an_application(): void
    {
        $this->loginRoot();

        $application = Application::factory()->create();

        $response = $this->deleteJson('/api/v1/applications/'.$application->id);

        $response->assertStatus(204);
        $this->assertSoftDeleted('applications', ['id' => $application->id]);
    }

    public function test_it_returns_not_found_when_application_does_not_exist(): void
    {
        $this->withExceptionHandling();
        $this->loginRoot();

        $response = $this->deleteJson('/api/v1/applications/'.fake()->uuid());

        $response->assertStatus(404);
    }

    public function test_it_requires_authentication(): void
    {
        $this->withoutExceptionHandling();

        $application = Application::factory()->create();

        $this->expectException(AuthenticationException::class);

        $this->deleteJson('/api/v1/applications/'.$application->id);
    }
}
