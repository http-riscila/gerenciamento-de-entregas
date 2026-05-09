import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../validations/userSchema";

export default function Register() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { 
        register, 
        handleSubmit, 
        setError, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(userSchema)
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await api.post("/register", data);
            navigate("/entrar");
        } catch (error) {
            const errorMessage = error.response?.data?.error;

            if (error.response?.status === 400 && errorMessage === "E-mail já em uso!") {
                
                setError("email", { 
                    type: "manual", 
                    message: errorMessage 
                });
                
            } else {
                console.error("Erro ao cadastrar:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            <main className="container flex-grow-1 d-flex align-items-center justify-content-center py-5">
                <div className="card shadow-lg border-0 login-card p-4">
                    <div className="card-body">
                        <h2 className="text-center mb-4 fw-bold text-corporate">Criar Conta</h2>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label className="form-label fw-semibold text-secondary">Nome Completo</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-person text-muted"></i>
                                    </span>
                                    <input 
                                        {...register("name")}
                                        type="text" 
                                        className={`form-control border-start-0 ps-0 ${errors.name ? 'is-invalid' : ''}`}
                                    />
                                    {errors.name && <div className="invalid-feedback fw-bold">{errors.name.message}</div>}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold text-secondary">E-mail</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-envelope text-muted"></i>
                                    </span>
                                    <input 
                                        {...register("email")}
                                        type="email" 
                                        className={`form-control border-start-0 ps-0 ${errors.email ? 'is-invalid' : ''}`}
                                    />
                                    {errors.email && <div className="invalid-feedback fw-bold">{errors.email.message}</div>}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold text-secondary">Cargo</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-shield-lock text-muted"></i>
                                    </span>
                                    <select 
                                        {...register("role")}
                                        className={`form-select border-start-0 ps-0 text-secondary ${errors.role ? 'is-invalid' : ''}`}
                                    >
                                        <option value="">Selecione seu cargo...</option>
                                        <option value="LOGISTICS">Operador de Logística</option>
                                        <option value="DRIVER">Motorista</option>
                                    </select>
                                    {errors.role && <div className="invalid-feedback fw-bold">{errors.role.message}</div>}
                                </div>
                            </div>

                            <div className="d-flex align-items-start gap-3">
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-semibold text-secondary">Senha</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="bi bi-lock text-muted"></i>
                                        </span>
                                        <input 
                                            {...register("password")}
                                            type="password" 
                                            className={`form-control border-start-0 ps-0 ${errors.password ? 'is-invalid' : ''}`}
                                        />
                                        {errors.password && <div className="invalid-feedback fw-bold">{errors.password.message}</div>}
                                    </div>
                                </div>

                                <div className="mb-3 w-100">
                                    <label className="form-label fw-semibold text-secondary">Confirmar</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="bi bi-shield-check text-muted"></i>
                                        </span>
                                        <input 
                                            {...register("confirmPassword")}
                                            type="password" 
                                            className={`form-control border-start-0 ps-0 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                        />
                                        {errors.confirmPassword && <div className="invalid-feedback fw-bold">{errors.confirmPassword.message}</div>}
                                    </div>
                                </div>
                            </div>

                            <button type="submit" 
                                    className='btn btn-corporate w-100 py-2 fw-bold rounded-pill mb-3'
                                    disabled={loading}>
                                {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : 'Finalizar Cadastro'}
                            </button>

                            <div className="text-center mt-3">
                                <p className="small text-muted">
                                    Já possui uma conta? <Link to="/entrar" className="text-corporate fw-bold text-decoration-none">Entrar agora</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}