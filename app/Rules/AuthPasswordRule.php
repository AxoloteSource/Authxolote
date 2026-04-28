<?php

namespace App\Rules;

use App\Models\Setting;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rules\Password;

class AuthPasswordRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $min = Setting::where('name', 'password_min_length')->first()?->value ?? 8;
        $letters = filter_var(Setting::where('name', 'password_require_letters')->first()?->value ?? true, FILTER_VALIDATE_BOOLEAN);
        $numbers = filter_var(Setting::where('name', 'password_require_numbers')->first()?->value ?? true, FILTER_VALIDATE_BOOLEAN);
        $symbols = filter_var(Setting::where('name', 'password_require_symbols')->first()?->value ?? false, FILTER_VALIDATE_BOOLEAN);
        $mixedCase = filter_var(Setting::where('name', 'password_require_mixed_case')->first()?->value ?? false, FILTER_VALIDATE_BOOLEAN);

        $passwordRule = Password::min($min);

        if ($letters) {
            $passwordRule->letters();
        }

        if ($numbers) {
            $passwordRule->numbers();
        }

        if ($symbols) {
            $passwordRule->symbols();
        }

        if ($mixedCase) {
            $passwordRule->mixedCase();
        }

        $validator = validator([$attribute => $value], [$attribute => $passwordRule]);

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $message) {
                $fail($message);
            }
        }
    }
}
