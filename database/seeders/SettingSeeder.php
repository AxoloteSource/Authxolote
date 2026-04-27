<?php

namespace Database\Seeders;

use App\Enums\SettingValueTypeEnum;
use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            [
                'name' => 'password_min_length',
                'value' => '8',
                'setting_value_type_id' => SettingValueTypeEnum::Integer->value,
                'group' => 'auth',
            ],
            [
                'name' => 'password_require_letters',
                'value' => 'true',
                'setting_value_type_id' => SettingValueTypeEnum::Boolean->value,
                'group' => 'auth',
            ],
            [
                'name' => 'password_require_numbers',
                'value' => 'true',
                'setting_value_type_id' => SettingValueTypeEnum::Boolean->value,
                'group' => 'auth',
            ],
            [
                'name' => 'password_require_symbols',
                'value' => 'true',
                'setting_value_type_id' => SettingValueTypeEnum::Boolean->value,
                'group' => 'auth',
            ],
            [
                'name' => 'password_require_mixed_case',
                'value' => 'false',
                'setting_value_type_id' => SettingValueTypeEnum::Boolean->value,
                'group' => 'auth',
            ],
            [
                'name' => 'otp_length',
                'value' => '4',
                'setting_value_type_id' => SettingValueTypeEnum::Integer->value,
                'group' => 'auth',
            ],
            [
                'name' => 'otp_expires_in_minutes',
                'value' => '15',
                'setting_value_type_id' => SettingValueTypeEnum::Integer->value,
                'group' => 'auth',
            ],
            [
                'name' => 'otp_max_attempts',
                'value' => '3',
                'setting_value_type_id' => SettingValueTypeEnum::Integer->value,
                'group' => 'auth',
            ],
            [
                'name' => 'otp_retry_after_seconds',
                'value' => '60',
                'setting_value_type_id' => SettingValueTypeEnum::Integer->value,
                'group' => 'auth',
            ],
        ];
        Setting::upsert($settings, ['name'], ['value', 'setting_value_type_id', 'group']);
    }
}
