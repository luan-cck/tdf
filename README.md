<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel Base is the customized Laravel Project which has prepared environments, components designed for the specific DB schemes, source code easy to be diverted.
You can develop API and Web application instantly with Laravel Base.

Install tools below on your local PC before starting.
- Git
- Docker


## 1. How to setup developing environment

#### 1-1. Create .env file for Docker

```
$ cp .env.example .env
```

#### 1-2. Set info DB

In .env file, set DB name.
```
DB_DATABASE=(DB name)
```
```
DB_USERNAME=(DB username)
```
```
DB_PASSWORD=(DB password)
```

#### 1-3. Start up Docker

```
$ docker compose up
```
When needed to rebuild.
```
$ docker compose build --no-cache
```
#### 1-4. Laravel container

Connect to the Laravel container.  
Need to create vendor directory and node_modules directory.
```
$ docker exec -it tdf_phpfpm sh
```

```
$ composer install
```
```
$ npm install
```
```
$ php artisan key:generate
```
```
$ php artisan config:clear
```
```
$ exit
```
```
$ docker compose restart
```

#### 1-5. Docker commands for frequent use.

Start up containers.
```
$ docker compose up
```
Stop containers.
```
$ docker compose stop
```
Delete stopped containers.
```
$ docker compose rm
```
Stop and delete containers.
```
$ docker compose down
```
