import { Link, useNavigate } from "react-router-dom"

export default function Login(){
    const navigate = useNavigate();
    return(
        <div className="min-vh-100 d-flex flex-column bg-light">
            <main className="container flex-grow-1 d-flex align-items-center justify-content-center py-5">
                <div className="card shadow-lg border-0 login-card p-4">
                    <div className="card-body">
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-corporate">Bem-vindo de volta</h2>
                            <p className="text-muted small">Acesse sua conta para gerenciar entregas</p>
                        </div>

                        <form /*onSubmit={handleLogin}*/>
                            <div className="mb-3">
                                <label className="form-label fw-semibold text-secondary">E-mail</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-envelope text-muted"></i>
                                    </span>
                                    <input 
                                        type="email" 
                                        className="form-control border-start-0 ps-0" 
                                        //required 
                                        //value={email}
                                        //onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold text-secondary">Senha</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-lock text-muted"></i>
                                    </span>
                                    <input 
                                        type="password" 
                                        className="form-control border-start-0 ps-0" 
                                        //required 
                                        //value={password}
                                        //onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button type="submit" onClick={() => navigate('/home')} className="btn btn-corporate w-100 py-2 fw-bold btn-hover-effect rounded-pill mb-3">
                                Entrar no Sistema
                            </button>

                            <div className="text-center mt-3">
                                <p className="small text-muted">
                                    Não possui uma conta? <Link to="/cadastro" className="text-corporate fw-bold text-decoration-none hover-underline">Cadastre-se</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}