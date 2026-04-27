<?php

namespace Database\Seeders;

use App\Enums\SettingValueTypeEnum;
use App\Models\SettingValueType;
use Illuminate\Database\Seeder;

class SettingValueTypeSeeder extends Seeder
{
    public function run(): void
    {
        SettingValueType::upsert([
            [
                'id' => SettingValueTypeEnum::String->value,
                'name' => 'String',
            ],
            [
                'id' => SettingValueTypeEnum::Integer->value,
                'name' => 'Integer',
            ],
            [
                'id' => SettingValueTypeEnum::Boolean->value,
                'name' => 'Boolean',
            ],
            [
                'id' => SettingValueTypeEnum::Json->value,
                'name' => 'Json',
            ],
        ], ['id'], ['name']);
    }
}
