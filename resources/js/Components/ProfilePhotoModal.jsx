import { useForm, usePage } from '@inertiajs/react';
import { useState, useRef } from 'react';

const ProfilePhotoModal = () => {
    const { user } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);
    
    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm({
        avatar: null,
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('avatar', file);
            
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('mon.profile.avatar.update'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsModalOpen(false);
                setPreview(null);
                reset('avatar');
            },
        });
    };

    return (
        <>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="btn btn-outline btn-sm"
            >
                Changer la photo
            </button>

            <dialog open={isModalOpen} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Modifier la photo de profil</h3>
                    
                    {preview ? (
                        <div className="flex justify-center mb-4">
                            <img src={preview} alt="Preview" className="max-w-xs rounded-lg" />
                        </div>
                    ) : (
                        <div className="flex justify-center items-center bg-gray-100 rounded-lg mb-4" style={{ height: '200px' }}>
                            <p className="text-gray-500">Aucune image sélectionnée</p>
                        </div>
                    )}

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />

                    <div className="flex justify-between mb-4">
                        <button 
                            onClick={() => fileInputRef.current.click()}
                            className="btn btn-outline"
                        >
                            {preview ? 'Changer' : 'Sélectionner'}
                        </button>
                        
                        {preview && (
                            <button 
                                onClick={() => {
                                    setData('avatar', null);
                                    setPreview(null);
                                }}
                                className="btn btn-ghost"
                            >
                                Supprimer
                            </button>
                        )}
                    </div>

                    {errors.avatar && (
                        <div className="alert alert-error mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{errors.avatar}</span>
                        </div>
                    )}

                    {recentlySuccessful && (
                        <div className="alert alert-success mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Photo mise à jour avec succès!</span>
                        </div>
                    )}

                    <div className="modal-action">
                        <button 
                            onClick={() => {
                                setIsModalOpen(false);
                                setData('avatar', null);
                                setPreview(null);
                                reset();
                            }}
                            className="btn btn-ghost"
                        >
                            Annuler
                        </button>
                        <button 
                            onClick={handleSubmit}
                            className="btn btn-primary"
                            disabled={!data.avatar || processing}
                        >
                            {processing ? (
                                <span className="loading loading-spinner"></span>
                            ) : 'Enregistrer'}
                        </button>
                    </div>
                </div>
                
                {/* Fermeture du modal en cliquant à l'extérieur */}
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => setIsModalOpen(false)}>close</button>
                </form>
            </dialog>
        </>
    );
};

export default ProfilePhotoModal;