import { useState, useEffect, useRef } from 'react';
//import { a } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
import ModalLogin from "@/Components/ModalLogin"
import { Link } from '@inertiajs/react';
import SearchModal from '@/Components/SearchModal';

const Header = () => {
  //const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef(null);

  // Animation du header au scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Effet visuel de halo autour du logo
  useEffect(() => {
    const logo = headerRef.current?.querySelector('.logo');
    if (!logo) return;

    const handleMouseMove = (e) => {
      const rect = logo.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      logo.style.setProperty('--x', `${x}px`);
      logo.style.setProperty('--y', `${y}px`);
    };

    logo.addEventListener('mousemove', handleMouseMove);
    return () => logo.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
      }
    };

    if (searchModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchModalOpen]);
  
// Effet visuel de halo autour du logo
useEffect(() => {
  const logo = headerRef.current?.querySelector('.logo');
  if (!logo) return;

  const handleMouseMove = (e) => {
    const rect = logo.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    logo.style.setProperty('--x', `${x}px`);
    logo.style.setProperty('--y', `${y}px`);
  };

  logo.addEventListener('mousemove', handleMouseMove);
  return () => logo.removeEventListener('mousemove', handleMouseMove);
}, []);

// Charger le thème
useEffect(() => {
  const savedTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'noire' : 'claire');
  setDarkMode(savedTheme === 'noire');
  document.documentElement.setAttribute('data-theme', savedTheme);
}, []);




  return (
    <>
      {/* Header Principal avec animations */}
      <header 
        ref={headerRef}
        className={`navbar bg-base-200 shadow-lg sticky top-0 z-50 px-0 sm:px-4 rounded-none sm:rounded-box transition-transform duration-300 ease-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'hsla(var(--b2) / 0.85)'
        }}
      >
        <div className="navbar-start w-full sm:w-auto mr-6">
          {/* Menu Mobile (Drawer) */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden px-3 hover:bg-primary/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link                 href={route('home')}
 className="active:bg-primary/20">Accueil</Link></li>
              <li><a to="/actualites" className="active:bg-primary/20">Actualités</a></li>
              <li><a to="/categories" className="active:bg-primary/20">Catégories</a></li>
              <li><Link href={route('posts.index')} className="active:bg-primary/20">Tous les Posts</Link></li>
              <li><a to="/abonnements" className="active:bg-primary/20">Abonnements</a></li>
            </ul>
          </div>

          {/* Logo avec effet visuel */}
          <Link
            href={route('home')} 
            className="logo btn btn-ghost normal-case text-xl px-2 mx-auto sm:mx-0 relative overflow-hidden me-6"
            style={{
              '--x': '0px',
              '--y': '0px',
              '--glow-opacity': '0'
            }}
            onMouseEnter={() => {
              const logo = headerRef.current?.querySelector('.logo');
              if (logo) logo.style.setProperty('--glow-opacity', '0.1');
            }}
            onMouseLeave={() => {
              const logo = headerRef.current?.querySelector('.logo');
              if (logo) logo.style.setProperty('--glow-opacity', '0');
            }}
          >
            <span className="text-primary transition-all duration-300 hover:text-primary-focus">Mascode</span>
            <span className="transition-all duration-300 hover:text-base-content/80">Actualités</span>
            <span 
              className="absolute inset-0 pointer-events-none opacity-[var(--glow-opacity)] transition-opacity duration-300"
              style={{
                background: `radial-gradient(300px circle at var(--x) var(--y), hsl(var(--p) / 0.4), transparent 70%)`
              }}
            />
          </Link>
        </div>

        {/* Navigation Desktop */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            <li>
              <Link  href={route('home')} className="hover:bg-primary/10 hover:text-primary rounded-btn transition-all duration-200 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Accueil
              </Link>
            </li>
            <li>
              <a 
                to="/actualites" 
                className="hover:bg-primary/10 hover:text-primary rounded-btn transition-all duration-200 flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Actualités
              </a>
            </li>
            <li>
              <a 
                to="/categories" 
                className="hover:bg-primary/10 hover:text-primary rounded-btn transition-all duration-200 flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Catégories
              </a>
            </li>
            <li>
              <Link 
                href={route('posts.index')}
                className="hover:bg-primary/10 hover:text-primary rounded-btn transition-all duration-200 flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Tous
              </Link>
            </li>
          </ul>
        </div>

        {/* Boutons Header Droite */}
        <div className="navbar-end gap-1 sm:gap-2">
          {/* Bouton Recherche Mobile */}
          <button 
            className="btn btn-ghost btn-circle sm:hidden hover:bg-primary/20"
            onClick={() => setSearchModalOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Barre de Recherche Desktop */}
          <div className="hidden md:flex">
            <div className="join">
              <input
                type="text"
                placeholder="Rechercher..."
                className="input input-bordered join-item w-40 md:w-64 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                onClick={() => setSearchModalOpen(true)}
                readOnly
              />
              <button 
                className="btn btn-primary join-item hover:bg-primary-focus transition-all duration-200"
                onClick={() => setSearchModalOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Bouton Notifications */}
          <div className="dropdown dropdown-end">
            <label 
              tabIndex={0} 
              className="btn btn-ghost btn-circle hover:bg-primary/20"
              onClick={(e) => {
                // Empêche la propagation pour éviter de fermer immédiatement
                e.stopPropagation();
                const dropdown = e.currentTarget.nextElementSibling;
                dropdown.hasAttribute('open') 
                  ? dropdown.removeAttribute('open') 
                  : dropdown.setAttribute('open', 'true');
              }}
            >
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item animate-pulse"></span>
              </div>
            </label>
            <div 
              tabIndex={0} 
              className="mt-3 z-[1] card card-compact dropdown-content w-72 bg-base-100 shadow"
              // Ferme le dropdown quand on clique ailleurs
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  e.currentTarget.removeAttribute('open');
                }
              }}
            >
              <div className="card-body">
                <span className="font-bold text-lg">3 Notifications</span>
                <span className="text-sm">Vous avez 3 nouvelles notifications</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block btn-sm">Voir tout</button>
                  <div className="divider my-0"></div> 
                  <div className="space-y-2">
                    <div className="flex gap-2 items-center p-2 hover:bg-base-200 rounded-lg cursor-pointer">
                      <div className="avatar">
                        <div className="w-8 rounded-full bg-primary text-white flex items-center justify-center">
                          <span>M</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Nouveau message</p>
                        <p className="text-xs text-gray-500">Il y a 2 minutes</p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center p-2 hover:bg-base-200 rounded-lg cursor-pointer">
                      <div className="avatar">
                        <div className="w-8 rounded-full bg-secondary text-white flex items-center justify-center">
                          <span>A</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Nouvel article</p>
                        <p className="text-xs text-gray-500">Il y a 1 heure</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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

          
           {/* Modal de Connexion */}
      <ModalLogin/>
        </div>
      </header>

      {/* Modal de Recherche Avancée */}
       {/* Modal de recherche */}
       <SearchModal 
        isOpen={searchModalOpen} 
        onClose={() => setSearchModalOpen(false)} 
      />
      

     
    </>
  );
};

export default Header;