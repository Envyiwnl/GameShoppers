import { Navigate } from "react-router-dom";

function ProtectedRoute({user, children, redirectPath ="/"}){
    if (!user) {
        return <Navigate to={redirectPath} replace />
    }
    return children;
}

export default ProtectedRoute;