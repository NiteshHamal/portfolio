<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('slug')->nullable()->unique()->after('title');
            $table->text('description')->nullable()->after('image');
            $table->string('github_url')->nullable()->after('description');
            $table->string('demo_url')->nullable()->after('github_url');
            $table->boolean('featured')->default(false)->after('demo_url');
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['slug', 'description', 'github_url', 'demo_url', 'featured']);
        });
    }
};
