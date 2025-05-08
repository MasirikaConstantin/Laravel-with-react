<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::query()
            ->with(['user:id,name,avatar'])
            ->where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->paginate(12)
            ->through(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'excerpt' => str()->limit(strip_tags($post->content), 200),
                    //'image' => $post->image ? asset('storage/'.$post->image) : null,
                    'image' => $post->image ? $post->image : null,
                    'video_url' => $post->video_url,
                    'published_at' => $post->published_at?->diffForHumans(),
                    'author' => $post->user,
                ];
            });

        return Inertia::render('Posts/Index', [
            'posts' => $posts,
            'meta' => [
                'title' => 'Derniers articles',
                'description' => 'Découvrez nos derniers articles et tutoriels',
            ],
        ]);
    }

    public function show(Post $post)
{
    if (!$post->is_published) {
        abort(404);
    }

    // Charger les relations nécessaires de façon optimisée
    $post->load([
        'user',
        'tags',
        'likes'
    ])->loadCount('comments', 'likes', 'views');

    // Charger les commentaires racines avec leurs réponses récursivement
    $comments = $post->comments()
        ->whereNull('parent_id')
        ->with([
            'user',
            'likes',
            'replies.user',
            'replies.likes',
            'replies.replies.user',
            'replies.replies.likes',
            'replies.replies.replies.user', // Supporte jusqu'à 3 niveaux d'imbrication
        ])
        ->withCount(['likes', 'replies'])
        ->latest()
        ->get();

    // Articles similaires (par tags)
    $relatedPosts = Post::query()
        ->where('is_published', true)
        ->where('id', '!=', $post->id)
        ->whereHas('tags', function ($query) use ($post) {
            $query->whereIn('tags.id', $post->tags->pluck('id'));
        })
        ->with(['user', 'tags'])
        ->withCount('comments', 'likes')
        ->inRandomOrder()
        ->limit(3)
        ->get();

    return Inertia::render('Posts/Show', [
        'post' => [
            'id' => $post->id,
            'title' => $post->title,
            'slug' => $post->slug,
            'content' => $post->content,
            'image' => $post->image,
            'video_url' => $post->video_url,
            "meta" => Str::limit(strip_tags($post->content), 160),
            'published_at' => [
                'formatted' => $post->published_at?->format('d M Y'),
                'datetime' => $post->published_at?->toISOString(),
            ],
            'stats' => [
                'comments_count' => $post->comments_count,
                'likes_count' => $post->likes_count,
                'views_count' => $post->views_count,
            ],
            'author' => [
                'id' => $post->user->id,
                'name' => $post->user->name,
                'username' => $post->user->username,
                'avatar' => $post->user->avatar,
                'bio' => $post->user->bio,
            ],
            'tags' => $post->tags->map(fn ($tag) => [
                'id' => $tag->id,
                'name' => $tag->name,
                'slug' => $tag->slug,
            ]),
            'comments' => $this->formatComments($comments),
            'has_liked' => auth()->check() ? $post->likes->contains('user_id', auth()->id()) : false,
            'all_comments_count' => $post->comments_count,
            'related_posts' => $relatedPosts->map(function ($related) {
                return [
                    'id' => $related->id,
                    'title' => $related->title,
                    'slug' => $related->slug,
                    'excerpt' => str()->limit(strip_tags($related->content), 150),
                    'published_at' => $related->published_at?->format('d M Y'),
                    'image' => $related->image ?: null,
                    'author' => [
                        'id' => $related->user->id,
                        'name' => $related->user->name,
                        'username' => $related->user->username,
                        'avatar' => $related->user->avatar,
                        'bio' => $related->user->bio,
                    ],
                    'tags' => $related->tags->map(function ($tag) {
                        return [
                            'id' => $tag->id,
                            'name' => $tag->name,
                        ];
                    })->toArray(),
                ];
            }),
            'comments_count' => $post->comments_count,
        ],
    ]);
}

// Méthode pour formatter les commentaires de façon récursive
private function formatComments($comments)
{
    return $comments->map(function ($comment) {
        $formattedComment = [
            'id' => $comment->id,
            'content' => $comment->content,
            'post_id' => $comment->post_id,
            'created_at' => $comment->created_at->diffForHumans(),
            'user' => [
                'id' => $comment->user->id,
                'name' => $comment->user->name,
                'avatar' => $comment->user->avatar,
                'username' => $comment->user->username,
            ],
            'replies_count' => $comment->replies_count ?? $comment->replies->count(),
            'likes_count' => $comment->likes_count ?? $comment->likes->count(),
            'has_liked' => auth()->check() ? $comment->likes->contains('user_id', auth()->id()) : false,
        ];

        // Ajouter les réponses s'il y en a
        if ($comment->replies && $comment->replies->count() > 0) {
            $formattedComment['replies'] = $this->formatComments($comment->replies);
        } else {
            $formattedComment['replies'] = [];
        }

        return $formattedComment;
    });
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
