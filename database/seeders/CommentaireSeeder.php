<?php


namespace Database\Seeders;

use App\Models\Commentaire;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommentaireSeeder extends Seeder
{
    public function run()
    {
        // Créer des commentaires principaux pour chaque post
        Post::all()->each(function ($post) {
            // Entre 0 et 15 commentaires par post
            Commentaire::factory()
                ->count(rand(0, 15))
                ->forPost($post->id)
                ->create();
        });

        // Créer des réponses aux commentaires existants
        $mainComments = Commentaire::whereNull('parent_id')->get();
        
        foreach ($mainComments as $comment) {
            // Entre 0 et 5 réponses par commentaire
            Commentaire::factory()
                ->count(rand(0, 5))
                ->reply()
                ->forPost($comment->post_id)
                ->create(['parent_id' => $comment->id]);
        }

        // Créer des discussions plus approfondies pour certains posts
        $featuredPosts = Post::inRandomOrder()->take(5)->get();
        
        foreach ($featuredPosts as $post) {
            $rootComment = Commentaire::factory()
                ->forPost($post->id)
                ->create();
            
            // Niveau 1 de réponses
            $level1Replies = Commentaire::factory()
                ->count(rand(3, 7))
                ->forPost($post->id)
                ->create(['parent_id' => $rootComment->id]);
            
            // Niveau 2 de réponses
            foreach ($level1Replies as $reply) {
                Commentaire::factory()
                    ->count(rand(0, 3))
                    ->forPost($post->id)
                    ->create(['parent_id' => $reply->id]);
            }
        }
    }
}