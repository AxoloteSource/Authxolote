<?php

namespace App\Data\Auth;

use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;

class OtpStoreData extends Data
{
    public ?string $token = null;

    public ?string $otp_code = null;

    public ?string $expires_at = null;

    public function __construct(
        #[Rule(['required', 'exists:users,id', 'uuid'])]
        public string $user_id,
    ) {}
}
