import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../api.js";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { historySchema } from "../validations/historySchema";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ModalWrapper from "../components/ModalWrapper";

export default function DeliveryHistory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    
    const [delivery, setDelivery] = useState(location.state?.delivery || null);
    const [isActionLoading, setIsActionLoading] = useState(false);

    const [modalConfig, setModalConfig] = useState({
        show: false,
        type: '', 
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(historySchema)
    });

    const statusLabels = {
        REQUESTED: { label: 'Solicitada', class: 'bg-info text-dark' },
        AWAITING_PICKUP: { label: 'Aguardando Coleta', class: 'bg-dark text-white' },
        IN_TRANSIT: { label: 'Em Trânsito', class: 'bg-warning text-dark' },
        OUT_FOR_DELIVERY: { label: 'Saiu para Entrega', class: 'bg-primary' },
        DELIVERED: { label: 'Entregue', class: 'bg-success text-white' },
        RETURNED: { label: 'Devolvida', class: 'bg-secondary' },
        CANCELLED: { label: 'Cancelada', class: 'bg-danger text-white' }
    };

    if (!delivery) return <div className="text-center mt-5"><p>Dados não encontrados.</p></div>;

    const onSubmit = async (data) => {
        setIsActionLoading(true);
        try {
            const payload = {
                status: data.newStatus,
                note: data.note,
            };

            const response = await api.patch(`/deliveries/${id}/status`, payload);
            setDelivery(response.data);
            navigate('/entregas');
            closeModal();
        } catch (error) {
            console.error("Erro no PATCH:", error.response?.data);
        } finally {
            setIsActionLoading(false);
        }
    };

    const openUpdate = () => {
        reset({ newStatus: 'IN_TRANSIT', note: '' });
        setModalConfig({ show: true, type: 'update' });
    };

    const openCancel = () => {
        reset({ newStatus: 'CANCELLED', note: '' });
        setModalConfig({ show: true, type: 'cancel' });
    };

    const closeModal = () => {
        setModalConfig({ ...modalConfig, show: false });
        reset();
    };

    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            <Navbar isLandingPage={false} />

            <main className="container flex-grow-1 py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center">
                        <button className="btn btn-white shadow-sm rounded-circle me-3" onClick={() => navigate(-1)}>
                            <i className="bi bi-arrow-left"></i>
                        </button>
                        <h2 className="mb-0 fw-bold">Entrega <span className="text-corporate">#{id}</span></h2>
                    </div>

                    {delivery.status !== 'DELIVERED' && delivery.status !== 'CANCELLED' && delivery.status !== 'RETURNED' && (
                        <div className="d-flex gap-2">
                            <button className="btn btn-outline-danger rounded-pill px-4 fw-bold" onClick={openCancel}>Cancelar</button>
                            <button className="btn btn-corporate rounded-pill px-4 fw-bold" onClick={openUpdate}>Atualizar Status</button>
                        </div>
                    )}
                </div>

                <div className="row g-4">
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <label className="text-muted small d-block">Destinatário</label>
                                <p className="fw-bold fs-5 mb-3">{delivery.recipient?.name}</p>
                                <label className="text-muted small d-block">Status Atual</label>
                                <span className={`badge rounded-pill ${statusLabels[delivery.status]?.class}`}>
                                    {statusLabels[delivery.status]?.label}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <h5 className="fw-bold mb-3">Histórico de Movimentações</h5>
                        {delivery.logs?.slice().reverse().map((log) => (
                            <div key={log.id} className="card border-0 shadow-sm mb-3 border-start border-4 border-corporate">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className={`badge rounded-pill ${statusLabels[log.status_novo]?.class}`}>
                                            {statusLabels[log.status_novo]?.label}
                                        </span>
                                        <small className="text-muted">{new Date(log.modified_at).toLocaleString('pt-BR')}</small>
                                    </div>
                                    <p className="mb-0 text-dark">{log.note}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <ModalWrapper
                show={modalConfig.show}
                onClose={closeModal}
                onSuccess={handleSubmit(onSubmit)}
                title={modalConfig.type === 'cancel' ? "Confirmar Cancelamento" : "Atualizar Status da Entrega"}
                successLabel={modalConfig.type === 'cancel' ? "Cancelar Agora" : "Salvar Alteração"}
                isLoading={isActionLoading}
            >
                {modalConfig.type === 'update' && (
                    <div className="mb-3">
                        <label className="form-label fw-bold">Selecione o Novo Status</label>
                        <select 
                            {...register("newStatus")}
                            className={`form-select shadow-none ${errors.newStatus ? 'is-invalid' : ''}`}
                        >
                            {Object.keys(statusLabels)
                                .filter(status => status !== delivery.status && status !== 'CANCELLED' && status !== 'REQUESTED')
                                .map(status => (
                                    <option key={status} value={status}>
                                        {statusLabels[status].label}
                                    </option>
                                ))
                            }
                        </select>
                        {errors.newStatus && <div className="invalid-feedback">{errors.newStatus.message}</div>}
                    </div>
                )}
                
                <div className="mb-3">
                    <label className="form-label fw-bold">Observação / Motivo</label>
                    <textarea 
                        {...register("note")}
                        className={`form-control shadow-none ${errors.note ? 'is-invalid' : ''}`} 
                        rows="3" 
                        placeholder={modalConfig.type === 'cancel' ? "Descreva o motivo do cancelamento..." : "O que aconteceu com a encomenda?"}
                    ></textarea>
                    {errors.note && <div className="invalid-feedback fw-bold">{errors.note.message}</div>}
                </div>
            </ModalWrapper>

            <Footer />
        </div>
    );
}