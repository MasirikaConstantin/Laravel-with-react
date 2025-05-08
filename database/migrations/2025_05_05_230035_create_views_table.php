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
        // database/migrations/2023_01_01_000008_create_views_table.php
        Schema::create('views', function (Blueprint $table) {
            $table->id();
            $table->foreignId('post_id')->constrained()->cascadeOnDelete();
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->timestamps();
            
            $table->index(['post_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('views');
    }
};
