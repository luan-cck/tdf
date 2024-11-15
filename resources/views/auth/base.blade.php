<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title')</title>
    <link rel="icon" href="{{ Vite::asset('resources/images/icon.png') }}" type="image/png">
    <link href="https://fonts.googleapis.com/css2?family=Meiryo&display=swap" rel="stylesheet">

    @vite(['resources/css/auth/base.css'])
</head>
<body>

    <div class="container">
        <div class="logo">
            <img src="{{ Vite::asset('resources/images/logo.svg') }}" alt="T&D Financial Life">
        </div>
        <div class="form-container">
            @yield('form')
           
        </div>
    </div>
</body>
</html>
