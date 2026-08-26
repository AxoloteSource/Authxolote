<?php

use App\Http\Controllers\V1\Application\ApplicationController;
use Illuminate\Support\Facades\Route;

Route::controller(ApplicationController::class)->group(function () {
    Route::get('/', 'index')
        ->middleware('isAllow:auth.applications.index');

    Route::post('/', 'store')
        ->middleware('isAllow:auth.applications.store');

    Route::get('{slug}', 'show')
        ->middleware('isAllow:auth.applications.show');

    Route::put('{id}', 'update')
        ->middleware('isAllow:auth.applications.update');

    Route::delete('{id}', 'destroy')
        ->middleware('isAllow:auth.applications.destroy');
});
