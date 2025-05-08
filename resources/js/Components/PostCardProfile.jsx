import { Link } from '@inertiajs/react';

export default function PostCardProfile({ post }) {
    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            {post.image && (
                <figure className="h-48 overflow-hidden">
                    <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </figure>
            )}
            
            <div className="card-body bg-base-200">
                <div className="flex items-center gap-2 mb-2">
                    <div className="avatar">
                        <div className="w-8 rounded-full">
                            <img 
                                src={post['author']['avatar'] || `https://ui-avatars.com/api/?name=${post.author.name}`} 
                                alt={post.author.name}
                            />
                        </div>
                    </div>
                    <span className="text-sm">{post['author']['name']}</span>
                    <span className="text-sm text-gray-500">• {post.published_at}</span>
                </div>
                
                <h2 className="card-title">
                    <Link href={route('posts.show', post.slug)} className="hover:text-primary">
                        {post.title}
                    </Link>
                </h2>
                
                <p className="mt-2 text-gray-600">{post.excerpt}</p>
                
                <div className="card-actions justify-end mt-4">
                    <Link 
                        href={route('posts.show', post.slug)} 
                        className="btn btn-primary btn-sm"
                    >
                        Lire la suite
                    </Link>
                </div>
            </div>
        </div>
    );
}