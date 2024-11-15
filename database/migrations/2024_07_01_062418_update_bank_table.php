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
            $table->enum('bank_type', ['銀行', '信用金庫'])->nullable()->change();
            $table->enum('branch_type', ['branch', 'head-office', 'sub-office'])->after('branch_name');
            $table->enum('account_type', ['normal', 'temporary' ,'saving'])->after('account_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bank_info', function (Blueprint $table) {
            $table->enum('bank_type', ['銀行', '信用金庫'])->change();
            $table->dropColumn(['branch_type', 'account_type']);
        });
    }
};
