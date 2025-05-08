<?php
// database/seeders/UpdatePostImagesSeeder.php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;

class UpdatePostImagesSeeder extends Seeder
{
    public function run()
    {
        // Récupérer tous les posts qui ont une image
        $posts = Post::whereNotNull('image')->get();
        
        // Modifier chaque post
        $posts->each(function ($post) {
            // Générer une nouvelle URL d'image aléatoire
            $newImageUrl = $this->getRandomUserPhoto();
            
            // Mettre à jour le post
            $post->update(['image' => $newImageUrl]);
        });
        
        // Optionnel: aussi mettre à jour les posts sans image
        Post::whereNull('image')
            ->inRandomOrder()
            ->take(20) // seulement 20 posts sans image
            ->each(function ($post) {
                $post->update(['image' => $this->getRandomUserPhoto()]);
            });
    }
    
    protected function getRandomUserPhoto(): string
    {
        $genders = ['men', 'women'];
        $gender = $genders[array_rand($genders)];
        $id = rand(1, 99);
        
        return "https://randomuser.me/api/portraits/{$gender}/{$id}.jpg";
    }
}