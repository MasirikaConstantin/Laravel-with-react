<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commentaire extends Model
{
    /** @use HasFactory<\Database\Factories\CommentaireFactory> */
    use HasFactory;
    protected $fillable = ['user_id', 'post_id', 'parent_id', 'content'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    
   

    public function post() {
        return $this->belongsTo(Post::class);
    }

    public function replies() {
        return $this->hasMany(Commentaire::class, 'parent_id');
    }

    public function parent() {
        return $this->belongsTo(Commentaire::class, 'parent_id');
    }

    public function likes() {
        return $this->morphMany(Like::class, 'likeable');
    }
}
