import { useState, useEffect } from "react";
import api from "../api.js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserListTable from '../components/UserTable';
import ModalWrapper from "../components/ModalWrapper";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const initialFormState = { name: '', email: '', role: 'LOGISTICS', password: '' };

    const [modalConfig, setModalConfig] = useState({
        show: false,
        type: 'create',
        data: initialFormState
    });

    async function getUsers() {
        try {
            const response = await api.get("/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    }

    useEffect(() => { getUsers(); }, []);

    const handleCreate = async () => {
        if (!modalConfig.data.name || !modalConfig.data.email || !modalConfig.data.password) {
            return alert("Por favor, preencha todos os campos obrigatórios.");
        }

        setIsLoading(true);
        try {
            await api.post("/register", modalConfig.data);
            await getUsers();
            closeModal();
        } catch (error) {
            console.error("Erro ao criar:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = async () => {
        setIsLoading(true);
        try {
            const updateData = {
                name: modalConfig.data.name,
                email: modalConfig.data.email,
                role: modalConfig.data.role
            };
            
            await api.patch(`/users/${modalConfig.data.id}`, updateData);
            await getUsers();
            closeModal();
        } catch (error) {
            console.error("Erro ao editar:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await api.delete(`/users/${modalConfig.data.id}`);
            await getUsers();
            closeModal();
        } catch (error) {
            console.error("Erro ao deletar:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const openCreate = () => setModalConfig({ 
        show: true, type: 'create', data: initialFormState 
    });

    const openEdit = (user) => setModalConfig({ 
        show: true, type: 'edit', data: { ...user } 
    });

    const openDelete = (user) => setModalConfig({ 
        show: true, type: 'delete', data: user 
    });

    const closeModal = () => setModalConfig({ ...modalConfig, show: false });

    return (
        <>
            <Navbar isLandingPage={false} />

            <main className="container-fluid flex-grow-1 px-4 py-2 mt-4">
                <div className="mx-auto" style={{ maxWidth: '100%' }}>
                    <UserListTable 
                        users={users} 
                        onCreate={openCreate} 
                        onEdit={openEdit} 
                        onDelete={(id) => openDelete(users.find(u => u.id === id))} 
                    />
                </div>
            </main>

            {(modalConfig.type === 'create' || modalConfig.type === 'edit') && (
                <ModalWrapper
                    show={modalConfig.show}
                    onClose={closeModal}
                    onSuccess={modalConfig.type === 'create' ? handleCreate : handleEdit}
                    title={modalConfig.type === 'create' ? "Novo Usuário" : "Editar Usuário"}
                    successLabel={modalConfig.type === 'create' ? "Cadastrar" : "Salvar Alterações"}
                    isLoading={isLoading}
                >
                    <div className="row g-3">
                        <div className="col-12">
                            <label className="form-label fw-bold">Nome</label>
                            <input type="text" className="form-control shadow-none" 
                                value={modalConfig.data.name}
                                onChange={(e) => setModalConfig({...modalConfig, data: {...modalConfig.data, name: e.target.value}})}
                                placeholder="Digite o nome completo"
                            />
                        </div>
                        <div className="col-12">
                            <label className="form-label fw-bold">E-mail</label>
                            <input type="email" className="form-control shadow-none" 
                                value={modalConfig.data.email}
                                onChange={(e) => setModalConfig({...modalConfig, data: {...modalConfig.data, email: e.target.value}})}
                                placeholder="exemplo@rota.com"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold">Perfil</label>
                            <select className="form-select shadow-none" 
                                value={modalConfig.data.role}
                                onChange={(e) => setModalConfig({...modalConfig, data: {...modalConfig.data, role: e.target.value}})}
                            >
                                <option value="ADMIN">ADMIN</option>
                                <option value="LOGISTICS">LOGISTICS</option>
                                <option value="DRIVER">DRIVER</option>
                            </select>
                        </div>
                        {modalConfig.type === 'create' && (
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Senha</label>
                                <input type="password" className="form-control shadow-none" 
                                    value={modalConfig.data.password}
                                    onChange={(e) => setModalConfig({...modalConfig, data: {...modalConfig.data, password: e.target.value}})}
                                    placeholder="Crie uma senha"
                                />
                            </div>
                        )}
                    </div>
                </ModalWrapper>
            )}

            {modalConfig.type === 'delete' && (
                <ModalWrapper
                    show={modalConfig.show}
                    onClose={closeModal}
                    onSuccess={handleDelete}
                    title="Confirmar Exclusão"
                    successLabel="Excluir"
                    isLoading={isLoading}
                >
                    <div className="text-center p-3">
                        <i className="bi bi-exclamation-triangle text-danger fs-1 mb-3"></i>
                        <p className="fs-5">Deseja mesmo excluir <strong>{modalConfig.data.name}</strong>?</p>
                        <p className="text-muted">Os dados serão removidos permanentemente do sistema.</p>
                    </div>
                </ModalWrapper>
            )}

            <Footer />
        </>
    );
}