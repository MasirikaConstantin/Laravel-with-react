import MonProfile from '@/Components/MonProfile';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BaseLayout from '@/Layouts/Base';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
export default function Edit({ mustVerifyEmail, status }) {
    return (
        <BaseLayout>
            <Head title="Mon Profile" />

            <MonProfile></MonProfile>
            
        </BaseLayout>
    );
}
