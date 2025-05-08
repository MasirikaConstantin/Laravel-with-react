<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Database\Factories\CommentaireFactory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //User::factory(50)->create();
        //Post::factory(550)->create();
        //CommentaireFactory::factory(550)->create();
        $this->call([
          //  TagSeeder::class,
            CommentaireSeeder::class, // Ajouté ici
            // D'autres seeders...
        //UpdatePostImagesSeeder::class,
        ]);
    }
}
