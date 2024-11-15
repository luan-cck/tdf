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
        Schema::create('status', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('author_id');
            $table->unsignedBigInteger('request_id');
            $table->enum('status', ['created', 'pending', 'reject', 'approve', 'submit', 'block']);
            $table->string('reason_for_return')->nullable();
            $table->string('cancellation_reason')->nullable();
            $table->dateTime('confirm_date');
            $table->timestamps();

            $table->foreign('author_id')->references('id')->on('admins')->onDelete('cascade');
            $table->foreign('request_id')->references('id')->on('request_forms')->onDelete('cascade');;
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('status');
    }
};
