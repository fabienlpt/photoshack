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
            <Head title="Accueil" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Accueil</div>
                        <div className='flex flex-wrap w-full justify-around'>
                            {
                                images.map((image) => (
                                    <div className="bg-white p-auto">
                                        {
                                            image.is_public ? (
                                                <img 
                                                    className='max-h-[15rem]'
                                                    src={image.path}
                                                    alt={image.name}
                                                    onClick={() => window.open(image.url, '_blank')}
                                                />
                                            ) : (
                                                // <div className='relative'>
                                                //     <img
                                                //         className='h-[15rem] blur'
                                                //         src="https://picsum.photos/200"
                                                //         alt="random"
                                                //         onClick={() => window.open(image.url, '_blank')}
                                                //     />
                                                //     {/* center cadena on the other image */}
                                                //     <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(255,255,255,0.2)]'>
                                                //         <img
                                                //             className='h-[8rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded p-1'
                                                //             src="/close_cadena.svg"
                                                //             alt="close"
                                                //             onClick={() => window.open(image.url, '_blank')}
                                                //         />
                                                //     </div>
                                                // </div>
                                                null
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
