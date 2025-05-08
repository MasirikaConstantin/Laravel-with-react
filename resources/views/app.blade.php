<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

       
        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
        <style>
             @font-face {
                font-family: 'MaPolice';
                src: url('{{ asset("/fonts/ProductSans-Light.ttf")}}') format('truetype');
            }

            body {
            font-family: 'MaPolice', sans-serif !important;

            
            }
        </style>
    </head>
    <body class=" ">
           @inertia

    </body>
</html>
