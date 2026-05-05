import { useState, useEffect } from "react";
import api from "../api.js";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ListTable from '../components/ListTable.jsx';
import ModalWrapper from "../components/ModalWrapper";

export default function Recipients() {
    const [recipients, setRecipients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const initialFormState = { 
        name: '', 
        cpf: '', 
        phone_number: '', 
        email: '',
        addresses: {
            description: '',
            street: '',
            number: '',
            neighborhood: '',
            city: '',
            state: ''
        }
};

    const [modalConfig, setModalConfig] = useState({
        show: false,
        type: 'create',
        data: initialFormState
    });

    async function getRecipients() {
        try {
            const response = await api.get("/recipients");
            setRecipients(response.data);
            console.log(response)
        } catch (error) {
            console.error("Erro ao buscar destinatários:", error);
        }
    }

    useEffect(() => { getRecipients(); }, []);

    const handleCreate = async () => {
        console.log(modalConfig.data);

        setIsLoading(true);
        try {
            await api.post("/recipients", modalConfig.data);
            await getRecipients();
            closeModal();
        } catch (error) {
            console.error("Erro ao criar destinatário:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = async () => {
        setIsLoading(true);
        try {
            await api.patch(`/recipients/${modalConfig.data.id}`, modalConfig.data);
            await getRecipients();
            closeModal();
        } catch (error) {
            console.error("Erro ao editar destinatário:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await api.delete(`/recipients/${modalConfig.data.id}`);
            await getRecipients();
            closeModal();
        } catch (error) {
            console.error("Erro ao deletar destinatário:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const openCreate = () => setModalConfig({ 
        show: true, type: 'create', data: initialFormState 
    });

    const openEdit = (recipient) => {
    setModalConfig({ 
        show: true, 
        type: 'edit', 
        data: { 
            ...recipient, 
            addresses: recipient.addresses?.[0] || initialFormState.addresses 
        } 
    });
};

    const openDelete = (recipient) => setModalConfig({ 
        show: true, type: 'delete', data: recipient 
    });

    const closeModal = () => setModalConfig({ ...modalConfig, show: false });

    return (
        <>
            <Navbar isLandingPage={false} />

            <main className="container-fluid flex-grow-1 px-4 py-2 mt-4">
                <div className="mx-auto" style={{ maxWidth: '100%' }}>
                    <ListTable 
                        data={recipients} 
                        onCreate={openCreate} 
                        onEdit={openEdit} 
                        onDelete={(id) => openDelete(recipients.find(r => r.id === id))}
                        type="destinatarios"
                    />
                </div>
            </main>

            {(modalConfig.type === 'create' || modalConfig.type === 'edit') && (
                <ModalWrapper
                    show={modalConfig.show}
                    onClose={closeModal}
                    onSuccess={modalConfig.type === 'create' ? handleCreate : handleEdit}
                    title={modalConfig.type === 'create' ? "Novo Destinatário" : "Editar Destinatário"}
                    successLabel="Salvar"
                    isLoading={isLoading}
                >
                    <div className="row g-3">
                        <div className="col-md-8">
                            <label className="form-label fw-bold small">Nome Completo</label>
                            <input type="text" className="form-control shadow-none" 
                                value={modalConfig.data.name}
                                onChange={(e) => setModalConfig({...modalConfig, data: {...modalConfig.data, name: e.target.value}})}
                                placeholder="Ex: Maria Oliveira"
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label fw-bold small">CPF</label>
                            <input type="text" className="form-control shadow-none" 
                                value={modalConfig.data.cpf}
                                onChange={(e) => setModalConfig({...modalConfig, data: {...modalConfig.data, cpf: e.target.value}})}
                                placeholder="000.000.000-00"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold small">E-mail</label>
                            <input type="email" className="form-control shadow-none" 
                                value={modalConfig.data.email}
                                onChange={(e) => setModalConfig({...modalConfig, data: {...modalConfig.data, email: e.target.value}})}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold small">Telefone</label>
                            <input type="text" className="form-control shadow-none" 
                                value={modalConfig.data.phone_number}
                                onChange={(e) => setModalConfig({...modalConfig, data: {...modalConfig.data, phone_number: e.target.value}})}
                                placeholder="(85) 90000-0000"
                            />
                        </div>

                        <hr className="my-4 text-muted" />
                        <h6 className="fw-bold mb-0">Endereço de Entrega</h6>

                        <div className="col-12">
                            <label className="form-label fw-bold small">Nome</label>
                            <input type="text" className="form-control shadow-none" 
                                value={modalConfig.data.addresses?.description}
                                onChange={(e) => setModalConfig({...modalConfig, data: {...modalConfig.data, addresses: {...modalConfig.data.addresses, description: e.target.value}}})}
                            />
                        </div>
                        <div className="col-12">
                            <label className="form-label fw-bold small">Rua/Avenida</label>
                            <input type="text" className="form-control shadow-none" 
                                value={modalConfig.data.addresses?.street}
                                onChange={(e) => setModalConfig({...modalConfig, data: {...modalConfig.data, addresses: {...modalConfig.data.addresses, street: e.target.value}}})}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label fw-bold small">Número</label>
                            <input type="text" className="form-control shadow-none" 
                                value={modalConfig.data.addresses?.number}
                                onChange={(e) => setModalConfig({...modalConfig, data: {...modalConfig.data, addresses: {...modalConfig.data.addresses, number: e.target.value}}})}
                            />
                        </div>
                        <div className="col-md-8">
                            <label className="form-label fw-bold small">Bairro</label>
                            <input type="text" className="form-control shadow-none" 
                                value={modalConfig.data.addresses?.neighborhood}
                                onChange={(e) => setModalConfig({...modalConfig, data: {...modalConfig.data, addresses: {...modalConfig.data.addresses, neighborhood: e.target.value}}})}
                            />
                        </div>
                        <div className="col-md-8">
                            <label className="form-label fw-bold small">Cidade</label>
                            <input type="text" className="form-control shadow-none" 
                                value={modalConfig.data.addresses?.city}
                                onChange={(e) => setModalConfig({...modalConfig, data: {...modalConfig.data, addresses: {...modalConfig.data.addresses, city: e.target.value}}})}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label fw-bold small">UF</label>
                            <input type="text" className="form-control shadow-none" maxLength="2"
                                value={modalConfig.data.addresses?.state}
                                onChange={(e) => setModalConfig({...modalConfig, data: {...modalConfig.data, addresses: {...modalConfig.data.addresses, state: e.target.value.toUpperCase()}}})}
                            />
                        </div>
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
                        <i className="bi bi-geo-alt-fill text-danger fs-1 mb-3"></i>
                        <p className="fs-5">Remover o destinatário <strong>{modalConfig.data.name}</strong>?</p>
                        <p className="text-muted">Isso pode afetar históricos de entregas vinculados.</p>
                    </div>
                </ModalWrapper>
            )}

            <Footer />
        </>
    );
}