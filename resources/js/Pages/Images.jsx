import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function Images({ auth }) {
    const [image, setImage] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);

        axios.post('/upload-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            console.log('success');
        }
        ).catch((err) => {
            console.log(err);
        }
        );
        
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Images" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Mes Images</div>
                    </div>
                    {/* add button to upload image */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Ajouter une image</div>

                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={onSubmit}>
                                <div className="mb-4">
                                    <label className="text-xl text-gray-600">Image<span className="text-red-500">*</span></label><br/>
                                    <input type="file" className="p-2 w-full" name="image" id="image" placeholder="Image" onChange={(e) => setImage(e.target.files[0])} required/>

                                    <button type="submit" className="border-2 border-gray-300 p-2 w-full bg-green-400 text-white">Ajouter</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
