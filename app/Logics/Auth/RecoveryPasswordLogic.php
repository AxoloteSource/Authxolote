<?php

namespace App\Logics\Auth;

use App\Data\Auth\OtpStoreData;
use App\Data\Auth\RecoveryPasswordData;
use AxoloteSource\Logics\Enums\Http;
use AxoloteSource\Logics\Logics\Logic;
use AxoloteSource\Logics\Traits\OnlyWithAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;
use Spatie\LaravelData\Data;

class RecoveryPasswordLogic extends Logic
{
    use OnlyWithAction;

    public function __construct(protected OtpStoreLogic $otpStoreLogic) {}

    public function run(RecoveryPasswordData|Data $input): JsonResponse
    {
        return $this->logic($input);
    }

    public function action(): self
    {
        $user = $this->user();

        $otpResponse = $this->otpStoreLogic->lazyRun(new OtpStoreData(
            user_id: $user->id
        ));

        if ($otpResponse->hasErrors()) {
            return $this;
        }

        $otp = $otpResponse->model;

        $response = [
            'token' => $otp->token,
            'expires_at' => $otp->expires_at,
        ];

        if (config('app.env') !== 'production') {
            $response['code_debug'] = $otp->otp_code;
        }

        $this->setResponse($response);

        return $this;
    }

    protected function response(): JsonResponse
    {
        return Response::success(
            data: $this->withResource(),
            status: Http::Created
        );
    }
}
