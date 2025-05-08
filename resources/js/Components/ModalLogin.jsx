import { useState } from "react";
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextInputEmal from "./TextInputEmal";

export default function ModalLogin({ status, canResetPassword }) {
  const [activeTab, setActiveTab] = useState('login');
  const { auth } = usePage().props;
  const isAuthenticated = auth?.user;

  // Formulaires
  const loginForm = useForm({
    email: '',
    password: '',
    username:'',
    remember: false,
  });

  const registerForm = useForm({
    name: '',
    email: '',
    password: '',
    username:'',
    password_confirmation: '',
  });

  const forgotForm = useForm({
    email: '',
  });

  // Soumissions sans redirection
  const submitLogin = (e) => {
    e.preventDefault();
    loginForm.post(route('login'), {
      preserveScroll: true, // Empêche le rechargement de la page
      onSuccess: () => {
        loginForm.reset('password');
        document.getElementById('login_modal').close();
      }
    });
  };

  const submitRegister = (e) => {
    e.preventDefault();
    registerForm.post(route('register'), {
      preserveScroll: true,
      onSuccess: () => {
        registerForm.reset('password', 'password_confirmation');
        document.getElementById('login_modal').close();
      }
    });
  };

  const submitForgot = (e) => {
    e.preventDefault();
    forgotForm.post(route('password.email'), {
      preserveScroll: true,
      onSuccess: () => forgotForm.reset(),
    });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    router.post(route('logout'), {
      preserveScroll: true,
    });
  };

  return (
    <>
      {/* Bouton conditionnel */}
      {isAuthenticated ? (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            
            {auth.user?.avatar ? (
                    <img src={auth.user.avatar} alt="Profile" className="w-10 rounded-full" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
          </label>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <Link href={route('mon.profile.edit')} className="justify-between">
                Profil
              </Link>
            </li>
            <li><a>Paramètres</a></li>
            <li>
              <Link href={route('logout')} 
              method="post"
              as="button">Déconnexion</Link>
            </li>
          </ul>
        </div>
      ) : (
        <button 
          onClick={() => document.getElementById('login_modal').showModal()}
          className="btn btn-primary btn-sm sm:btn-md hover:bg-primary-focus transition-all duration-200 relative overflow-hidden group"
        >
          <span className="hidden sm:inline relative z-10">Connexion</span>
          <span className="sm:hidden relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </span>
          <span 
            className="absolute inset-0 bg-primary-focus opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(90deg, hsl(var(--pf)) 0%, hsl(var(--p)) 100%)'
            }}
          />
        </button>
      )}

      {/* Modal */}
      <dialog id="login_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box  bg-base-100">
          <button 
            onClick={() => document.getElementById('login_modal').close()}
            className="btn btn-sm btn-circle absolute right-2 top-2 hover:bg-error/20 hover:text-error"
          >
            ✕
          </button>
          
         
          
          {status && (
            <div className="mb-4 text-sm font-medium text-green-600">
              {status}
            </div>
          )}

          <h3 className="font-bold text-lg">
            {activeTab === 'login' ? 'Connexion' : activeTab === 'register' ? 'Inscription' : 'Mot de passe oublié'}
          </h3>
          
          <div className="tabs tabs-boxed my-4">
            <button 
              className={`tab ${activeTab === 'login' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Connexion
            </button> 
            <button 
              className={`tab ${activeTab === 'register' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Inscription
            </button>
            {canResetPassword && (
              <button 
                className={`tab ${activeTab === 'forgot' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('forgot')}
              >
                Mot de passe oublié
              </button>
            )}
          </div>

          {activeTab === 'login' && (
            <form onSubmit={submitLogin}>
              <div className="space-y-4">
                <div className="form-control">
                  <InputLabel htmlFor="email" value="Email" />
                  <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={loginForm.data.email}
                    className="input input-bordered mt-1 block w-full"
                    autoComplete="username"
                    isFocused={true}
                    onChange={(e) => loginForm.setData('email', e.target.value)}
                  />
                  <InputError message={loginForm.errors.email} className="mt-2" />
                </div>
                
                <div className="form-control">
                  <InputLabel htmlFor="password" value="Mot de passe" />
                  <TextInput
                    id="password"
                    type="password"
                    name="password"
                    value={loginForm.data.password}
                    className="input input-bordered mt-1 block w-full"
                    autoComplete="current-password"
                    onChange={(e) => loginForm.setData('password', e.target.value)}
                  />
                  <InputError message={loginForm.errors.password} className="mt-2" />
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-2">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={loginForm.data.remember}
                      onChange={(e) => loginForm.setData('remember', e.target.checked)}
                      className="checkbox checkbox-primary"
                    />
                    <span className="label-text">Se souvenir de moi</span>
                  </label>
                </div>

                <div className="modal-action">
                  <button 
                    type="button" 
                    onClick={() => document.getElementById('login_modal').close()} 
                    className="btn btn-ghost hover:bg-base-200 transition-all duration-200"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary hover:bg-primary-focus transition-all duration-200"
                    disabled={loginForm.processing}
                  >
                    {loginForm.processing ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Connexion...
                      </>
                    ) : 'Se connecter'}
                  </button>
                </div>
              </div>
            </form>
          )}
          
          {activeTab === 'register' && (
            <form onSubmit={submitRegister}>
              <div className="space-y-4">
                <div className="form-control">
                  <InputLabel htmlFor="name" value="Nom complet" />
                  <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={registerForm.data.name}
                    className="input input-bordered mt-1 block w-full"
                    autoComplete="name"
                    isFocused={true}
                    onChange={(e) => registerForm.setData('name', e.target.value)}
                  />
                  <InputError message={registerForm.errors.name} className="mt-2" />
                </div>
                <div className="form-control">
                  <InputLabel htmlFor="name" value="Nom d'utilisateur" />
                  <TextInputEmal
                    id="username"
                    type="text"
                    name="username"
                    value={registerForm.data.username}
                    className=""
                    autoComplete="username"
                    isFocused={true}
                    onChange={(e) => registerForm.setData('username', e.target.value)}
                  />
                  <InputError message={registerForm.errors.username} className="mt-2" />
                </div>
                
                
                <div className="form-control">
                  <InputLabel htmlFor="email" value="Email" />
                  <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={registerForm.data.email}
                    className="input input-bordered mt-1 block w-full"
                    autoComplete="username"
                    onChange={(e) => registerForm.setData('email', e.target.value)}
                  />
                  <InputError message={registerForm.errors.email} className="mt-2" />
                </div>
                
                <div className="form-control">
                  <InputLabel htmlFor="password" value="Mot de passe" />
                  <TextInput
                    id="password"
                    type="password"
                    name="password"
                    value={registerForm.data.password}
                    className="input input-bordered mt-1 block w-full"
                    autoComplete="new-password"
                    onChange={(e) => registerForm.setData('password', e.target.value)}
                  />
                  <InputError message={registerForm.errors.password} className="mt-2" />
                </div>
                
                <div className="form-control">
                  <InputLabel htmlFor="password_confirmation" value="Confirmation du mot de passe" />
                  <TextInput
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={registerForm.data.password_confirmation}
                    className="input input-bordered mt-1 block w-full"
                    autoComplete="new-password"
                    onChange={(e) => registerForm.setData('password_confirmation', e.target.value)}
                  />
                  <InputError message={registerForm.errors.password_confirmation} className="mt-2" />
                </div>

                <div className="modal-action">
                  <button 
                    type="button" 
                    onClick={() => document.getElementById('login_modal').close()} 
                    className="btn btn-ghost hover:bg-base-200 transition-all duration-200"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary hover:bg-primary-focus transition-all duration-200"
                    disabled={registerForm.processing}
                  >
                    {registerForm.processing ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Inscription...
                      </>
                    ) : "S'inscrire"}
                  </button>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'forgot' && (
            <form onSubmit={submitForgot}>
              <div className="form-control">
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  value={forgotForm.data.email}
                  className="input input-bordered mt-1 block w-full"
                  autoComplete="username"
                  isFocused={true}
                  onChange={(e) => forgotForm.setData('email', e.target.value)}
                />
                <InputError message={forgotForm.errors.email} className="mt-2" />
              </div>
              
              <div className="modal-action">
                <button 
                  type="button" 
                  onClick={() => document.getElementById('login_modal').close()} 
                  className="btn btn-ghost hover:bg-base-200 transition-all duration-200"
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary hover:bg-primary-focus transition-all duration-200"
                  disabled={forgotForm.processing}
                >
                  {forgotForm.processing ? 'Envoi...' : 'Envoyer le lien'}
                </button>
              </div>
            </form>
          )}
        </div>
        
        <form method="dialog" className="modal-backdrop">
          <button>Fermer</button>
        </form>
      </dialog>
    </>
  );
}