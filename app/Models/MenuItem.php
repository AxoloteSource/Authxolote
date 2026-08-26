<?php

namespace App\Models;

use App\Enums\MenuItemType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class MenuItem extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'menu_id',
        'parent_id',
        'type',
        'name',
        'slug',
        'route',
        'path',
        'icon',
        'sort_order',
        'active',
    ];

    protected $casts = [
        'type' => MenuItemType::class,
        'active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function menu(): BelongsTo
    {
        return $this->belongsTo(Menu::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(MenuItem::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(MenuItem::class, 'parent_id')
            ->orderBy('sort_order');
    }

    public function isHeader(): bool
    {
        return $this->type?->isHeader() ?? false;
    }

    public function isLink(): bool
    {
        return $this->type?->isLink() ?? false;
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order');
    }
}
