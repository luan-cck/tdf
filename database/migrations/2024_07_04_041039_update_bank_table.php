<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('bank_info', function (Blueprint $table) {
            $table->enum('currency', ['yen', 'usd_usa', 'usd_aus', 'eur'])
                ->default('yen')
                ->comment("yen - 円, usa dollar - 米ドル, australia dollar - 豪ドル, euro - ユーロ")
                ->after("account_type");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bank_info', function (Blueprint $table) {
            $table->dropColumn('currency');
        });
    }
};
