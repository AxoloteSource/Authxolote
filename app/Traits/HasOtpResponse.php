<?php

namespace App\Traits;

use App\Models\Otp;

trait HasOtpResponse
{
    /**
     * Set the OTP response.
     */
    protected function setOtpResponse(Otp $otp): void
    {
        $response = [
            'token' => $otp->token,
            'expires_at' => $otp->expires_at,
        ];

        if (config('app.env') !== 'production') {
            $response['code_debug'] = $otp->otp_code;
        }

        $this->setResponse($response);
    }
}
