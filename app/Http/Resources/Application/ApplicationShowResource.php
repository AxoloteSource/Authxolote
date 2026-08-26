<?php

namespace App\Http\Resources\Application;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Application
 */
class ApplicationShowResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'active' => $this->active,
            'menus' => $this->whenLoaded('menus', fn () => $this->menus->map(fn ($menu) => [
                'id' => $menu->id,
                'name' => $menu->name,
                'slug' => $menu->slug,
            ])->toArray()),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
