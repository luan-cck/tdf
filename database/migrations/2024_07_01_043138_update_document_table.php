<?php

use App\Models\Document;
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
        Schema::table('documents', function (Blueprint $table) {
            $table->dropColumn(['document_type']);
        });
        Schema::table('documents', function (Blueprint $table) {
            $table->enum('document_type', [
                Document::DOCUMENT_IDENTITY_DOCUMENT_FRONT,
                Document::DOCUMENT_IDENTITY_DOCUMENT_BACK,
                Document::DOCUMENT_PARENT_IDENTITY_DOCUMENT_FRONT,
                Document::DOCUMENT_PARENT_IDENTITY_DOCUMENT_BACK,
                Document::DOCUMENT_CONTRACT_OWNER_IDENTITY_DOCUMENT_FRONT,
                Document::DOCUMENT_CONTRACT_OWNER_IDENTITY_DOCUMENT_BACK,
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('documents', function (Blueprint $table) {
            $table->dropColumn(['document_type']);
        });
        Schema::table('documents', function (Blueprint $table) {
            $table->enum('document_type', ['identity_document', 'parent_identity_document', 'relationship_proof', 'insured_person_identity_document', 'contract_owner_identity_document']);
        });
    }
};
