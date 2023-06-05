import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    // get last element of the route
    const lastElement = window.location.pathname.split('/').pop();
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>
            <div className="w-full text-center">
                {
                    lastElement === 'login' ? (
                        <h1 className="text-2xl font-semibold text-gray-900">Login | <button className="text-blue-800 hover:text-blue-900"><Link href="/register">Register</Link></button></h1>
                    ) : (
                        <h1 className="text-2xl font-semibold text-gray-900"><button className="text-blue-800 hover:text-blue-900"><Link href="/login">Login</Link></button> | Register</h1>
                    )
                }
            </div>
            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
