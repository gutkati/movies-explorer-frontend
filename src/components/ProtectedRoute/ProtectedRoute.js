 import React from 'react';
import {Route} from "react-router-dom";

// const ProtectedRoute = ({authorized, children, ...props}) => {
//     return (
//         <Route {...props}>
//             {authorized ? children : <redirectPath to="/"/>}
//         </Route>
//     )
// }
//
// export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ authorized , redirectPath, children }) {
    if (!authorized) return <Navigate to={redirectPath} replace />
    return children ? children : <Outlet />;

};

