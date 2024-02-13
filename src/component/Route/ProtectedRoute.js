
import React from 'react';

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
    isAuthenticated,
    children,
    adminRoute,
    isAdmin,
    redirect = "/",
    redirectAdmin = "/admin/dashboard",

}) => {
    if (isAuthenticated === false) {
        return <Navigate to={redirect} />
    }
    if (adminRoute && !isAdmin) {
        return <Navigate to={redirectAdmin} />
    }
    return children ? children : <Outlet />
}



export default ProtectedRoute;