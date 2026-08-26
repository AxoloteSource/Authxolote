<?php

namespace Tests\Feature\Application;

use App\Models\Application;
use Illuminate\Auth\AuthenticationException;
use Tests\TestCase;

class ApplicationShowTest extends TestCase
{
    public function test_it_can_show_an_application(): void
    {
        $this->loginRoot();

        $application = Application::factory()->create();

        $response = $this->getJson('/api/v1/applications/'.$application->slug);

        $response->assertStatus(200);
        $response->assertJsonPath('data.id', $application->id);
        $response->assertJsonPath('data.slug', $application->slug);
        $response->assertJsonPath('data.name', $application->name);
    }

    public function test_it_returns_not_found_when_application_does_not_exist(): void
    {
        $this->withExceptionHandling();
        $this->loginRoot();

        $response = $this->getJson('/api/v1/applications/'.fake()->slug());

        $response->assertStatus(404);
    }

    public function test_it_requires_authentication(): void
    {
        $this->withoutExceptionHandling();

        $application = Application::factory()->create();

        $this->expectException(AuthenticationException::class);

        $this->getJson('/api/v1/applications/'.$application->slug);
    }
}
