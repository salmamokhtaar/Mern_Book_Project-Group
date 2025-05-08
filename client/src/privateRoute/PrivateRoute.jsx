import React, { useContext } from 'react';
import { AuthContext } from '../contects/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { Spinner } from 'flowbite-react';

function PrivateRoute({ children, adminOnly = false }) {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner aria-label='Loading' size="xl" />
            </div>
        );
    }

    // If no user is logged in, redirect to login
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If route requires admin and user is not admin, redirect to home
    if (adminOnly && user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    // User is authenticated (and has admin role if required)
    return children;
}

export default PrivateRoute;