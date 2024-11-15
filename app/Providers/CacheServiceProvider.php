<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Cache;
use App\Models\MProductsDetail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CacheServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
       // Check if not running in console (not running composer)
        if (!$this->app->runningInConsole()) {
            $this->app->booted(function () {
                $this->createGlobalCache();
            });
        }
    }

   
    /**
     * Create global cache for products.
     *
     * @return void
     */
    private function createGlobalCache()
    {
        if (Schema::hasTable('m_products_details')) {
            if (MProductsDetail::count() > 0) {
                Cache::rememberForever('productions', function () {
                    return MProductsDetail::all();
                });
            }
        }
    }
}
