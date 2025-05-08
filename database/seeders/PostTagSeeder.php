<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class PostTagSeeder extends Seeder
{
    public function run(): void
    {
        $tags = Tag::all();

        // S'assurer qu'on a des tags et des posts
        if ($tags->count() === 0 || Post::count() === 0) {
            $this->command->warn('Aucun post ou tag trouvé.');
            return;
        }

        // Pour chaque post, on attache entre 1 et 6 tags aléatoires
        Post::all()->each(function ($post) use ($tags) {
            $tagIds = $tags->random(rand(1, 6))->pluck('id')->toArray();
            $post->tags()->sync($tagIds);
        });

        $this->command->info('Tags attachés aux posts avec succès.');
    }
}
