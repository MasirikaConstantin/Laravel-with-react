import List from '@/Components/List';
import BaseLayout from '@/Layouts/Base';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import PostIndex from './Posts/Index';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
  const [darkMode, setDarkMode] = useState(false);

   
     // Charger le thème
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'noire' : 'claire');
    setDarkMode(savedTheme === 'noire');
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);
  // Basculer le thème
  const toggleTheme = () => {
    const newTheme = darkMode ? 'claire' : 'noire';
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

    return (
        <>
            <Head title="Welcome" />
            <BaseLayout>
              <h2 className="text-lg font-semibold">Bienvenue sur la page d’accueil</h2>
              <p>Voici le contenu principal.</p>
            <div className='container mx-auto px-6 my-px' >
            <List/>
          {/* Bouton Dark Mode */}
          <button 
            onClick={toggleTheme} 
            className="btn btn-ghost btn-circle hover:bg-primary/20"
            aria-label={darkMode ? "Désactiver le mode sombre" : "Activer le mode sombre"}
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
            </div>

            </BaseLayout>

        </>
    );
}
