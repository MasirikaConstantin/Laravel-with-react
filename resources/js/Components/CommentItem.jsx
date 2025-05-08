import { Link } from '@inertiajs/react';
import { useState } from 'react';
import CommentForm from '@/Components/CommentForm';

export default function CommentItem({ comment, auth }) {
    const [showReplies, setShowReplies] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);

    return (
        <div className="border-b border-base-200 pb-6 last:border-0 last:pb-0">
            <div className="flex gap-4">
                <Link href={route('users.show', comment.user.username)} className="flex-shrink-0">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img 
                                src={comment.user.avatar || `https://ui-avatars.com/api/?name=${comment.user.name}`} 
                                alt={comment.user.name}
                            />
                        </div>
                    </div>
                </Link>

                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <Link
                            href={route('users.show', comment.user.username)}
                            className="font-semibold hover:text-primary transition"
                        >
                            {comment.user.name}
                        </Link>
                        <span className="text-xs text-base-content/50">{comment.created_at}</span>
                    </div>

                    <Link
                        href={route('posts.show', comment.post.slug)}
                        className="text-sm text-base-content/50 hover:text-primary block mt-1"
                    >
                        Sur : {comment.post.title}
                    </Link>

                    <p className="mt-2 text-base-content">{comment.content}</p>

                    <div className="flex items-center gap-4 mt-3 text-sm">
                        {/* Like button */}
                        <button
                            className={`btn btn-xs gap-1 px-2 ${comment.has_liked ? 'btn-error text-white' : 'btn-ghost hover:text-primary'}`}
                        >
                            <svg className="w-4 h-4" fill={comment.has_liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>{comment.likes_count}</span>
                        </button>

                        {/* Toggle replies */}
                        {comment.replies_count > 0 && (
                            <button
                                onClick={() => setShowReplies(!showReplies)}
                                className="btn btn-xs btn-ghost gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                {showReplies ? 'Masquer' : 'Afficher'} ({comment.replies_count})
                            </button>
                        )}

                        {/* Reply button */}
                        {auth.user && (
                            <button
                                onClick={() => setShowReplyForm(!showReplyForm)}
                                className="btn btn-xs btn-ghost"
                            >
                                Répondre
                            </button>
                        )}
                    </div>

                    {/* Reply Form */}
                    {showReplyForm && (
                        <div className="mt-3">
                            <CommentForm
                                postId={comment.post.id}
                                parentId={comment.id}
                                onSuccess={() => setShowReplyForm(false)}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Replies */}
            {showReplies && comment.replies.length > 0 && (
                <div className="mt-4 pl-4 border-l-2 border-base-300 space-y-4">
                    {comment.replies.map(reply => (
                        <div key={reply.id} className="flex gap-3">
                            <Link href={route('users.show', reply.user.username)} className="flex-shrink-0">
                                <div className="avatar">
                                    <div className="w-8 rounded-full">
                                        <img
                                            src={reply.user.avatar || `https://ui-avatars.com/api/?name=${reply.user.name}`}
                                            alt={reply.user.name}
                                        />
                                    </div>
                                </div>
                            </Link>

                            <div>
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={route('users.show', reply.user.username)}
                                        className="text-sm font-semibold hover:text-primary"
                                    >
                                        {reply.user.name}
                                    </Link>
                                    <span className="text-xs text-base-content/50">{reply.created_at}</span>
                                </div>
                                <p className="text-sm mt-1">{reply.content}</p>
                            </div>
                        </div>
                    ))}

                    {comment.replies_count > comment.replies.length && (
                        <Link
                            href={route('comments.show', comment.id)}
                            className="text-sm text-primary hover:underline inline-block mt-2"
                        >
                            Voir toutes les réponses
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}
