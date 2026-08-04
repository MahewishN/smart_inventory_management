import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {

    const { user } = useAuth();

    if (user?.role !== "ADMIN") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default AdminRoute;