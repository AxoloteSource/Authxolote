<?php

namespace App\Http\Resources\MenuItem;

use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin MenuItem
 */
class MenuItemShowAllResource extends JsonResource
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
            'has_role' => $this->hasRole($request),
            'menu' => $this->whenLoaded('menu', fn () => $this->menu?->name),
            'parent' => $this->whenLoaded('parent', fn () => $this->parent?->id),
            'children' => $this->children
                ->values()
                ->map(fn (MenuItem $child) => new MenuItemShowAllResource($child))
                ->toArray(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    private function hasRole(Request $request): bool
    {
        $roleId = $request->query('role_id');

        if ($roleId === null || $roleId === '') {
            return true;
        }

        return $this->isVisibleTo($roleId);
    }
}
