





import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import ProfilePhotoEditor from '@/Components/ProfilePhotoEditor';



export default function MonProfile() {
    const { auth } = usePage().props;
    const user = auth.user;

    const { data, setData, put, errors, reset, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        username: user.username,
        bio: user.bio || '',
        website: user.website || '',
        birthdate: user.birthdate || '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => reset('password', 'password_confirmation'),
        });
    };

    if (!user) {
        return <div className="p-4">Veuillez vous connecter</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <Head title="Mon Profil" />

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h1 className="text-2xl font-bold mb-6">Mon Profil</h1>
                    
                    <div className="card bg-base-200 shadow-lg p-6">
                        <ProfilePhotoEditor user={user} />

                        <form onSubmit={submit} className="mt-6 space-y-4">
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

                            <div className="border-t pt-4 mt-4">
                                <h2 className="text-lg font-medium mb-4">Changer le mot de passe</h2>

                                <div>
                                    <InputLabel htmlFor="password" value="Nouveau mot de passe" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="input input-bordered w-full mt-1"
                                        onChange={(e) => setData('password', e.target.value)}
                                        autoComplete="new-password"
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
                                        autoComplete="new-password"
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={processing}
                                >
                                    {processing ? 'Enregistrement...' : 'Enregistrer'}
                                </button>

                                {recentlySuccessful && (
                                    <div className="text-sm text-green-600">
                                        Enregistré avec succès.
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}