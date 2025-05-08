<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class View extends Model
{
    /** @use HasFactory<\Database\Factories\ViewFactory> */
    use HasFactory;

    protected $fillable = ['post_id', 'ip_address', 'user_agent', 'user_id'];

    public function post() {
        return $this->belongsTo(Post::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
