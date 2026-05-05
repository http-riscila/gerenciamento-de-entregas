export default function ListTable({ 
    data = [], 
    onCreate, 
    onEdit, 
    onDelete, 
    type = 'usuarios'
}) {
    const isUser = type === 'usuarios';
    const title = isUser ? "Novo Usuário" : "Novo Destinatário";
    const iconClass = isUser ? "bi-person-plus-fill" : "bi-person-vcard-fill";

    const formatPhoneNumber = (value) => {
    if (!value) return "N/A";
    
    const numbers = value.replace(/\D/g, "");
    
    if (numbers.length === 11) {
        return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (numbers.length === 10) {
        return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    
    return value;
};

    return (
        <div className="card shadow-sm border-0 p-3">
            <div className="d-flex justify-content-end mb-3">
                <button 
                    className="btn btn-corporate rounded-pill px-4 fw-bold shadow-sm"
                    onClick={onCreate}
                >
                    <i className={`bi ${iconClass} me-2`}></i>
                    {title}
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            <th className="ps-4" style={{ width: '30%' }}>Nome</th>
                            <th style={{ width: '30%' }}>E-mail</th>
                            <th style={{ width: '20%' }}>{isUser ? 'Perfil' : 'Cidade/UF'}</th>
                            <th className="text-center" style={{ width: '20%' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item) => (
                                <tr key={item.id}>
                                    <td className="ps-4">
                                        <div className="fw-semibold text-dark">{item.name}</div>
                                    </td>
                                    <td className="text-muted">{item.email}</td>
                                    <td>
                                        {isUser ? (
                                            <span className={`badge rounded-pill ${
                                                item.role === 'ADMIN' ? 'bg-primary' : 
                                                item.role === 'DRIVER' ? 'bg-success' : 'bg-secondary'
                                            }`}>
                                                {item.role}
                                            </span>
                                        ) : (
                                            <span className="text-muted small">
                                                {formatPhoneNumber(item.phone_number)}
                                            </span>
                                        )}
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            <button 
                                                className="btn btn-sm text-secondary border-0"
                                                onClick={() => onEdit(item)}
                                                title={`Editar ${isUser ? 'Usuário' : 'Destinatário'}`}
                                            >
                                                <i className="bi bi-pencil-square fs-5"></i>
                                            </button>
                                            <button 
                                                className="btn btn-sm text-secondary border-0"
                                                onClick={() => onDelete(item.id)}
                                                title={`Excluir ${isUser ? 'Usuário' : 'Destinatário'}`}
                                            >
                                                <i className="bi bi-trash3 fs-5"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-muted">
                                    Nenhum {isUser ? 'usuário' : 'destinatário'} encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}