<?php

namespace App\Data\Auth;

use App\Rules\AuthPasswordRule;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;

class OtpResetPasswordData extends Data
{
    public ?string $used_at;

    public function __construct(
        #[Rule('required|string')]
        public string $token,
        #[Rule('required|string')]
        public string $otp_code,
        public string $password,
    ) {
        $this->password = bcrypt($this->password);
        $this->used_at = null;
    }

    public static function rules(): array
    {
        return [
            'password' => ['required', 'confirmed', new AuthPasswordRule],
        ];
    }
}
