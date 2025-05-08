import { Head, usePage, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import ProfilePhotoModal from './ProfilePhotoModal';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm';

export default function ProfileView() {
    const { auth } = usePage().props;
    const user = auth.user;
    const [isEditing, setIsEditing] = useState(false);
    
    const { data, setData, patch, errors, processing, recentlySuccessful, reset } = useForm({
        name: user.name,
        email: user.email,
        username: user.username||'',
        bio: user.bio || '',
        website: user.website || '',
        birthdate: user.birthdate || '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('mon.profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsEditing(false);
                reset('password', 'password_confirmation');
            },
        });
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <Head title="Mon Profil" />
            
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <div className="flex justify-between items-start mb-6">
                        <h1 className="card-title text-2xl">Mon Profil</h1>
                        
                        {!isEditing ? (
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="btn btn-primary btn-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Modifier
                            </button>
                        ) : (
                            <button 
                                onClick={() => setIsEditing(false)}
                                className="btn btn-ghost btn-sm"
                            >
                                Annuler
                            </button>
                        )}
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Photo de profil */}
                        <div className="flex-shrink-0 flex flex-col items-center">
                            <div className="avatar mb-4">
                                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    {user.avatar ? (
                                        <img 
                                            src={`${user.avatar}`} 
                                            alt="Photo de profil"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `https://ui-avatars.com/api/?name=${user.name}&background=random`;
                                            }}
                                        />
                                    ) : (
                                        <img 
                                            src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} 
                                            alt="Photo par défaut"
                                        />
                                    )}
                                </div>
                            </div>
                            
                            {isEditing && (
                                
                            <ProfilePhotoModal/>

                            )}
                        </div>
                        
                        {/* Informations du profil */}
                        <div className="flex-grow">
                            {!isEditing ? (
                                <div className="space-y-4">
                                    <div>
                                        <h2 className="text-xl font-semibold">{user.name}</h2>
                                        <p className="text-gray-500">@{user.username}</p>
                                    </div>
                                    
                                    {user.bio && <p className="">{user.bio}</p>}
                                    
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span>{user.email}</span>
                                        </div>
                                        
                                        {user.website && (
                                            <div className="flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                                </svg>
                                                <a href={user.website} target="_blank" rel="noopener noreferrer" className="link link-primary">
                                                    {user.website}
                                                </a>
                                            </div>
                                        )}
                                        
                                        {user.birthdate && (
                                            <div className="flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>{new Date(user.birthdate).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                    </div>
                                    <hr />
                                    <div className="divider ">Compte</div>
                                    <div className="bg-base-100 px-2 py-2  rounded-md">
                                        <DeleteUserForm/>
                                    </div>


                                </div>
                            ) : (
                                <form onSubmit={submit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <InputLabel htmlFor="name" value="Nom complet" />
                                            <TextInput
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                className="input input-bordered w-full mt-1"
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.name} className="mt-2" />
                                        </div>
                                        
                                        <div>
                                            <InputLabel htmlFor="username" value="Nom d'utilisateur" />
                                            <TextInput
                                                id="username"
                                                name="username"
                                                value={data.username}
                                                className="input input-bordered w-full mt-1"
                                                onChange={(e) => setData('username', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.username} className="mt-2" />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <InputLabel htmlFor="email" value="Email" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="input input-bordered w-full mt-1"
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>
                                    
                                    <div>
                                        <InputLabel htmlFor="bio" value="Bio" />
                                        <textarea
                                            id="bio"
                                            name="bio"
                                            value={data.bio}
                                            onChange={(e) => setData('bio', e.target.value)}
                                            className="textarea textarea-bordered w-full mt-1"
                                            rows="3"
                                        />
                                        <InputError message={errors.bio} className="mt-2" />
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <InputLabel htmlFor="website" value="Site web" />
                                            <TextInput
                                                id="website"
                                                type="url"
                                                name="website"
                                                value={data.website}
                                                className="input input-bordered w-full mt-1"
                                                onChange={(e) => setData('website', e.target.value)}
                                            />
                                            <InputError message={errors.website} className="mt-2" />
                                        </div>
                                        
                                        <div>
                                            <InputLabel htmlFor="birthdate" value="Date de naissance" />
                                            <TextInput
                                                id="birthdate"
                                                type="date"
                                                name="birthdate"
                                                value={data.birthdate}
                                                className="input input-bordered w-full mt-1"
                                                onChange={(e) => setData('birthdate', e.target.value)}
                                            />
                                            <InputError message={errors.birthdate} className="mt-2" />
                                        </div>
                                    </div>
                                    
                                    <div className="divider">Changer le mot de passe</div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <InputLabel htmlFor="password" value="Nouveau mot de passe" />
                                            <TextInput
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                className="input input-bordered w-full mt-1"
                                                onChange={(e) => setData('password', e.target.value)}
                                            />
                                            <InputError message={errors.password} className="mt-2" />
                                        </div>
                                        
                                        <div>
                                            <InputLabel htmlFor="password_confirmation" value="Confirmation" />
                                            <TextInput
                                                id="password_confirmation"
                                                type="password"
                                                name="password_confirmation"
                                                value={data.password_confirmation}
                                                className="input input-bordered w-full mt-1"
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                            />
                                            <InputError message={errors.password_confirmation} className="mt-2" />
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end gap-2 pt-4">
                                        <button 
                                            type="button" 
                                            onClick={() => setIsEditing(false)}
                                            className="btn btn-ghost"
                                        >
                                            Annuler
                                        </button>
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary"
                                            disabled={processing}
                                        >
                                            {processing ? (
                                                <span className="loading loading-spinner"></span>
                                            ) : 'Enregistrer'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}





