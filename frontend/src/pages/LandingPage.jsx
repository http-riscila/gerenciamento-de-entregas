import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import heroImage from '../assets/images/hero-delivery.svg';

export default function LandingPage(){
    return(
            <div className="bg-light min-vh-100 d-flex flex-column">
                <Navbar isLandingPage={true} />
                
                <main className="container flex-grow-1 d-flex align-items-center py-5">
                    <div className="row align-items-center g-5">
                        
                        <div className="col-12 col-md-6 text-center text-md-start">
                            <h1 className="display-3 fw-bold text-corporate mb-3">
                                Logística Inteligente <br /> 
                                <span className="text-primary-gradient">em Tempo Real.</span>
                            </h1>
                            <p className="lead text-secondary mb-4">
                                Otimize sua operação de entregas com uma plataforma robusta e intuitiva. 
                                Gerencie frotas, monitore pedidos e reduza custos operacionais com a 
                                tecnologia líder em visibilidade logística.
                            </p>
                            
                            <div className="d-flex justify-content-center justify-content-md-center">
                                <Link 
                                    to={'/entrar'}
                                    className="btn btn-corporate btn-lg px-5 py-3 rounded-pill shadow-lg fw-bold btn-hover-effect"
                                >
                                    Acessar Plataforma
                                </Link>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 text-center">
                            <img 
                                src={heroImage} 
                                alt="Dashboard Logístico" 
                                className="img-fluid img-hero-animation"
                                style={{ maxHeight: '480px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }}
                            />
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        )
}