<?php

namespace App\Providers;

use App\Gates\ContractGate;
use App\Policies\ContractPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
//use App\Policies\PostPolicy;
use App\Providers\CacheServiceProvider;
use App\Providers\RepositoryServiceProvider;
use Illuminate\Support\Facades\URL;
use Vite;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    { 
        $this->app->register(CacheServiceProvider::class);
        $this->app->register(RepositoryServiceProvider::class);
    }
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (config('app.env') != 'local') {
            URL::forceScheme('https');
        }
        Vite::useBuildDirectory('/admin/build');

//        Gate::define('view_contract', [ContractPolicy::class, 'view']);
//        Gate::define('view', [ContractPolicy::class, 'view']);
//        Gate::define('update', [ContractGate::class, 'update']);
//        Gate::define('delete', [ContractGate::class, 'delete']);
    }
}
