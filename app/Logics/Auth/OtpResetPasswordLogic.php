<?php

namespace App\Logics\Auth;

use App\Data\Auth\OtpResetPasswordData;
use App\Models\Otp;
use AxoloteSource\Logics\Logics\UpdateLogic;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Spatie\LaravelData\Data;

class OtpResetPasswordLogic extends UpdateLogic
{
    protected Data|OtpResetPasswordData $input;

    public Otp|Model $model;

    protected bool $validateNotFound = false;

    public function __construct(Otp $model)
    {
        parent::__construct($model);
    }

    public function run(OtpResetPasswordData|Data $input): JsonResponse
    {
        return parent::logic($input);
    }

    protected function before(): bool
    {
        // 1. Buscar el OTP por token
        $otp = $this->model->where('token', $this->input->token)->first();

        if (! $otp) {
            return $this->error(__('Invalid token.'));
        }

        $this->model = $otp;

        // 2. Validar si el OTP ya fue usado
        if ($this->model->used_at) {
            return $this->error(__('This OTP has already been used.'));
        }

        // 3. Validar si el OTP ha expirado
        if ($this->model->expires_at->isPast()) {
            return $this->error(__('This OTP has expired.'));
        }

        // 4. Validar si el otp_code coincide
        if (! Hash::check($this->input->otp_code, $this->model->otp_code)) {
            return $this->error(__('Invalid OTP code.'));
        }

        $this->input->used_at = now();

        return true;
    }

    protected function after(): bool
    {
        $user = $this->model->user;
        $user->password = $this->input->password;
        $user->save();

        $this->response = collect(['message' => __('Password reset successfully.')]);

        return true;
    }
}
