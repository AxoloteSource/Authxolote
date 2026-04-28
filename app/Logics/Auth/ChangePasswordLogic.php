<?php

namespace App\Logics\Auth;

use App\Data\Auth\ChangePasswordData;
use App\Data\Auth\OtpStoreData;
use App\Http\Resources\Auth\ChangePasswordResource;
use App\Traits\HasOtpResponse;
use AxoloteSource\Logics\Enums\Http;
use AxoloteSource\Logics\Logics\Logic;
use AxoloteSource\Logics\Traits\OnlyWithAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;
use Spatie\LaravelData\Data;

class ChangePasswordLogic extends Logic
{
    use HasOtpResponse, OnlyWithAction;

    public function __construct(protected OtpStoreLogic $otpStoreLogic) {}

    public function run(ChangePasswordData|Data $input): JsonResponse
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

        $this->setOtpResponse($otpResponse->model);

        return $this;
    }

    protected function response(): JsonResponse
    {
        return Response::success(
            data: $this->withResource(),
            status: Http::Created
        );
    }

    protected function withResource(): ChangePasswordResource
    {
        return new ChangePasswordResource($this->response);
    }
}
