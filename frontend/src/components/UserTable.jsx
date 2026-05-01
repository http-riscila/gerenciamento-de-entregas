export default function UserListTable({ users, onCreate, onEdit, onDelete }) {
    return (
        <div className="card shadow-sm border-0 p-3">
            <div className="d-flex justify-content-end mb-3">
                <button 
                    className="btn btn-corporate rounded-pill px-4 fw-bold shadow-sm"
                    onClick={onCreate}
                >
                    <i className="bi bi-person-plus-fill me-2"></i>
                    Novo Usuário
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            <th className="ps-4" style={{ width: '30%' }}>Nome</th>
                            <th style={{ width: '30%' }}>E-mail</th>
                            <th style={{ width: '20%' }}>Perfil</th>
                            <th className="text-center" style={{ width: '20%' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td className="ps-4">
                                        <div className="fw-semibold text-dark">{user.name}</div>
                                    </td>
                                    <td className="text-muted">{user.email}</td>
                                    <td>
                                        <span className={`badge rounded-pill ${
                                            user.role === 'ADMIN' ? 'bg-primary' : 
                                            user.role === 'DRIVER' ? 'bg-success' : 'bg-secondary'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            <button 
                                                className="btn btn-sm text-secondary border-0"
                                                onClick={() => onEdit(user)}
                                                title="Editar Usuário"
                                            >
                                                <i className="bi bi-pencil-square fs-5"></i>
                                            </button>
                                            <button 
                                                className="btn btn-sm text-secondary border-0"
                                                onClick={() => onDelete(user.id)}
                                                title="Excluir Usuário"
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
                                    Nenhum usuário encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}