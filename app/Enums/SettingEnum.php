<?php

namespace App\Enums;

enum SettingEnum: string
{
    case PasswordMinLength = 'password_min_length';
    case PasswordRequireLetters = 'password_require_letters';
    case PasswordRequireNumbers = 'password_require_numbers';
    case PasswordRequireSymbols = 'password_require_symbols';
    case PasswordRequireMixedCase = 'password_require_mixed_case';
    case OtpLength = 'otp_length';
    case OtpExpiresInMinutes = 'otp_expires_in_minutes';
    case OtpMaxAttempts = 'otp_max_attempts';
    case OtpRetryAfterSeconds = 'otp_retry_after_seconds';
}
