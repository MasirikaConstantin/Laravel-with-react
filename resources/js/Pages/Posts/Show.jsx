import Comment from '@/Components/Comment';
import CommentForm from '@/Components/CommentForm';
import Layout from '@/Layouts/Base';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function PostShow({ post }) {
    const [showAllComments, setShowAllComments] = useState(false);
    const { auth } = usePage().props;
    
    const displayedComments = showAllComments 
        ? post.comments 
        : post.comments.slice(0, 3);

    return (
        <Layout>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.meta} />
            </Head>

            <div className="container mx-auto px-4 py-8 ">
                <div className="flex flex-col lg:flex-row gap-8 ">
                    {/* Contenu principal */}
                    <div className="lg:w-2/3 ">
                        <article className="card  shadow-md p-6 mb-8 bg-base-200">
                            <header className="mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <Link 
                                        href={route('users.show', post.author.username)}
                                        className="flex items-center gap-3 group"
                                    >
                                        <div className="avatar">
                                            <div className="w-12 rounded-full">
                                                <img 
                                                    src={post.author.avatar || `https://ui-avatars.com/api/?name=${post.author.name}`} 
                                                    alt={post.author.name}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-semibold group-hover:text-primary transition">
                                                {post.author.name}
                                            </p>
                                            <time 
                                                dateTime={post.published_at.datetime}
                                                className="text-sm text-gray-500"
                                            >
                                                {post.published_at.formatted}
                                            </time>
                                        </div>
                                    </Link>
                                    
                                    <div className="flex gap-2">
                                        {post.tags?.map(tag => (
                                            <Link 
                                                key={tag.id}
                                                className="badge badge-outline hover:badge-primary transition"
                                            >
                                                #{tag.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                
                                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                            </header>

                            {post.image && (
                                <figure className="mb-6 rounded-lg overflow-hidden">
                                    <img 
                                        src={post.image} 
                                        alt={post.title} 
                                        className="w-full h-auto max-h-[32rem] object-cover"
                                    />
                                </figure>
                            )}

                            {post.video_url && (
                                <div className="aspect-w-16 aspect-h-9 mb-6">
                                    <iframe 
                                        src={post.video_url} 
                                        className="w-full h-[32rem] rounded-lg"
                                        allowFullScreen
                                    />
                                </div>
                            )}

                            <div 
                                className="prose max-w-none mb-8  shadow-lg shadow-base-100 px-4 py-4"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            <div className="flex items-center justify-between border-t border-b border-base-300 py-4 my-6">
                                <div className="flex items-center gap-6 ">
                                    <button className="btn btn-ghost btn-sm gap-2 bg-base-100">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                        </svg>
                                        <span>{post.stats.likes_count}</span>
                                    </button>
                                    
                                    <button className="btn btn-ghost btn-sm gap-2 bg-base-100">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        <span>{post.stats.comments_count}</span>
                                    </button>


                                    {post.tags && post.tags.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {post.tags?.map((tag) => {
                                                    // Génère une couleur aléatoire basée sur le hash du nom du tag
                                                    const colorClasses = [
                                                        'badge-primary',
                                                        'badge-secondary',
                                                        'badge-accent',
                                                        'badge-info',
                                                        'badge-success',
                                                        'badge-warning',
                                                        'badge-error',
                                                        'badge-ghost'
                                                    ];
                                                    const colorIndex = Math.abs(
                                                        tag.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
                                                    ) % colorClasses.length;
                                                    
                                                    return (
                                                        <Link 
                                                            key={tag.id}
                                                            className={`badge ${colorClasses[colorIndex]} hover:opacity-80 transition-opacity`}
                                                        >
                                                            {tag.name}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}


                                </div>
                                
                                <div className="text-sm ">
                                    {post.stats.views_count} vues
                                </div>
                            </div>
                        </article>

                        {/* Section commentaires */}
                        <section className="card bg-base-200 shadow-md p-6 mb-8">
                            <h2 className="text-xl font-bold mb-6">Commentaires ({post.all_comments_count})</h2>
                            
                            {auth.user && (
                                <CommentForm postId={post.id} />
                            )}
                            {!auth.user && (
                                <div className="relative mb-5 h-12">
                                    <textarea
                                    type="text"
                                    readOnly
                                    defaultValue="Connectez - vous pour placer un commentaire"
                                    className="textarea textarea-error w-full p-3 pr-16 border rounded-lg resize-none transition-all absolute top-0 left-0"
                                    rows= "2"
                                    />
                                </div>
                            )}
                            
                            <div className="space-y-6 mt-6">
                                {displayedComments?.map(comment => (
                                    <Comment 
                                        key={comment.id}
                                        comment={comment}
                                        auth={auth}
                                    />
                                ))}
                            </div>
                            
                            {post.all_comments_count > 3 && !showAllComments && (
                                <button 
                                    onClick={() => setShowAllComments(true)}
                                    className="btn btn-link mt-4"
                                >
                                    Voir tous les commentaires ({post.all_comments_count})
                                </button>
                            )}
                        </section>
                    </div>
                    
                    {/* Sidebar avec articles similaires */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-4 space-y-6">
                            {post.related_posts.length > 0 && (
                                <div className="card bg-base-200 shadow-md p-6">
                                    <h3 className="text-xl font-bold mb-4">Articles similaires</h3>
                                    <div className="space-y-4">
                                        {post.related_posts?.map(related => (
                                            <Link 
                                                key={related.id}
                                                href={route('posts.show', related.slug)}
                                                className="block group"
                                            >
                                                <div className="flex gap-3">
                                                    {related.image && (
                                                        <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                                                            <img 
                                                                src={related.image} 
                                                                alt={related.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <h4 className="font-semibold group-hover:text-primary transition">
                                                            {related.title}
                                                        </h4>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <div className="avatar">
                                                                <div className="w-6 rounded-full">
                                                                    <img 
                                                                        src={related.author.avatar || `https://ui-avatars.com/api/?name=${related.author.name}`} 
                                                                        alt={related.author.name}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <span className="text-sm text-gray-600">
                                                                {related.author.name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                

                                                <div className="flex gap-1 mt-1">
                                                    {related.tags?.map(tag => (
                                                        <div className="badge badge-xs badge-info"
                                                        key={tag.id}> 
                                                            
                                                            #{tag.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {/* Widget auteur */}
                            <div className="card bg-base-200 shadow-md p-6">
                                <h3 className="text-xl font-bold mb-4">À propos de l'auteur</h3>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="avatar">
                                        <div className="w-16 rounded-full">
                                            <img 
                                                src={post.author.avatar || `https://ui-avatars.com/api/?name=${post.author.name}`} 
                                                alt={post.author.name}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{post.author.name}</h4>
                                        <p className="text-sm text-gray-600">@{post.author.username}</p>
                                    </div>
                                </div>
                                {post.author.bio && (
                                    <p className="text-opacity-1">{post.author.bio}</p>
                                )}
                                <Link 
                                    href={route('users.show', post.author.username)}
                                    className="btn btn-outline btn-sm mt-4"
                                >
                                    Voir le profil
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}