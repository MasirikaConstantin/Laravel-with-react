<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id', 'title', 'slug', 'content', 'image', 'video_url', 'is_published', 'published_at'
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'is_published' => 'boolean',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function comments() {
        return $this->hasMany(Commentaire::class)->whereNull('parent_id');
    }

    public function allComments() {
        return $this->hasMany(Commentaire::class);
    }

    public function likes() {
        return $this->morphMany(Like::class, 'likeable');
    }

    public function tags() {
        return $this->belongsToMany(Tag::class);
    }

    public function bookmarks() {
        return $this->hasMany(Bookmark::class);
    }

    public function views() {
        return $this->hasMany(View::class);
    }
}
