<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use Illuminate\Support\Str;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $title = $this->faker->sentence(rand(3, 8));
        
        return [
            'user_id' => User::factory(),
            'title' => $title,
            'slug' => Str::slug($title) . '-' . Str::lower(Str::random(6)),
            'content' => $this->generatePostContent(),
            'image' => $this->faker->optional(0.7)->imageUrl(800, 600, 'technics'), // 70% de chance d'avoir une image
            'video_url' => $this->faker->optional(0.2)->url, // 20% de chance d'avoir une vidéo
            'is_published' => $this->faker->boolean(90), // 90% de chance d'être publié
            'published_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }

    private function generatePostContent(): string
    {
        $paragraphs = $this->faker->paragraphs(rand(3, 10));
        $content = '';
        
        foreach ($paragraphs as $paragraph) {
            $content .= "<p>{$paragraph}</p>";
            
            // Ajouter occasionnellement un sous-titre
            if ($this->faker->boolean(20)) {
                $content .= "<h3>{$this->faker->sentence}</h3>";
            }
            
            // Ajouter occasionnellement une liste
            if ($this->faker->boolean(15)) {
                $items = $this->faker->words(rand(3, 7));
                $content .= "<ul><li>" . implode("</li><li>", $items) . "</li></ul>";
            }
        }
        
        return $content;
    }

    // États supplémentaires pour des cas spécifiques
    public function unpublished()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_published' => false,
                'published_at' => null,
            ];
        });
    }

    public function withVideo()
    {
        return $this->state(function (array $attributes) {
            return [
                'video_url' => 'https://www.youtube.com/watch?v=' . Str::random(11),
                'image' => null,
            ];
        });
    }

    public function withImage()
    {
        return $this->state(function (array $attributes) {
            return [
                'image' => $this->faker->imageUrl(800, 600, 'technics'),
                'video_url' => null,
            ];
        });
    }
}
