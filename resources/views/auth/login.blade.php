@extends('auth.base')
@section('title', "ログイン")

@section('form')
    <form class="login-form" action="{{route('admin.login')}}" method="POST">
        @csrf
        <label for="email">メールアドレス</label>
        <input type="email" id="email" name="email" placeholder="メールアドレスを入力してください">
        <label for="password">パスワード</label>
        <input type="password" id="password" name="password" placeholder="パスワードを入力してください" autocomplete="password">
        <a href="{{ route('admin.forgotPass.show') }}" class="forgot-password">パスワードを忘れた方はこちら</a>
        @if ($errors->any())
            <div class="text-red value-error">{{ $errors->first() }}</div>
        @endif
        <button type="submit">ログイン</button>
    </form>

@endsection

