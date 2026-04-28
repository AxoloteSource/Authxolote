<?php

use App\Http\Controllers\V1\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
});

Route::controller(AuthController::class)->middleware('auth:api')->group(function () {
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('is-allowed', 'isAllowed');
    Route::post('me', 'me');
    Route::post('recovery-password', 'recoveryPassword')->middleware('isAllow:auth.recovery-password');
});
