import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children, rolesAllowed }) {
    const { authenticated, user, loading } = useAuth();

    if (loading) return <div className="text-center mt-5">Carregando...</div>;

    if (!authenticated) {
        return <Navigate to="/entrar" />;
    }

    if (rolesAllowed && !rolesAllowed.includes(user?.role)) {
        return <Navigate to="/home" />; 
    }

    return children;
}