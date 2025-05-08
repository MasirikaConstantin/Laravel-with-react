<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
 
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

   

    protected $fillable = [
        'name', 'username', 'email', 'password', 'avatar', 'bio', 'website', 'birthdate'
    ];

    
    protected $casts = [
        'email_verified_at' => 'datetime',
        'birthdate' => 'date',
    ];

    public function posts() {
        return $this->hasMany(Post::class);
    }

    public function comments() {
        return $this->hasMany(Commentaire::class);
    }

    public function likes() {
        return $this->hasMany(Like::class);
    }

    public function followers() {
        return $this->belongsToMany(User::class, 'followers', 'following_id', 'follower_id');
    }

    public function following() {
        return $this->belongsToMany(User::class, 'followers', 'follower_id', 'following_id');
    }

    public function bookmarks() {
        return $this->belongsToMany(Post::class, 'bookmarks');
    }
    /*protected $appends = ['avatar'];

    public function getAvatarAttribute()
{
    if ($this->attributes['avatar']) {
        return config('app.url') . '/storage/' . $this->attributes['avatar'];
    }
    return null;
}   */
// Pour la route binding avec le username
public function getRouteKeyName()
{
    return 'username';
}
}
