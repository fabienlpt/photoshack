import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const getLastItem = (thePath) => {
  return thePath.substring(thePath.lastIndexOf('/') + 1);
};

export default function Image({ auth }) {
    const [image, setImage] = useState();
    const url = getLastItem(window.location.href);

    useEffect(() => {
        axios.get('/api/image/' + url).then((response) => {
            setImage(response.data);
        });
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Image" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                      {
                        image &&
                            <div className="p-6 bg-white border-b border-gray-200">
                                <img src={image.path} alt={image.name}/>
                            </div>
                      }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
