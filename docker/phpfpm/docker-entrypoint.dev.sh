#!/bin/sh
php import_vars.php
composer install
php artisan key:generate
php artisan migrate --force
php artisan optimize:clear
supervisord -c /etc/supervisor/supervisord.conf
docker-php-entrypoint php-fpm
