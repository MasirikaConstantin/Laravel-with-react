import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function CommentForm({ postId, parentId }) {
    const { data, setData, post, processing, errors } = useForm({
        content: '',
        parent_id: parentId || "",

    });
    
    const [isExpanded, setIsExpanded] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('comments.store', postId), {
            preserveScroll: true,
            onSuccess: () => setData('content', ''),
        });
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div className={`relative mb-5 ${isExpanded ? 'min-h-[120px]' : 'h-12'}`}>
                <textarea
                    id="content"
                    name="content"
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    onFocus={() => setIsExpanded(true)}
                    className={ ` textarea w-full p-3 pr-16 border rounded-lg resize-none transition-all absolute top-0 left-0 ${
                        isExpanded ? 'h-full' : 'h-12'
                    }`}
                    placeholder="Ajouter un commentaire..."
                    rows={isExpanded ? 3 : 1}
                />
                
                {isExpanded && (
                    <div className="absolute bottom-3 right-3 flex gap-2">
                        <button
                            type="button"
                            onClick={() => setIsExpanded(false)}
                            className="btn btn-ghost btn-sm"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={processing || !data.content.trim()}
                            className="btn btn-primary btn-sm"
                        >
                            Publier
                        </button>
                    </div>
                )}
            </div>
            
            {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content}</p>
            )}
        </form>
    );
}