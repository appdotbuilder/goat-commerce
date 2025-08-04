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
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('referred_by')->nullable()->constrained('users')->onDelete('set null');
            $table->string('role')->default('customer');
            $table->json('address')->nullable();
            $table->string('phone')->nullable();
            
            $table->index('referred_by');
            $table->index('role');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['referred_by']);
            $table->dropIndex(['referred_by']);
            $table->dropIndex(['role']);
            $table->dropColumn(['referred_by', 'role', 'address', 'phone']);
        });
    }
};