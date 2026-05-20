import { useState, useEffect } from "react";
import api from "../api.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../validations/userSchema";
import { useAuth } from "../context/AuthContext.jsx";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ListTable from '../components/ListTable.jsx';
import ModalWrapper from "../components/ModalWrapper";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { user } = useAuth()
    
    const [modalConfig, setModalConfig] = useState({
        show: false,
        type: 'create',
        data: null
    });

    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm({
        resolver: zodResolver(userSchema)
    });

    async function getUsers() {
        setIsLoading(true);
        try {
            const response = await api.get("/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => { getUsers(); }, []);

    const onSubmit = async (formData) => {
        setIsLoading(true);
        try {
            if (modalConfig.type === 'create') {
                await api.post("/register", formData);
            } else {
                const { password, confirmPassword, ...updateData } = formData;
                
                await api.patch(`/users/${modalConfig.data.id}`, updateData);
            }
            await getUsers();
            closeModal();
        } catch (error) {
            const backendError = error.response?.data?.error;
            if (backendError?.includes("E-mail")) {
                setError("email", { type: "manual", message: "E-mail já cadastrado" });
            }
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

    const openCreate = () => {
        reset({ name: '', email: '', role: 'LOGISTICS', password: '' });
        setModalConfig({ show: true, type: 'create', data: null });
    };

    const openEdit = (user) => {
        reset({ 
            ...user, 
            password: 'password_mock', 
            confirmPassword: 'password_mock' 
        });
        setModalConfig({ show: true, type: 'edit', data: user });
    };

    const openDelete = (user) => setModalConfig({ show: true, type: 'delete', data: user });

    const closeModal = () => {
        setModalConfig({ ...modalConfig, show: false });
        reset();
    };

    return (
        <>
            <Navbar isLandingPage={false} />

            <main className="container-fluid flex-grow-1 px-4 py-2 mt-4">
                <ListTable 
                    data={users.filter(u => u.id !== user?.id)} 
                    onCreate={openCreate} 
                    onEdit={openEdit} 
                    onDelete={(id) => openDelete(users.find(u => u.id === id))}
                    type="usuarios"
                    isLoading={isLoading}
                />
            </main>

            {(modalConfig.type === 'create' || modalConfig.type === 'edit') && (
                <ModalWrapper
                    show={modalConfig.show}
                    onClose={closeModal}
                    onSuccess={handleSubmit(onSubmit)} 
                    title={modalConfig.type === 'create' ? "Novo Usuário" : "Editar Usuário"}
                    successLabel={modalConfig.type === 'create' ? "Cadastrar" : "Salvar Alterações"}
                    isLoading={isLoading}
                >
                    <form className="row g-3">
                        <div className="col-12">
                            <label className="form-label fw-bold">Nome</label>
                            <input 
                                {...register("name")}
                                type="text" 
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                placeholder="Digite o nome completo"
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                        </div>

                        <div className="col-12">
                            <label className="form-label fw-bold">E-mail</label>
                            <input 
                                {...register("email")}
                                type="email" 
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                placeholder="exemplo@rota.com"
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                        </div>

                        <div className="col-12">
                            <label className="form-label fw-bold">Perfil</label>
                            <select 
                                {...register("role")}
                                className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                            >
                                <option value="ADMIN">ADMIN</option>
                                <option value="LOGISTICS">LOGISTICS</option>
                                <option value="DRIVER">DRIVER</option>
                            </select>
                            {errors.role && <div className="invalid-feedback">{errors.role.message}</div>}
                        </div>

                        {modalConfig.type === 'create' && (
                            <>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Senha</label>
                                    <input 
                                        {...register("password")}
                                        type="password" 
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Confirmar Senha</label>
                                    <input 
                                        {...register("confirmPassword")}
                                        type="password" 
                                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                    />
                                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
                                </div>
                            </>
                        )}
                    </form>
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
                        <p className="fs-5">Deseja mesmo excluir <strong>{modalConfig.data?.name}</strong>?</p>
                    </div>
                </ModalWrapper>
            )}

            <Footer />
        </>
    );
}