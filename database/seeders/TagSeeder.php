<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaultTags = [
            ['name' => 'Technologie', 'slug' => 'technologie'],
            ['name' => 'Programmation', 'slug' => 'programmation'],
            ['name' => 'Laravel', 'slug' => 'laravel'],
            ['name' => 'VueJS', 'slug' => 'vuejs'],
            ['name' => 'JavaScript', 'slug' => 'javascript'],
            ['name' => 'PHP', 'slug' => 'php'],
            ['name' => 'Design', 'slug' => 'design'],
            ['name' => 'UI/UX', 'slug' => 'ui-ux'],
            ['name' => 'Mobile', 'slug' => 'mobile'],
            ['name' => 'Web', 'slug' => 'web'],
            ['name' => 'Backend', 'slug' => 'backend'],
            ['name' => 'Frontend', 'slug' => 'frontend'],
            ['name' => 'DevOps', 'slug' => 'devops'],
            ['name' => 'SEO', 'slug' => 'seo'],
            ['name' => 'Réseaux', 'slug' => 'reseaux'],
        ];

        foreach ($defaultTags as $tag) {
            Tag::create($tag);
        }
    }
}
