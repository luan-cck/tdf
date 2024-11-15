FROM node:latest as build_static_stage
WORKDIR /src
COPY . /src
RUN npm install
RUN npm run build

FROM composer:latest as build_stage
WORKDIR /src
COPY --from=build_static_stage /src /src
RUN cp -n /src/.env.example /src/.env
# gd extension support
RUN apk add zlib-dev libpng-dev jpeg-dev  gd-dev jpeg-dev libjpeg-turbo-dev
# zip extension support
RUN apk add libzip-dev
RUN docker-php-ext-install gd zip
RUN composer install

FROM php:8.3-fpm-alpine
WORKDIR /var/www/html/
# Adjust timezone to Tokyo - GMT+9
RUN apk add tzdata && cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
  echo "Asia/Tokyo" > /etc/timezone && apk del tzdata && rm -rf /var/cache/apk/*

# Build dependencies
RUN apk add --no-cache --virtual .build-deps supervisor linux-headers libzip-dev
RUN docker-php-ext-configure zip 
RUN docker-php-ext-install pdo_mysql zip

# Configuration files
COPY --chown=www-data:www-data ./docker/phpfpm/supervisor/conf.d/* /etc/supervisor/conf.d/
COPY --chown=www-data:www-data ./docker/phpfpm/supervisor/supervisord.conf /etc/supervisor/supervisord.conf
COPY ./docker/phpfpm/docker-entrypoint.sh /usr/bin/docker-entrypoint.sh
COPY ./docker/phpfpm/php.ini /usr/local/etc/php/php.ini
COPY --chown=www-data:www-data --from=build_stage /src /var/www/html
RUN chmod -R 755 /var/www/html/storage

ENTRYPOINT ["/bin/sh", "/usr/bin/docker-entrypoint.sh"]
