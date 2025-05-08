<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
class MonProfileController extends Controller
{
    public function edit()
    {
        return inertia('MonProfile/Edit', [
            'user' => Auth::user(),
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
            'username' => 'required|string|max:255|unique:users,username,'.$user->id,
            'bio' => 'nullable|string|max:500',
            'website' => 'nullable|url|max:255',
            'birthdate' => 'nullable|date',
            'password' => ['nullable', 'confirmed', Password::defaults()],
        ]);

        // Mise à jour des données de base
        $user->fill($request->only([
            'name', 'email', 'username', 'bio', 'website', 'birthdate'
        ]));

        // Mise à jour du mot de passe si fourni
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return back()->with('success', 'Profil mis à jour avec succès');
    }

    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = $request->user();
        
        // Supprimer l'ancien avatar s'il existe
        if ($user->avatar) {
            Storage::delete('public/avatars/'.$user->avatar);
        }

        // Stocker le nouvel avatar
        $path = $request->file('avatar')->store('avatars','public');
        //$path = $request->file('image')->store('posts', 'public');

        //$filename = basename($path);

        $user->avatar = $path;
        $user->save();

        return back()->with('success', 'Avatar mis à jour avec succès');
    }
}
