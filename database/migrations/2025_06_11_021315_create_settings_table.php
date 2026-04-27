<?php

use App\Enums\SettingValueTypeEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->text('value');
            $table->foreignUuid('setting_value_type_id')
                ->default(SettingValueTypeEnum::String->value)
                ->constrained();
            $table->boolean('encrypted')->default(false);
            $table->boolean('is_public')->default(false);
            $table->string('group')->default('app');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
