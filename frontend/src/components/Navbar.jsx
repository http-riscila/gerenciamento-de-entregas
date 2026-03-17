import '../App.css';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-corporate bg-body-tertiary px-4 ">
            <div className="container-fluid d-flex justify-content-between align-items-center text-white">
                <a className="navbar-brand fw-bold text-white" href="#">Gerenciamento de Entregas</a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-person-circle me-2" style={{ fontSize: '1.2rem' }}></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end shadow">
                                <li><a className="dropdown-item" href="#">Meu Perfil</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item text-danger" href="#">Sair</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}