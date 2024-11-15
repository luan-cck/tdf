<?php

use App\Http\Controllers\Admin\RequestFormController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\SMSController;
use App\Http\Controllers\Admin\AccountManagementController;
use App\Http\Controllers\Admin\ReturnListController;
use App\Http\Controllers\Admin\DownloadCSVController;

Route::namespace('Admin')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        return redirect()->route('admin.login.show');
    });

    Route::middleware('guest')->group(function () {
        Route::get('/login', 'Auth\LoginController@showLoginForm')->name('login.show');
        Route::get('/forgot-password', 'Auth\ForgotPasswordController@showForgotPasswordForm')->name('forgotPass.show');
        Route::post('/login', 'Auth\LoginController@login')->name('login');
        Route::post('/reset-password', 'Auth\ForgotPasswordController@resetPassword')->name('reset.password');
    });

    Route::middleware(['auth:web', 'role:1'])->group(function () {
        Route::get('/account-manage', [AccountManagementController::class, 'getListAccount'])->name('account.list');
        Route::post('/create-account', [AccountManagementController::class, 'store'])->name('account.store');
        Route::put('/edit-account/{id}', [AccountManagementController::class, 'update'])->name('account.update');
        Route::delete('/delete-account/{id}', [AccountManagementController::class, 'delete'])->name('account.delete');
    });

    Route::middleware(['auth:web', 'role:1,2'])->group(function () {
        Route::get('/request-form-create', [RequestFormController::class, 'create'])->name('create-new');
        Route::post('/create-form-request', [RequestFormController::class, 'store'])->name('request-form.store');

        Route::post('/request-form/{id}/approve', [RequestFormController::class, 'approve'])->name('request-form.approve');
        Route::post('/request-form/{id}/reject', [RequestFormController::class, 'reject'])->name('request-form.reject');

        Route::post('/return-list/{id}', [ReturnListController::class, 'update'])->name('return.update');
        Route::post('download-csv', [DownloadCSVController::class, 'downloadReceptionCsv'])->name('reception.download');
        Route::get('/check-job-status/{jobId}', [DownloadCSVController::class, 'checkJobStatus']);
        Route::get('/download-file/{jobId}', [DownloadCSVController::class, 'getDownload']);
    });

    Route::middleware('auth:web')->group(function () {        
        Route::post('/logout', 'Auth\LoginController@logout')->name('logout');

        Route::get('/return-list', [ReturnListController::class, 'index'])->name('return.list');
        Route::get('/return-list/{id}', [ReturnListController::class, 'edit'])->name('return.edit');

        Route::get('/reception-list', 'SMSController@receptionList')->name('reception.list');
        Route::get('/reception-detail/{id}', 'SMSController@receptionDetail')->name('reception.detail');

        Route::get('/sms-sent-list', 'SMSController@index')->name('smsSentList.index');
        Route::get('/detail-sent/{id}', [SMSController::class, 'getDetail'])->name('smsSentList.detail');

        Route::get('/request-form/{id}', [RequestFormController::class, 'getSend'])->name('request-form.send');
        Route::get('/request-form-waiting', [RequestFormController::class, 'list'])->name('home');
        
    });
})->middleware('csrf_token');
