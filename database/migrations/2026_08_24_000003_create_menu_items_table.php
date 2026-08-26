<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('menu_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('menu_id')->constrained('menus')->cascadeOnDelete();
            $table->foreignUuid('parent_id')->nullable()->constrained('menu_items')->cascadeOnDelete();
            $table->string('type')->default('link');
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('route')->nullable();
            $table->string('path')->nullable();
            $table->string('icon')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('active')->default(true);
            $table->softDeletes();
            $table->timestamps();

            $table->index(['menu_id', 'sort_order']);
            $table->index(['menu_id', 'parent_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('menu_items');
    }
};
