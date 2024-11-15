<?php

namespace App;

class Constants {
    const ROLE_SUPER_ADMIN = 1;
    const ROLE_ADMIN = 2;
    const ROLE_GENERAL_USER = 3;

    const MAXIMUM_INCORRECT_TIMES = 3;
    const EXPIRE_AFTER_DAYS = 60;

    const PER_PAGE = 10;

    const DATE_FORMAT = "Y年m月d日";

    const DATETIME_FORMAT = "Y-m-d H:i";

    const ITEM_PER_PAGE = [
        '10' => '10',
        '50' => '50',
        '100' => '100',
    ];

    const ROLE = [
        '1' => '管理者',
        '2' => 'ユーザー',
        '3' => '参照',
    ];

    const REQUEST_TYPE = [
        '1' => '解約',
        '2' => 'ID集約',
        '3' => '給付金',
    ];

    const STATUS = [
        'created'   => '新規作成',
        'reject'    => '差戻し' ,
        'pending'   => '保留中',
        'approve'   => '送信済み' ,
        'block'     => '認証エラー',
        'submit'    => '受付完了',
        'export'    => '出力済'
    ];

    const LIST_OF_BANK_ACCOUNT_TYPES = [
        'normal'    => '普通（総合）',
        'temporary' => '当座',
        'saving'    => '貯蓄'
    ];

    const LIST_OF_BANK_BRANCH_TYPES = [
        'head-office'   => '本店',
        'sub-office'    => '出張所',
        'branch'        => '支店'
    ];

    const CURRENCY_LABELS = [
        'yen' => '円',
        'usd_usa' => '米ドル',
        'usd_aus' => '豪ドル',
        'eur' => 'ユーロ'
    ];

    const MAXIMUM_CSV_RECORDS_SUPPORT = 5000;

    const REQUEST_FROM_DOWNLOAD_STATUS = [
        0   => '未出力',
        1   => '出力済'
    ];

    const REQUEST_FORM_CACHE_ID = 'pending_request_id_';
    const REQUEST_FORM_CACHE_PREFIX = 'pending_request_lock_';
    const REQUEST_FORM_CACHE_TTL_IN_SECONDS = 1800;
}
