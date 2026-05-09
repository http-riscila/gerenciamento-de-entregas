import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/loginSchema";

export default function Login() {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    });

    async function onSubmit(data) {
        setErrorMsg('');
        try {
            setLoading(true);
            const response = await api.post("/login", data);

            if (response.status === 200) {
                const { user, token } = response.data;
                login(user, token); 
                console.log("Login realizado com sucesso!");
                navigate('/home'); 
            }

        } catch (error) {
            console.error("Erro ao entrar:", error);
            
            const backendError = error.response?.data?.error;

            if (backendError === 'Credenciais inválidas') {
                setError("email", { type: "manual", message: "" });
                setError("password", { type: "manual", message: "Verifique seu e-mail ou senha." });
                
                setErrorMsg("E-mail ou senha incorretos.");
            } else {
                setErrorMsg(backendError || "Erro ao conectar com o servidor.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            <main className="container flex-grow-1 d-flex align-items-center justify-content-center py-5">
                <div className="card shadow-lg border-0 login-card p-4">
                    <div className="card-body">
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-corporate">Bem-vindo de volta</h2>
                            <p className="text-muted small">Acesse sua conta para gerenciar entregas</p>
                        </div>

                        {errorMsg && (
                            <div className="alert alert-danger py-2 small text-center fw-bold" role="alert">
                                {errorMsg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label className="form-label fw-semibold text-secondary">E-mail</label>
                                <div className="input-group has-validation">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-envelope text-muted"></i>
                                    </span>
                                    <input 
                                        {...register("email")}
                                        type="email" 
                                        className={`form-control border-start-0 ps-0 ${errors.email ? 'is-invalid' : ''}`}
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback fw-bold">
                                            {errors.email.message}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold text-secondary">Senha</label>
                                <div className="input-group has-validation">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-lock text-muted"></i>
                                    </span>
                                    <input 
                                        {...register("password")}
                                        type="password" 
                                        className={`form-control border-start-0 ps-0 ${errors.password ? 'is-invalid' : ''}`}
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback fw-bold">
                                            {errors.password.message}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button type="submit" 
                                    className='btn btn-corporate w-100 py-2 fw-bold rounded-pill mb-3'
                                    disabled={loading}>
                                {loading ?
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    : 'Entrar no Sistema'}
                            </button>

                            <div className="text-center mt-3">
                                <p className="small text-muted">
                                    Não possui uma conta? <Link to="/cadastro" className="text-corporate fw-bold text-decoration-none">Cadastre-se</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}