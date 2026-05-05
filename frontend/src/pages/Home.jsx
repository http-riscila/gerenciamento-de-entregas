import Navbar from "../components/Navbar";
import ActionCards from "../components/ActionCards";
import Footer from "../components/Footer";

export default function Home(){
    const actions = [
        { name: "Usuários", icon: "bi-people", path: "/usuários" },
        { name: "Destinatários", icon: "bi-geo-alt", path: "/destinatários" },
    ];

    return(
        <div className="bg-light min-vh-100 d-flex flex-column">
            <Navbar isLandingPage={false} />
            
            <main className="container flex-grow-1 mb-5">
                <div className="text-center mt-5 mb-4">
                    <h2 className="fw-bold text-corporate">Painel de Controle</h2>
                    <p className="text-muted">Selecione uma ação abaixo:</p>
                </div>

                <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center w-100">
                    {actions.map((action, index) => (
                        <div key={index} className="col d-flex justify-content-center">
                            <ActionCards title={action.name} icon={action.icon} path={action.path} />
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    )
}