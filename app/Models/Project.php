<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title', 'slug', 'tech', 'tag', 'image',
        'description', 'github_url', 'demo_url', 'featured', 'sort_order', 'screenshots',
    ];

    protected $casts = [
        'featured'    => 'boolean',
        'screenshots' => 'array',
    ];
}
