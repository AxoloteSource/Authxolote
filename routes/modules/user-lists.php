<?php

use App\Http\Controllers\V1\UserList\UserListController;
use App\Http\Controllers\V1\UserList\UserListUserController;
use Illuminate\Support\Facades\Route;

Route::controller(UserListController::class)->group(function () {
    Route::get('/', 'index')
        ->middleware('isAllow:auth.user-lists.index');

    Route::post('/', 'store')
        ->middleware('isAllow:auth.user-lists.store');

    Route::get('{id}', 'show')
        ->middleware('isAllow:auth.user-lists.show');

    Route::put('{id}', 'update')
        ->middleware('isAllow:auth.user-lists.update');

    Route::delete('{id}', 'destroy')
        ->middleware('isAllow:auth.user-lists.destroy');
});

Route::prefix('{id}/users')->controller(UserListUserController::class)->group(function () {
    Route::get('/', 'index')
        ->middleware('isAllow:auth.user-lists.show');
});
