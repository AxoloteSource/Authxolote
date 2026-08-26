<?php

namespace Database\Factories;

use App\Enums\MenuItemType;
use App\Models\Menu;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MenuItem>
 */
class MenuItemFactory extends Factory
{
    public function definition(): array
    {
        return [
            'menu_id' => Menu::factory(),
            'parent_id' => null,
            'type' => MenuItemType::Link,
            'name' => $this->faker->unique()->word(),
            'slug' => $this->faker->unique()->slug(),
            'route' => $this->faker->optional()->slug(),
            'path' => '/'.$this->faker->slug(),
            'icon' => $this->faker->optional()->word(),
            'sort_order' => $this->faker->numberBetween(0, 10),
            'active' => true,
        ];
    }

    public function header(): static
    {
        return $this->state([
            'type' => MenuItemType::Header,
            'route' => null,
            'path' => null,
        ]);
    }

    public function link(): static
    {
        return $this->state([
            'type' => MenuItemType::Link,
        ]);
    }
}
