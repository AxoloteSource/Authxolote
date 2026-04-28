<?php

namespace App\Models;

use App\Enums\SettingEnum;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Setting extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'name',
        'value',
        'setting_value_type_id',
        'encrypted',
        'is_public',
        'group',
    ];

    protected $casts = [
        'encrypted' => 'boolean',
        'is_public' => 'boolean',
    ];

    public function settingValueType(): BelongsTo
    {
        return $this->belongsTo(SettingValueType::class);
    }

    public static function findByKey(SettingEnum $key): ?self
    {
        return self::where('name', $key->value)->first();
    }

    public static function getPasswordMinLength(): int
    {
        $data = self::findByKey(SettingEnum::PasswordMinLength)?->value;

        return intval($data ?? 8);
    }

    public static function getPasswordRequireLetters(): bool
    {
        $data = self::findByKey(SettingEnum::PasswordRequireLetters)?->value;

        return filter_var($data ?? true, FILTER_VALIDATE_BOOLEAN);
    }

    public static function getPasswordRequireNumbers(): bool
    {
        $data = self::findByKey(SettingEnum::PasswordRequireNumbers)?->value;

        return filter_var($data ?? true, FILTER_VALIDATE_BOOLEAN);
    }

    public static function getPasswordRequireSymbols(): bool
    {
        $data = self::findByKey(SettingEnum::PasswordRequireSymbols)?->value;

        return filter_var($data ?? true, FILTER_VALIDATE_BOOLEAN);
    }

    public static function getPasswordRequireMixedCase(): bool
    {
        $data = self::findByKey(SettingEnum::PasswordRequireMixedCase)?->value;

        return filter_var($data ?? false, FILTER_VALIDATE_BOOLEAN);
    }

    public static function getOtpLength(): int
    {
        $data = self::findByKey(SettingEnum::OtpLength)?->value;

        return intval($data ?? 4);
    }

    public static function getOtpExpiresInMinutes(): int
    {
        $data = self::findByKey(SettingEnum::OtpExpiresInMinutes)?->value;

        return intval($data ?? 15);
    }

    public static function getOtpMaxAttempts(): int
    {
        $data = self::findByKey(SettingEnum::OtpMaxAttempts)?->value;

        return intval($data ?? 3);
    }

    public static function getOtpRetryAfterSeconds(): int
    {
        $data = self::findByKey(SettingEnum::OtpRetryAfterSeconds)?->value;

        return intval($data ?? 60);
    }
}
