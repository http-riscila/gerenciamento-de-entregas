import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import ActionCards from "../components/ActionCards";
import Footer from "../components/Footer";

export default function Home() {
    const { user } = useAuth();

    const allActions = [
        { name: "Usuários", icon: "bi-people", path: "/usuários", roles: ['ADMIN'] },
        { name: "Destinatários", icon: "bi-geo-alt", path: "/destinatários", roles: ['ADMIN', 'LOGISTICS'] },
        { name: "Entregas", icon: "bi-box-seam", path: "/entregas", roles: ['ADMIN', 'LOGISTICS', 'DRIVER'] },
    ];

    const authorizedActions = allActions.filter(action => 
        action.roles.includes(user?.role)
    );

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <Navbar isLandingPage={false} />
            
            <main className="container flex-grow-1 mb-5">
                <div className="text-center mt-5 mb-4">
                    <h2 className="fw-bold text-corporate">Painel de Controle</h2>
                    <p className="text-muted">Bem-vindo, <strong>{user?.name}</strong>. Selecione uma ação:</p>
                </div>

                <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center w-100">
                    {authorizedActions.map((action, index) => (
                        <div key={index} className="col d-flex justify-content-center">
                            <ActionCards title={action.name} icon={action.icon} path={action.path} />
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}