 import React from 'react';

import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ authorized , redirectPath, children }) {
    if (!authorized) return <Navigate to={redirectPath} replace />
    return children ? children : <Outlet />;

};

