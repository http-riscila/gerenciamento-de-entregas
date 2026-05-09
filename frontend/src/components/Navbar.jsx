import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from '../assets/images/logo.svg';

export default function Navbar({ isLandingPage }) {
    const { user, logout, authenticated } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg bg-corporate px-4 shadow-sm">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <Link to={authenticated ? '/home' : '/'} className="navbar-brand fw-bold text-white d-flex align-items-center">
                    <img src={Logo} alt="Logo" className="me-2" style={{ width: '30px' }} />
                    <span>RotaExpress</span>
                </Link>

                <div className="d-flex align-items-center">
                    {isLandingPage && !authenticated ? (
                        <Link to='/entrar' className="btn btn-outline-light fw-bold px-4 rounded-pill">
                            Entrar
                        </Link>
                    ) : authenticated ? (
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item dropdown">
                                <span 
                                    className="nav-link dropdown-toggle d-flex align-items-center text-white cursor-pointer" 
                                    role="button" 
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="bi bi-person-circle me-2" style={{ fontSize: '1.4rem' }}></i>
                                    <span className="mb-0">{user?.name || "Usuário"}</span>
                                </span>
                                <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                                    <li className="px-3 py-2 small text-muted border-bottom mb-2">
                                        Perfil: <strong>{user?.role}</strong>
                                    </li>
                                    <li>
                                        <button 
                                            className="dropdown-item text-danger d-flex align-items-center" 
                                            onClick={logout}
                                        >
                                            <i className="bi bi-box-arrow-right me-2"></i> Sair
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    ) : (
                        <Link to='/login' className="btn btn-outline-light fw-bold px-4 rounded-pill">
                            Entrar
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}