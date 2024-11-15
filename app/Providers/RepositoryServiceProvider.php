<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(
            \App\Repositories\AccountManagement\AccountManagementRepositoryInterface::class,
            \App\Repositories\AccountManagement\AccountManagementRepository::class
        );

        $this->app->bind(
            \App\Repositories\RequestForm\RequestFormRepositoryInterface::class,
            \App\Repositories\RequestForm\RequestFormRepository::class
        );

        $this->app->bind(
            \App\Repositories\RequestFormToken\RequestFormTokenRepositoryInterface::class,
            \App\Repositories\RequestFormToken\RequestFormTokenRepository::class
        );

        $this->app->bind(
            \App\Repositories\Status\StatusRepositoryInterface::class,
            \App\Repositories\Status\StatusRepository::class
        );

        $this->app->bind(
            \App\Repositories\Customer\CustomerRepositoryInterface::class,
            \App\Repositories\Customer\CustomerRepository::class
        );

        $this->app->bind(
            \App\Repositories\CustomerRelationship\CustomerRelationshipRepositoryInterface::class,
            \App\Repositories\CustomerRelationship\CustomerRelationshipRepository::class
        );

        $this->app->bind(
            \App\Repositories\Document\DocumentRepositoryInterface::class,
            \App\Repositories\Document\DocumentRepository::class
        );

        $this->app->bind(
            \App\Repositories\Bank\BankRepositoryInterface::class,
            \App\Repositories\Bank\BankRepository::class
        );
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {

    }
}
