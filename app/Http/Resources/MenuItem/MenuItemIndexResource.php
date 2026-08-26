<?php

namespace App\Http\Resources\MenuItem;

use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin MenuItem
 */
class MenuItemIndexResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type?->value,
            'name' => $this->name,
            'slug' => $this->slug,
            'route' => $this->route,
            'path' => $this->path,
            'icon' => $this->icon,
            'active' => $this->active,
            'menu' => $this->whenLoaded('menu', fn () => $this->menu?->name),
            'items_count' => $this->children->count(),
            'children' => $this->children->map(fn (MenuItem $child) => new MenuItemIndexResource($child))->toArray(),
            'created_at' => $this->created_at,
        ];
    }
}
