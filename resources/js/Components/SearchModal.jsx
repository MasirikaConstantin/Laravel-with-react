import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import axios from 'axios';

export default function SearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Réinitialiser la recherche quand le modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [isOpen]);

  // Fermer le modal avec Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Effectuer la recherche
  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (searchQuery.trim().length > 2) {
        setIsSearching(true);
        try {
          const response = await axios.get(route('search'), {
            params: { query: searchQuery }
          });
          setSearchResults(response.data.results);
        } catch (error) {
          console.error('Erreur lors de la recherche:', error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const navigateToPost = (slug) => {
    onClose();
    router.visit(route('posts.show', slug));
  };

  if (!isOpen) return null;

  return (
    <dialog id="searchModal" className="modal modal-open">
      <div className="modal-box w-11/12 max-w-3xl relative">
        <button 
          onClick={onClose} 
          className="btn btn-sm btn-circle absolute right-2 top-2 hover:bg-error/20 hover:text-error"
        >
          ✕
        </button>
        
        <h3 className="font-bold text-2xl mb-6">Recherche avancée</h3>
        
        <div className="flex gap-2 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Tapez votre recherche..."
              className="input input-bordered w-full pl-12 text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              {isSearching ? (
                <span className="loading loading-spinner loading-sm text-primary"></span>
              ) : (
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </div>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {isSearching ? (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : searchResults && searchResults.length > 0 ? (
            <div className="divide-y divide-base-300">
              {searchResults.map((post) => (
                <div key={post.id} className="p-4 hover:bg-base-200 rounded-lg transition-colors duration-150  bg-base-200 mt-2">
                  <div className="flex items-start gap-4">
                    {post.has_image && (
                      <div className="flex-shrink-0">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-20 h-20 object-cover rounded-lg shadow-sm"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-lg">{post.title}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">{post.published_at}</span>
                          {post.has_video && (
                            <span className="badge badge-sm badge-primary">Vidéo</span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1" 
                         dangerouslySetInnerHTML={{ __html: post.excerpt }}>
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center space-x-2">
                          <div className="avatar">
                            <div className="w-6 h-6 rounded-full">
                              <img src={post.user.avatar} alt={post.user.name} />
                            </div>
                          </div>
                          <span className="text-sm font-medium">{post.user.name}</span>
                        </div>
                        <button 
                          onClick={() => navigateToPost(post.slug)}
                          className="btn btn-sm btn-primary"
                        >
                          Voir plus
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery.length > 2 ? (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium">Aucun résultat trouvé</h3>
              <p className="mt-1 text-gray-500">Essayez avec d'autres termes de recherche</p>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Entrez au moins 3 caractères pour commencer la recherche</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span 
                  className="badge badge-outline cursor-pointer hover:badge-primary transition-all duration-200" 
                  onClick={() => setSearchQuery('Laravel')}
                >
                  Laravel
                </span>
                <span 
                  className="badge badge-outline cursor-pointer hover:badge-primary transition-all duration-200" 
                  onClick={() => setSearchQuery('React')}
                >
                  React
                </span>
                <span 
                  className="badge badge-outline cursor-pointer hover:badge-primary transition-all duration-200" 
                  onClick={() => setSearchQuery('Inertia')}
                >
                  Inertia
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>Fermer</button>
      </form>
    </dialog>
  );
}