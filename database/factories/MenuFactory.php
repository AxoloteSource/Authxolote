<?php

namespace Database\Factories;

use App\Models\Application;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Menu>
 */
class MenuFactory extends Factory
{
    public function definition(): array
    {
        return [
            'application_id' => Application::factory(),
            'name' => $this->faker->unique()->word(),
            'slug' => $this->faker->unique()->slug(),
            'icon' => $this->faker->optional()->word(),
            'sort_order' => $this->faker->numberBetween(0, 10),
            'active' => true,
        ];
    }
}
