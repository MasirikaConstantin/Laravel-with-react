<?php

namespace App\Http\Controllers;

use App\Models\Commentaire;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentaireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Post $post, Request $request)
{
    $validated = $request->validate([
        'content' => 'required|string|min:5|max:2000',
        'parent_id' => 'nullable',
    ]);

    $comment = $post->comments()->create([
        'content' => $validated['content'],
        'parent_id' => $validated['parent_id'],
        'user_id' => auth()->id(),
    ]);

    // Chargez toutes les relations nécessaires
    $comment->load(['user', 'replies']);

    return back()->with([
        'comment' => $comment->load(['user', 'replies']),

        'message' => 'Commentaire ajouté avec succès',
        'new_counts' => [
            'comments_count' => $post->comments()->count(),
            'replies_count' => $post->comments()->where('parent_id', $validated['parent_id'] ?? null)->count(),
        ]
    ]);
}

    /**
     * Display the specified resource.
     */
    public function show(Commentaire $commentaire)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Commentaire $commentaire)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Commentaire $commentaire)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Commentaire $commentaire)
    {
        //
    }
}
