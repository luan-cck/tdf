<?php

use App\Http\Controllers\API\CommonController;
use App\Http\Controllers\API\RequestFormController;
use Illuminate\Support\Facades\Route;

// Healthcheck path. DO NOT REMOVED
Route::get('health-check', function () { return 'healthy'; });

Route::group(['middleware' => 'sms_token'], function() {
    Route::post('request-form/verify', [RequestFormController::class, 'verify'])->name('request-form.verify');
    Route::post('request-form/verify-birthday', [RequestFormController::class, 'verifyBirthday'])->name('request-form.verify-birthday');
    Route::post('request-form', [RequestFormController::class, 'postRequestForm'])->name('request-form.post-request-form');
    Route::post('upload', [CommonController::class, 'fileUpload'])->name('common.file-upload');
});
