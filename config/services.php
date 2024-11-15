<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'sns' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
        'allow_phone_number' => [
            '+819011476354', // 上野1
            '+819092439568', // 上野2
            '+817085680920', // 上野3
            '+818041207731', // 小澤1
            '+818065978063', // 小澤2
            '+817036313425', // 山口1
            '+818037082147', // 山口2
            '+819096201949', // ジェイ1
            '+818019808140', // ジェイ2
            '+819030947401', // 須藤　耕平
            '+819077779299', // 田浦　利明
            '+817083801127', //多賀谷
            '+819028519745', //脆弱性診断
            '+817039674057', //脆弱性診断
            '+817054593648', //脆弱性診断
            '+84964030999', //LUAN
            '+84976541951', //VINH
            '+84393244086', // Hoàng
            '+84366216328', // Tank
        ]
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

];
