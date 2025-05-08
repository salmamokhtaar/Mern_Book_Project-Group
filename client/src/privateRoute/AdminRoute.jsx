import React from 'react';
import PrivateRoute from './PrivateRoute';

// AdminRoute is just a wrapper around PrivateRoute with adminOnly set to true
function AdminRoute({ children }) {
    return <PrivateRoute adminOnly={true}>{children}</PrivateRoute>;
}

export default AdminRoute;
