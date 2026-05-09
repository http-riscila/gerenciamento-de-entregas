import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ListTable({ 
    data = [], 
    onCreate, 
    onEdit, 
    onDelete, 
    type = 'usuarios',
    isLoading
}) {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const statusMap = {
        REQUESTED: { label: 'Solicitada', class: 'bg-info text-dark' },
        AWAITING_PICKUP: { label: 'Aguardando Coleta', class: 'bg-dark text-white' },
        IN_TRANSIT: { label: 'Em Trânsito', class: 'bg-warning text-dark' },
        OUT_FOR_DELIVERY: { label: 'Saiu para Entrega', class: 'bg-primary text-white' },
        DELIVERED: { label: 'Entregue', class: 'bg-success text-white' },
        RETURNED: { label: 'Devolvida', class: 'bg-secondary text-white' },
        CANCELLED: { label: 'Cancelada', class: 'bg-danger text-white' }
    };

    const isUser = type === 'usuarios';
    const isRecipient = type === 'destinatarios';
    const isDelivery = type === 'entregas';

    const getStatusBadge = (status) => {
        const config = statusMap[status] || { label: status, class: 'bg-secondary' };
        return <span className={`badge rounded-pill ${config.class}`}>{config.label}</span>;
    };

    const formatPhoneNumber = (value) => {
        if (!value) return "N/A";
        const numbers = value.replace(/\D/g, "");
        if (numbers.length === 11) return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        return value;
    };

    const getTitle = () => isUser ? "Novo Usuário" : isRecipient ? "Novo Destinatário" : "Solicitar Entrega";
    const getIcon = () => isUser ? "bi-person-plus-fill" : isRecipient ? "bi-person-vcard-fill" : "bi-box-seam-fill";

    return (
        <div className="card shadow-sm border-0 p-3">
            {user?.role !== 'DRIVER' && (
                <div className="d-flex justify-content-end mb-3">
                    <button 
                        className="btn btn-corporate rounded-pill px-4 fw-bold shadow-sm"
                        onClick={onCreate}
                    >
                        <i className={`bi ${getIcon()} me-2`}></i>
                        {getTitle()}
                    </button>
                </div>
            )}

            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            {isDelivery ? (
                                <>
                                    <th className="ps-4" style={{ width: '15%' }}>Cód.</th>
                                    <th style={{ width: '45%' }}>Destinatário</th>
                                    <th style={{ width: '20%' }}>Status</th>
                                </>
                            ) : (
                                <>
                                    <th className="ps-4" style={{ width: '30%' }}>Nome</th>
                                    <th style={{ width: '30%' }}>{isUser ? 'E-mail' : 'Telefone'}</th>
                                    <th style={{ width: '20%' }}>{isUser ? 'Perfil' : 'E-mail'}</th>
                                </>
                            )}
                            <th className="text-center" style={{ width: '20%' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="4" className="text-center py-5">
                                    <div className="spinner-border text-corporate" role="status">
                                        <span className="visually-hidden">Carregando...</span>
                                    </div>
                                    <p className="mt-2 text-muted fw-bold">Buscando registros...</p>
                                </td>
                            </tr>
                        ) : data.length > 0 ? (
                            data.map((item) => (
                                <tr key={item.id}>
                                    {isDelivery ? (
                                        <>
                                            <td className="ps-4 fw-bold text-corporate">#{item.id}</td>
                                            <td className="fw-medium text-dark">{item.recipient?.name}</td>
                                            <td>{getStatusBadge(item.status)}</td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="ps-4">
                                                <div className="fw-semibold text-dark">{item.name}</div>
                                            </td>
                                            <td className="text-muted small">
                                                {isUser ? item.email : formatPhoneNumber(item.phone_number)}
                                            </td>
                                            <td>
                                                {isUser ? (
                                                    <span className={`badge rounded-pill ${item.role === 'ADMIN' ? 'bg-primary' : 'bg-success'}`}>
                                                        {item.role}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted small">{item.email}</span>
                                                )}
                                            </td>
                                        </>
                                    )}
                                    
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center gap-1">
                                            {isDelivery ? (
                                                <button 
                                                    className="btn btn-sm btn-light text-corporate border-0"
                                                    onClick={() => navigate(`/entregas/${item.id}/historico`, { state: { delivery: item } })}
                                                    title="Ver Histórico"
                                                >
                                                    <i className="bi bi-clock-history fs-5"></i>
                                                </button>
                                            ) : (
                                                <>
                                                    {user?.role !== 'DRIVER' && (
                                                        <>
                                                            <button className="btn btn-sm text-secondary border-0" onClick={() => onEdit(item)} title="Editar">
                                                                <i className="bi bi-pencil-square fs-5"></i>
                                                            </button>
                                                            <button className="btn btn-sm text-secondary border-0" onClick={() => onDelete(item.id)} title="Excluir">
                                                                <i className="bi bi-trash3 fs-5"></i>
                                                            </button>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-5 text-muted">
                                    Nenhum registro encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}