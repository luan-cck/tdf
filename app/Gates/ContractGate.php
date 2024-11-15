<?php

namespace App\Gates;

use App\Models\Contract;
use App\Models\User;
use Illuminate\Auth\Access\Gate;

class ContractGate extends Gate
{
    public function viewAny(Contract $contract)
    {
        return true;
    }

    public function view()
    {
        return true;
    }

    public function create(User $user)
    {
        if ($user->hasRole('admin') || $user->hasPermissionTo('create-contract')) {
            return true;
        }

        return false;
    }

    public function update(User $user, Contract $contract)
    {
        if ($user->hasRole('admin') || $user->hasPermissionTo('edit-contract')) {
            return true;
        }

        return false;
    }

    public function delete(User $user, Contract $contract)
    {
        if ($user->hasRole('admin') || $user->hasPermissionTo('delete-contract')) {
            return true;
        }

        return false;
    }
}

// Register the gate in App\Providers\AuthServiceProvider.php
