export default function Footer() {
    return (
        <footer className="bg-footer-custom py-3 mt-auto shadow-sm">
            <div className="container text-center">
                <p className="mb-0 small">
                    &copy; {new Date().getFullYear()} Gerenciamento de Entregas - Desenvolvido por Priscila Gadelha
                </p>
            </div>
        </footer>
    );
}