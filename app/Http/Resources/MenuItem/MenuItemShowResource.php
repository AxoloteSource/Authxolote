<?php

namespace App\Http\Resources\MenuItem;

use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin MenuItem
 */
class MenuItemShowResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'menu_id' => $this->menu_id,
            'parent_id' => $this->parent_id,
            'type' => $this->type?->value,
            'name' => $this->name,
            'slug' => $this->slug,
            'route' => $this->route,
            'path' => $this->path,
            'icon' => $this->icon,
            'sort_order' => $this->sort_order,
            'active' => $this->active,
            'menu' => $this->whenLoaded('menu', fn () => $this->menu?->name),
            'parent' => $this->whenLoaded('parent', fn () => $this->parent?->id),
            'children' => $this->children
                ->filter(fn (MenuItem $child) => $child->isVisibleTo($this->currentRoleId($request)))
                ->values()
                ->map(fn (MenuItem $child) => new MenuItemShowResource($child))
                ->toArray(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    private function currentRoleId(Request $request): ?string
    {
        return $request->user()?->role_id;
    }
}
