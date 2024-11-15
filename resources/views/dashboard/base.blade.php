<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title')</title>
    <link href="https://fonts.googleapis.com/css2?family=Meiryo&display=swap" rel="stylesheet">
    <link rel="icon" href="{{ Vite::asset('resources/images/icon.png') }}" type="image/png">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @vite(['resources/css/dashboard/base.css'])
    @yield('css')
</head>
<body>

    <!-- Start sidebar -->
    @include('dashboard.layout.sidebar')
    <!-- End sidebar -->
    <div class="content">
        @yield('content')
    </div>
    @vite(['resources/js/dashboard/filterSearch.js'])
    @yield('js')

</body>
</html>
