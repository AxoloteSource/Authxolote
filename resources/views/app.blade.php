<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name', 'Citizen attention') }}</title>
    <link href="https://fonts.googleapis.com/css?family=Nunito:400,600,700" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @viteReactRefresh
    @vite(['resources/js/main.tsx'])
</head>

<body id="root">
<noscript>
    <strong>
        Lo sentimos, este sitio no funciona correctamente sin Javascript. Habilitalo para poder
        continuar
    </strong>
</noscript>

</body>

</html>
