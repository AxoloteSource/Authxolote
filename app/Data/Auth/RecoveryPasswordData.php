<?php

namespace App\Data\Auth;

use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;

class RecoveryPasswordData extends Data
{
    public function __construct(
        #[Rule(['required', 'email:rfc'])]
        public string $email,
    ) {}
}
