<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');
        
        if (empty($query) || strlen($query) < 3) {
            return response()->json(['results' => []]);
        }
        
        $posts = Post::with('user')
            ->where('is_published', true)
            ->where(function($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                  ->orWhere('content', 'like', "%{$query}%");
            })
            ->orderBy('published_at', 'desc')
            ->take(10)
            ->get()
            ->map(function($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'excerpt' => strlen($post->content) > 150 ? substr($post->content, 0, 150) . '...' : $post->content,
                    'image' => $post->image,
                    'video_url' => $post->video_url,
                    'published_at' => $post->published_at->format('d/m/Y'),
                    'user' => [
                        'id' => $post->user->id,
                        'name' => $post->user->name,
                        'avatar' => $post->user->avatar ?? '/images/default-avatar.png',
                    ],
                    'has_image' => !is_null($post->image),
                    'has_video' => !is_null($post->video_url),
                ];
            });
            
        return response()->json(['results' => $posts]);
    }
}