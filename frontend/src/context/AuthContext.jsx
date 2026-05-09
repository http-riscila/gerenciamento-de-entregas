import { createContext, useState, useEffect, useContext } from "react";
import api from "../api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Só tenta recuperar se houver algo guardado
        const recoveredUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (recoveredUser && token) {
            try {
                const parsedUser = JSON.parse(recoveredUser);
                setUser(parsedUser);
                api.defaults.headers.Authorization = `Bearer ${token}`;
            } catch (e) {
                // Se o JSON estiver corrompido, limpa tudo
                localStorage.clear();
            }
        }
        setLoading(false);
    }, []);

    const login = (userData, token) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        delete api.defaults.headers.Authorization;
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}