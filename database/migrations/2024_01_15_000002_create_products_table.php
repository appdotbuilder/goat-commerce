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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('short_description')->nullable();
            $table->decimal('price', 12, 2);
            $table->decimal('sale_price', 12, 2)->nullable();
            $table->integer('stock_quantity')->default(0);
            $table->string('sku')->unique();
            $table->json('images')->nullable();
            $table->string('breed')->nullable();
            $table->enum('gender', ['male', 'female', 'mixed'])->default('mixed');
            $table->string('age_range')->nullable();
            $table->decimal('weight_range', 5, 2)->nullable();
            $table->text('health_info')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->boolean('allow_preorder')->default(false);
            $table->date('expected_availability')->nullable();
            $table->timestamps();
            
            $table->index('category_id');
            $table->index('slug');
            $table->index('sku');
            $table->index('is_featured');
            $table->index('is_active');
            $table->index('allow_preorder');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};