import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Base';
import PostCard from '@/Components/PostCard';

export default function PostIndex({ posts, meta }) {
    return (
        <Layout>
            <Head>
                <title>{meta.title}</title>
                <meta name="description" content={meta.description} />
            </Head>

            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-center mb-12">
                    Nos derniers articles
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {posts.data.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>

                {/* Pagination */}
                {posts.links && (
                    <div className="flex justify-center mt-12">
                        <nav className="join">
                            {posts.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`join-item btn ${link.active ? 'btn-active' : ''} ${!link.url ? 'btn-disabled' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </Layout>
    );
}