@extends('auth.base')
@section('title', "パスワード変更")

@section('form')
    <form class="login-form" action="{{route('admin.reset.password')}}" method="POST">
        @csrf
        <h2 class="forgot-password-title">パスワード変更</h2>
        <label for="email">メールアドレス：</label>
        <input type="email" id="email" name="email" value="{{ old('email') ?? '' }}">
        @if ($errors->has('email'))
            <div class="text-red value-error">{{ $errors->first('email') }}</div>
        @endif

        <label for="password">新しいパスワード：</label>
        <input type="password" id="password" name="password" placeholder="" autocomplete="new-password">
        <p class="note">※半角の英数字8〜12文字（a-z,0-9）で設定お願いします。</p>
        @if ($errors->has('password'))
            <div class="text-red value-error">{{ $errors->first("password") }}</div>
        @endif

        <label for="password_confirmation">新しいパスワード再入力：</label>
        <input type="password" id="confirm_password" name="password_confirmation" placeholder="">
        @if ($errors->has('password_confirmation'))
            <div class="text-red value-error">{{ $errors->first("password_confirmation") }}</div>
        @endif
        <button class="mt-5" type="submit">パスワードを変更する</button>
        <a class="mt-5 login-form-a" href="{{ route('admin.login.show') }}">ログイン画面に戻る</a>
    </form>

@endsection

