<?php
// database/seeders/PostSeeder.php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run()
    {
        // Créer 50 posts avec des états variés
        Post::factory()
            ->count(30)
            ->create();
        
        // 10 posts non publiés
        Post::factory()
            ->count(10)
            ->unpublished()
            ->create();
        
        // 5 posts avec vidéo
        Post::factory()
            ->count(5)
            ->withVideo()
            ->create();
        
        // 5 posts avec image seulement
        Post::factory()
            ->count(5)
            ->withImage()
            ->create();

        // Attacher des tags aléatoires à chaque post
        $tags = Tag::all();
        
        Post::all()->each(function ($post) use ($tags) {
            $post->tags()->attach(
                $tags->random(rand(1, 5))->pluck('id')->toArray()
            );
        });

        // Créer quelques posts pour des utilisateurs spécifiques
        $specificUsers = User::take(3)->get();
        
        foreach ($specificUsers as $user) {
            Post::factory()
                ->count(3)
                ->create(['user_id' => $user->id]);
        }
    }
}