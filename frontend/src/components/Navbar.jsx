import { Link } from "react-router-dom";

import Logo from '../assets/images/logo.svg';

export default function Navbar({ isLandingPage }) {
    return (
        <nav className="navbar navbar-expand-lg bg-corporate bg-body-tertiary px-4 ">
            <div className="container-fluid d-flex justify-content-between align-items-center text-white">
                <Link to={'/'} className="navbar-brand fw-bold text-white d-flex align-items-center">
                    <img 
                    src={Logo} 
                    alt="Logo"
                    className="me-2" 
                    />
                    <span>Gerenciamento de Entregas</span>
                </Link>

                <div className="d-flex align-items-center">
                    {isLandingPage ? (
                        <Link to={'/entrar'} className="btn btn-outline-light fw-bold px-4 rounded-pill">
                            Entrar
                        </Link>
                    ) : (
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle d-flex align-items-center text-white" 
                                   href="#" role="button" data-bs-toggle="dropdown">
                                    <i className="bi bi-person-circle me-2" style={{ fontSize: '1.4rem' }}></i>
                                </span>
                                <ul className="dropdown-menu dropdown-menu-end shadow">
                                    <li><a className="dropdown-item" href="#">Meu Perfil</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item text-danger" href="#">Sair</a></li>
                                </ul>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}