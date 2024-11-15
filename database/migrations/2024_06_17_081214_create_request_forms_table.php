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
        Schema::create('request_forms', function (Blueprint $table) {
            $table->id();
            $table->string('request_uid', 8)->unique();
            $table->string('contractor_name');
            $table->date('birthday');
            $table->enum('request_type_name', ['1', '2', '3'])->comment('1: 解約, 2:ID集約, 3: 給付金');
            $table->string('application_reception_number');
            $table->string('phone');
            $table->string('policy_number');
            $table->unsignedBigInteger('product_id');
            $table->timestamps();

            $table->foreign('product_id')->references('product_id')->on('m_products_details')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('request_forms');
    }
};
