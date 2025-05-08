import { Link } from '@inertiajs/react';
import BaseLayout from '@/Layouts/Base';
import Pagination from '@/Components/Pagination';
import CommentItem from '@/Components/CommentItem';
import PostCardProfile from '@/Components/PostCardProfile';

export default function UserShow({ user, comments, posts = [], auth }) {
    return (
        <BaseLayout auth={auth}>
            <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
                {/* Profil utilisateur */}
                <div className="card bg-base-200 shadow-lg mb-6">
                    <div className="card-body">
                        <div className="flex flex-col md:flex-row items-start gap-6">
                            <div className="avatar">
                                <div className="w-24 rounded-full">
                                    <img
                                        src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
                                        alt={user.name}
                                    />
                                </div>
                            </div>

                            <div className="flex-1">
                                <h1 className="text-2xl font-bold">{user.name}</h1>
                                <p className="text-base-content/60">@{user.username}</p>

                                {user.bio && (
                                    <p className="mt-3 text-base-content">{user.bio}</p>
                                )}

                                <div className="flex gap-6 mt-4 text-sm">
                                    <div>
                                        <span className="font-semibold">{user.posts_count}</span>
                                        <span className="text-base-content/60 ml-1">Posts</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold">{user.comments_count}</span>
                                        <span className="text-base-content/60 ml-1">Commentaires</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold">{user.likes_count}</span>
                                        <span className="text-base-content/60 ml-1">Likes</span>
                                    </div>
                                </div>

                                {(user.website || user.birthdate) && (
                                    <div className="mt-4 text-sm text-base-content/60 space-y-1">
                                        {user.website && (
                                            <div className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                                </svg>
                                                <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                    {user.website.replace(/^https?:\/\//, '')}
                                                </a>
                                            </div>
                                        )}
                                        {user.birthdate && (
                                            <div className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>Né(e) le {new Date(user.birthdate).toLocaleDateString('fr-FR')}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid Posts / Commentaires */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Posts */}
                    <div className="space-y-4 ">
                        <h2 className="text-xl font-semibold mb-2">Posts récents</h2>
                        {posts.length === 0 ? (
                            <div className="alert alert-info">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>Aucun post</span>
                            </div>
                        ) : (
                            <div className="space-y-4 ">
                                {posts.map(post => (
                                    
                                    <PostCardProfile key={post.id} post={post} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Commentaires */}
                    <div className="card bg-base-200 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title">Commentaires récents</h2>

                            {comments.data.length === 0 ? (
                                <div className="alert alert-info">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span>Aucun commentaire pour le moment</span>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {comments.data.map(comment => (
                                        <CommentItem
                                            key={comment.id}
                                            comment={comment}
                                            auth={auth}
                                        />
                                    ))}
                                </div>
                            )}

                            <div className="mt-6">
                                <Pagination
                                    links={comments.links}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}