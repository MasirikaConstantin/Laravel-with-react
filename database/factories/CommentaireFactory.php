<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentaireFactory extends Factory
{
    public function definition()
    {
        // 80% de chance d'être un commentaire racine, 20% une réponse
        $isReply = $this->faker->boolean(20);
        
        return [
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'post_id' => Post::inRandomOrder()->first()->id ?? Post::factory(),
            'parent_id' => $isReply ? 
                function() {
                    return \App\Models\Commentaire::inRandomOrder()
                        ->whereNull('parent_id')
                        ->first()?->id;
                } : null,
            'content' => $this->generateCommentContent(),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }

    private function generateCommentContent(): string
    {
        $sentences = $this->faker->sentences(rand(1, 3));
        
        // 30% de chance d'ajouter une mention
        if ($this->faker->boolean(30)) {
            $username = User::inRandomOrder()->first()->username;
            $sentences[0] = "@{$username} " . $sentences[0];
        }
        
        // 20% de chance d'ajouter un emoji
        if ($this->faker->boolean(20)) {
            $emojis = ['😀', '👍', '❤️', '🎉', '🤔'];
            $sentences[] = $this->faker->randomElement($emojis);
        }
        
        return implode(' ', $sentences);
    }

    // États supplémentaires
    public function reply()
    {
        return $this->state(function (array $attributes) {
            return [
                'parent_id' => \App\Models\Commentaire::inRandomOrder()
                    ->whereNull('parent_id')
                    ->first()?->id,
            ];
        });
    }

    public function forPost($postId)
    {
        return $this->state(function (array $attributes) use ($postId) {
            return [
                'post_id' => $postId,
            ];
        });
    }

    public function byUser($userId)
    {
        return $this->state(function (array $attributes) use ($userId) {
            return [
                'user_id' => $userId,
            ];
        });
    }
}
