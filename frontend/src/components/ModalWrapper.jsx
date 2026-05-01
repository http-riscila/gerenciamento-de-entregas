export default function ModalWrapper({ 
    show, 
    onClose, 
    onSuccess, 
    title, 
    children, 
    successLabel = "Confirmar",
    cancelLabel = "Cancelar",
    isLoading = false 
}) {
    if (!show) return null;

    return (
        <>
            <div 
                className="modal-backdrop fade show" 
                style={{ zIndex: 1050 }}
                onClick={onClose}
            ></div>

            <div 
                className="modal d-block" 
                tabIndex="-1" 
                style={{ zIndex: 1055 }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg">
                        
                        <div className="modal-header border-bottom-0 pb-0">
                            <h5 className="modal-title fw-bold text-corporate">{title}</h5>
                            <button 
                                type="button" 
                                className="btn-close shadow-none" 
                                onClick={onClose}
                                aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body py-4">
                            {children}
                        </div>

                        <div className="modal-footer border-top-0 pt-0">
                            <button 
                                type="button" 
                                className="btn btn-link text-decoration-none text-muted fw-semibold" 
                                onClick={onClose}
                                disabled={isLoading}
                            >
                                {cancelLabel}
                            </button>
                            <button 
                                type="button" 
                                className={`btn btn-corporate rounded-pill px-4 fw-bold ${isLoading ? 'opacity-50' : ''}`}
                                onClick={onSuccess}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                ) : successLabel}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}