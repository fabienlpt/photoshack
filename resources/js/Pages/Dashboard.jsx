import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard({ auth }) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get('/api/images').then((response) => {
            setImages(response.data);
        });
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Accueil</div>
                        {
                            images.map((image) => (
                                <div className="p-6 bg-white border-b border-gray-200">
                                    <img src={image.path} alt={image.name} width={300} onClick={() => window.open(image.url, '_blank')} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
