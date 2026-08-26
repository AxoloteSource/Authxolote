<?php

namespace App\Http\Resources\Application;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Application
 */
class ApplicationIndexResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'menus_count' => $this->menus_count,
            'active' => $this->active,
            'created_at' => $this->created_at,
        ];
    }
}
