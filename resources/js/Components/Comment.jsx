import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Comment({ comment, auth, postId }) {
    // Utilisez le postId passé en prop OU celui du commentaire
    const actualPostId = postId || comment.post_id;
    
    const [showReplies, setShowReplies] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        content: '',
        parent_id: comment.id??"",
    });

    const handleReplySubmit = (e) => {
        e.preventDefault();
        post(route('comments.store', {
            post: actualPostId
        }), {
            preserveScroll: true,
            onSuccess: (response) => {
                reset('content');
                setShowReplyForm(false);
                setShowReplies(true);
                
                // Mise à jour locale du commentaire avec la nouvelle réponse
                if (response.props.comment) {
                    comment.replies = [...(comment.replies || []), response.props.comment];
                    comment.replies_count = (comment.replies_count || 0) + 1;
                }
            },
        });
    };

    return (
        <div className="pb-4 last:pb-0">
            <div className="flex gap-3">
                <Link 
                    href={route('users.show', comment.user.username)}
                    className="flex-shrink-0"
                >
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img 
                                src={comment.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user.name)}`} 
                                alt={comment.user.name}
                            />
                        </div>
                    </div>
                </Link>
                
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <Link 
                            href={route('users.show', comment.user.username)}
                            className="font-semibold hover:text-primary hover:underline"
                        >
                            {comment.user.name}
                        </Link>
                        <span className="text-sm opacity-70">{comment.created_at}</span>
                    </div>
                    
                    <p className="mt-1">{comment.content}</p>
                    
                    <div className="flex items-center gap-4 mt-2 text-sm">
                        <button className={`flex items-center gap-1 hover:text-primary ${comment.has_liked ? 'text-primary' : ''}`}>
                            <svg className="w-4 h-4" fill={comment.has_liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            <span>{comment.likes_count || 0}</span>
                        </button>
                        
                        {comment.replies && comment.replies.length > 0 && (
                            <button 
                                onClick={() => setShowReplies(!showReplies)}
                                className="flex items-center gap-1 hover:text-primary"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                <span>{comment.replies_count || comment.replies.length} réponses</span>
                            </button>
                        )} 
                        
                        {auth.user && (
                            <button 
                                onClick={() => setShowReplyForm(!showReplyForm)}
                                className="hover:text-primary hover:underline"
                            >
                                Répondre
                            </button>
                        )}
                    </div>

                    {showReplyForm && auth.user && (
                        <form className="mt-4 flex gap-3" onSubmit={handleReplySubmit}>
                            <div className="avatar flex-shrink-0">
                                <div className="w-8 rounded-full">
                                    <img 
                                        src={auth.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(auth.user.name)}`} 
                                        alt={auth.user.name}
                                    />
                                </div>
                            </div>
                            
                            <div className="flex-1 flex gap-2">
                                <input
                                    type="text"
                                    name="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    placeholder="Écrire une réponse..."
                                    className="input input-bordered input-sm w-full"
                                    required
                                />
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-sm"
                                    disabled={processing}
                                >
                                    {processing ? 'Envoi...' : 'Envoyer'}
                                </button>
                            </div>
                        </form>
                    )}
                    
                    {/* Affichage récursif des réponses */}
                    {showReplies && comment.replies && comment.replies.length > 0 && (
                        <div className="mt-3 pl-4 border-l-2 border-base-200 space-y-3">
                            {comment.replies.map((reply) => (
                                <Comment 
                                    key={reply.id} 
                                    comment={reply} 
                                    auth={auth} 
                                    postId={actualPostId} 
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}