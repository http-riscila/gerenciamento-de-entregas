import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api.js";

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            console.log("As senhas não coincidem!");
            return;
        }

        try {
            await api.post("/users", {
                name: formData.name,
                email: formData.email,
                role: formData.role,
                password: formData.password
            });
                navigate("/home");
                console.log("deu certo!");

            } catch (error) {
            console.error("Erro ao cadastrar:", error);
        }
    };

    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            <main className="container flex-grow-1 d-flex align-items-center justify-content-center py-5">
                <div className="card shadow-lg border-0 login-card p-4">
                    <div className="card-body">
                        <h2 className="text-center mb-4 fw-bold text-corporate">Criar Conta</h2>

                        <form onSubmit={handleRegister}>
                            <div className="mb-3">
                                <label className="form-label fw-semibold text-secondary">Nome Completo</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-person text-muted"></i>
                                    </span>
                                    <input 
                                        name="name"
                                        type="text" 
                                        className="form-control border-start-0 ps-0" 
                                        required 
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold text-secondary">E-mail</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-envelope text-muted"></i>
                                    </span>
                                    <input 
                                        name="email"
                                        type="email" 
                                        className="form-control border-start-0 ps-0" 
                                        required 
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold text-secondary">Cargo</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-shield-lock text-muted"></i>
                                    </span>
                                    <select 
                                        name="role"
                                        className="form-select border-start-0 ps-0 text-secondary" 
                                        required
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>Selecione seu cargo...</option>
                                        <option value="ADMIN">Administrador</option>
                                        <option value="LOGISTICS">Operador de Logística</option>
                                        <option value="DRIVER">Motorista</option>
                                    </select>
                                </div>
                            </div>

                            <div className="d-flex align-items-center gap-3">
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-semibold text-secondary">Senha</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="bi bi-lock text-muted"></i>
                                        </span>
                                        <input 
                                            name="password"
                                            type="password" 
                                            className="form-control border-start-0 ps-0" 
                                            required 
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3 w-100">
                                    <label className="form-label fw-semibold text-secondary">Confirmar</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="bi bi-shield-check text-muted"></i>
                                        </span>
                                        <input 
                                            name="confirmPassword"
                                            type="password" 
                                            className="form-control border-start-0 ps-0" 
                                            required 
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-corporate w-100 py-2 fw-bold btn-hover-effect rounded-pill mb-3">
                                Finalizar Cadastro
                            </button>

                            <div className="text-center mt-3">
                                <p className="small text-muted">
                                    Já possui uma conta? <Link to="/entrar" className="text-corporate fw-bold text-decoration-none hover-underline">Entrar agora</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}