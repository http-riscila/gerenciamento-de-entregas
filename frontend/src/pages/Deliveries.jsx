import { useState, useEffect } from "react";
import api from "../api.js";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deliverySchema } from "../validations/deliverySchema";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ListTable from "../components/ListTable";
import ModalWrapper from "../components/ModalWrapper";

export default function Deliveries() {
    const { user } = useAuth();
    const [deliveries, setDeliveries] = useState([]);
    const [recipients, setRecipients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [modalConfig, setModalConfig] = useState({
        show: false,
        type: 'create',
        data: null
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(deliverySchema)
    });

    async function fetchData() {
        setIsLoading(true);
        try {
            const [delivRes, recipRes] = await Promise.all([
                api.get("/deliveries"),
                api.get("/recipients")
            ]);
            setDeliveries(delivRes.data);
            setRecipients(recipRes.data);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => { fetchData(); }, []);

    const onSubmit = async (formData) => {
        setIsLoading(true);
        try {
            await api.post("/deliveries", {
                recipient_id: Number(formData.recipient_id),
                status: 'REQUESTED',
                user_id: user?.id
            });
            
            await fetchData();
            closeModal();
        } catch (error) {
            console.error("Erro ao criar entrega:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const openCreate = () => {
        reset({ recipient_id: '', status: 'REQUESTED' });
        setModalConfig({ show: true, type: 'create', data: null });
    };

    const closeModal = () => {
        setModalConfig({ ...modalConfig, show: false });
        reset();
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar isLandingPage={false} />

            <main className="container-fluid flex-grow-1 px-4 py-2 mt-4">
                <div className="mx-auto" style={{ maxWidth: '100%' }}>
                    <ListTable 
                        data={deliveries} 
                        onCreate={openCreate} 
                        type="entregas"
                        isLoading={isLoading}
                    />
                </div>
            </main>

            {modalConfig.show && (
                <ModalWrapper
                    show={modalConfig.show}
                    onClose={closeModal}
                    onSuccess={handleSubmit(onSubmit)}
                    title="Nova Solicitação de Entrega"
                    successLabel="Solicitar"
                    isLoading={isLoading}
                >
                    <form className="row g-3">
                        <div className="col-12">
                            <label className="form-label fw-bold small">Destinatário</label>
                            <select 
                                {...register("recipient_id")}
                                className={`form-select shadow-none ${errors.recipient_id ? 'is-invalid' : ''}`}
                            >
                                <option value="">Selecione quem vai receber...</option>
                                {recipients.map(r => (
                                    <option key={r.id} value={r.id}>
                                        {r.name} - {r.email}
                                    </option>
                                ))}
                            </select>
                            {errors.recipient_id && (
                                <div className="invalid-feedback fw-bold">
                                    {errors.recipient_id.message}
                                </div>
                            )}
                            <div className="form-text small mt-2">
                                Caso o destinatário não apareça, cadastre-o na aba de Destinatários.
                            </div>
                        </div>
                    </form>
                </ModalWrapper>
            )}

            <Footer />
        </div>
    );
}