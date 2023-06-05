import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, useCallback } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import {useDropzone} from 'react-dropzone'


export default function Images({ auth }) {
    const [images, setImages] = useState([]);
    const onDrop = useCallback(acceptedFiles => {
        onSubmit(acceptedFiles[0]);
        console.log(acceptedFiles[0]);
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    React.useEffect(() => {
        UpdateImages();
    }, []);

    const UpdateImages = () => {
        axios.get('/api/user/images/' + auth.user.id).then((response) => {
            setImages(response.data);
        });
    };

    const onSubmit = (image) => {
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

    const updateAccess = (id, is_public) => {
        axios.put('/api/images/update', {
            id: id,
            is_public: is_public
        }).then(() => {
            UpdateImages();
            console.log('success');
        }).catch((err) => {
            console.log(err);
        });
    };

    const deleteImage = (id) => {
        axios.delete('/api/images/delete/', {
            data: {
                id: id
            }
        }).then(() => {
            UpdateImages();
            console.log('success');
        }).catch((err) => {
            console.log(err);
        });
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
                                    <div className="bg-white p-auto relative">
                                        <img 
                                            className='h-[15rem]'
                                            src={image.path}
                                            alt={image.name}
                                            onClick={() => window.open(image.url, '_blank')}
                                        />
                                        {/* add icon open_cadena.svg from public folder */}
                                        <button className="absolute top-0 right-0 m-1" onClick={() => updateAccess(image.id, !image.is_public)}>
                                            <img 
                                                className='h-6 bg-[rgba(255,255,255,0.5)] rounded p-1'
                                                src={image.is_public ? "/open_cadena.svg" : "/close_cadena.svg"}
                                                alt="open"
                                            />
                                        </button>

                                        {/* add icon trash.svg from public folder */}
                                        <button className="absolute bottom-0 right-0 m-1" onClick={() => deleteImage(image.id)}>
                                            <img
                                                className='h-6 bg-[rgba(255,255,255,0.5)] rounded p-1'
                                                src="/trash.svg"
                                                alt="trash"
                                            />
                                        </button>

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

                            <div className="p-6 bg-white border-b border-gray-200" 
                                {...getRootProps()}>
                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                    <p>Drop the files here ...</p> :
                                    <div className='flex flex-row w-full mb-4'>
                                        <label className="text-xl text-gray-600">Image :<span className="text-red-500">*</span></label>
                                        <input type="file" className="pl-4" name="image" id="image" placeholder="Image" onChange={(e) => onSubmit(e.target.files[0])} required/>
                                    </div>
                                }
                                <button type="submit"
                                    className="p-2 bg-blue-500 rounded-xl text-white hover:bg-blue-400">
                                    Ajouter
                                </button>

                                {/* <form onSubmit={onSubmit}>
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
                                </form> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
