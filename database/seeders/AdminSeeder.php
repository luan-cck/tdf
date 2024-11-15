<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roleIds = [1, 2, 3];

        $admins = array();

        // ***IMPORTANT***
        // Dummy Guest as author for submmited request_form action
        $admins[0] = [
            'id' => 1,
            'username' => 'guest',
            'role_id' => 1,
            'email' => 'guest@tdf-life.com',
            'password' => Hash::make('admin9568'),
            'is_active' => 'active',
            'created_at' => now(),
            'updated_at' => now(),
        ];

        for($i=1; $i<=10; $i++) {
            $admins[$i] = [
                'id' => $i + 1,
                'username' => 'admin' . $i,
                'role_id' => $roleIds[array_rand($roleIds)],
                'email' => 'admin'. $i .'@tdf-life.com',
                'password' => Hash::make('admin9568'),
                'is_active' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('admins')->whereIn('id', collect($admins)->pluck('id'))->delete();
        DB::table('admins')->insert($admins);
    }
}
