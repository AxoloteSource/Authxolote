<?php

namespace App\Http\Resources\UserList;

use App\Models\UserList;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin UserList
 */
class UserListIndexResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'users_count' => $this->users_count,
            'created_at' => $this->created_at,
        ];
    }
}
