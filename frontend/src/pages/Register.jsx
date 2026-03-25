import { Link } from "react-router-dom"

export default function Register(){
    return(
        <div className="min-vh-100 d-flex flex-column bg-light">
            <main className="container flex-grow-1 d-flex align-items-center justify-content-center py-5">
                <div className="card shadow-lg border-0 login-card p-4">
                    <div className="card-body">
                            <h2 className="text-center mb-4 fw-bold text-corporate">Criar Conta</h2>

                        <form /*onSubmit={handleRegister}*/>
                            <div className="mb-3">
                                <label className="form-label fw-semibold text-secondary">Nome Completo</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-person text-muted"></i>
                                    </span>
                                    <input type="text" className="form-control border-start-0 ps-0" required />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold text-secondary">E-mail</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-envelope text-muted"></i>
                                    </span>
                                    <input type="email" className="form-control border-start-0 ps-0" required />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold text-secondary">Senha</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-lock text-muted"></i>
                                    </span>
                                    <input type="password" className="form-control border-start-0 ps-0" required />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold text-secondary">Confirmar Senha</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-shield-check text-muted"></i>
                                    </span>
                                    <input type="password" className="form-control border-start-0 ps-0" required />
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
    )
}