<?php

use App\Http\Controllers\CommentaireController;
use App\Http\Controllers\MonProfileController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name("home");
Route::middleware(['auth', 'verified'])->name('mon.')->group(function () {
    // Route pour la page d'édition du profil
    Route::get('/profile', [MonProfileController::class, 'edit'])->name('profile.edit');
    
    // Route pour la mise à jour du profil
    Route::patch('/profile', [MonProfileController::class, 'update'])->name('profile.update');
    
    // Route pour la mise à jour de l'avatar
    Route::post('/profile/avatar', [MonProfileController::class, 'updateAvatar'])->name('profile.avatar.update');
});
Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
Route::get('/posts/{post:slug}', [PostController::class, 'show'])->name('posts.show');
Route::get('/users/{user:username}', [UserController::class, 'show'])->name('users.show');
Route::post('/posts/{post}/comments', [CommentaireController::class, 'store'])
    ->name('comments.store')
    ->middleware('auth'); // Protection par auth si nécessaire
    Route::get('/search', [SearchController::class, 'search'])->name('search');
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

/*Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});*/

require __DIR__.'/auth.php';
