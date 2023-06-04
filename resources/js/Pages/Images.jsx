import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function Images({ auth }) {
    const [image, setImage] = useState([]);
    const [images, setImages] = useState([]);

    React.useEffect(() => {
        UpdateImages();
    }, []);

    const UpdateImages = () => {
        axios.get('/api/user/images/' + auth.user.id).then((response) => {
            setImages(response.data);
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);

        axios.post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            UpdateImages();
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

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Mes Images :</div>
                        <div className='flex flex-wrap w-full justify-around'>
                            {
                                images.map((image) => (
                                    <div className="bg-white p-auto">
                                        <img src={image.path} alt={image.name} width={400} onClick={() => window.open(image.url, '_blank')} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Ajouter une image :</div>

                            <div className="p-6 bg-white border-b border-gray-200">
                                <form onSubmit={onSubmit}>
                                    <div className="mb-4">
                                        <div className='flex flex-row w-full mb-4'>
                                            <label className="text-xl text-gray-600">Image :<span className="text-red-500">*</span></label>
                                            <input type="file" className="pl-4" name="image" id="image" placeholder="Image" onChange={(e) => setImage(e.target.files[0])} required/>
                                        </div>
                                        <button type="submit"
                                            className="p-2 bg-blue-500 rounded-xl text-white hover:bg-blue-400">
                                            Ajouter
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
