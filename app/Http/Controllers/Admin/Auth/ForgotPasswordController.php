<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Hash;
use App\Http\Requests\ChangePasswordRequest;
use App\Models\Admin;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */


    public function showForgotPasswordForm()
    {
        return view('auth.forgot-password');
    }

    public function resetPassword(ChangePasswordRequest $request)
    {
        $account = Admin::where('email', $request->email)->whereNull('deleted_at')->first();

        $account->password = Hash::make($request->password);
        $account->save();

        return redirect()->route('admin.login.show');

    }

}
