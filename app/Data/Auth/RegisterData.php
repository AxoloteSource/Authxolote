<?php

namespace App\Data\Auth;

use App\Models\Role;
use App\Models\Setting;
use Illuminate\Validation\Rules\Password;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;

class RegisterData extends Data
{
    public function __construct(
        #[Rule('required|string|max:50|min:3')]
        public string $name,
        #[Rule('required|email|string|unique:users')]
        public string $email,
        public string $password,
        #[Rule(['required', 'exists:roles,key'])]
        public string $role_key,
        public ?string $role_id,
    ) {
        $this->role_id = Role::where('key', $this->role_key)->first()->id;
        $this->password = bcrypt($this->password);
    }

    public static function rules(): array
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

        return [
            'password' => ['required', 'confirmed', $passwordRule],
        ];
    }
}
