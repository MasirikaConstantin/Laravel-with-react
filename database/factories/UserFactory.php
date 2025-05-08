<?php
// database/factories/UserFactory.php

namespace Database\Factories;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    protected static ?string $password;

    public function definition(): array
    {
        $firstName = $this->faker->firstName();
        $lastName = $this->faker->lastName();
        $username = Str::slug($firstName . '.' . $lastName . '.' . Str::random(2));
        
        return [
            'name' => $firstName . ' ' . $lastName,
            'username' => $username,
            'email' => $username . '@' . $this->faker->safeEmailDomain(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'avatar' => $this->getRandomAvatar(),
            'bio' => $this->generateBio(),
            'website' => $this->faker->optional(0.3)->url(), // 30% de chance d'avoir un site web
            'birthdate' => $this->faker->optional(0.8)->dateTimeBetween('-60 years', '-18 years'), // 80% de chance d'avoir une date de naissance
            'remember_token' => Str::random(10),
            'created_at' => $this->faker->dateTimeBetween('-2 years', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-2 years', 'now'),
        ];
    }

    private function getRandomAvatar(): ?string
    {
        // 20% de chance de ne pas avoir d'avatar
        if ($this->faker->boolean(20)) {
            return null;
        }

        $avatars = [
            'https://i.pravatar.cc/300?img=' . $this->faker->numberBetween(1, 70),
            'https://i.pravatar.cc/300?u=' . $this->faker->unique()->email,
            'https://randomuser.me/api/portraits/men/' . $this->faker->numberBetween(1, 99) . '.jpg',
            'https://randomuser.me/api/portraits/women/' . $this->faker->numberBetween(1, 99) . '.jpg',
        ];

        return $this->faker->randomElement($avatars);
    }

    private function generateBio(): ?string
    {
        // 30% de chance de ne pas avoir de bio
        if ($this->faker->boolean(10)) {
            return null;
        }

        $templates = [
            "Développeur passionné par les nouvelles technologies. Amateur de café et de code propre.",
            "Designer UX/UI avec une passion pour créer des expériences utilisateur mémorables.",
            "Photographe amateur | Voyageur | Raconteur d'histoires",
            "Je partage mes pensées sur le développement web et la vie en général.",
            "Building digital products that matter. Founder @startup.",
            "Just a simple human being trying to make sense of the world.",
            $this->faker->jobTitle . " | " . $this->faker->city . " | " . implode(' ', $this->faker->words(3)),
            "Père/Mère de famille | " . $this->faker->jobTitle . " | Passionné(e) par " . $this->faker->word,
        ];

        return $this->faker->randomElement($templates);
    }

    // États supplémentaires
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    public function withWebsite(): static
    {
        return $this->state(fn (array $attributes) => [
            'website' => 'https://' . Str::slug($attributes['name']) . '.' . $this->faker->randomElement(['com', 'io', 'dev', 'net']),
        ]);
    }

    public function withLongBio(): static
    {
        return $this->state(fn (array $attributes) => [
            'bio' => implode(' ', $this->faker->paragraphs(3)),
        ]);
    }

    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Admin ' . $attributes['name'],
            'email' => 'admin.' . $attributes['email'],
            'is_admin' => true,
        ]);
    }
}