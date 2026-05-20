import { useState, useEffect } from "react";
import axios from "axios";
import api from "../api.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recipientSchema } from "../validations/recipientSchema";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ListTable from '../components/ListTable.jsx';
import ModalWrapper from "../components/ModalWrapper";

export default function Recipients() {
    const [recipients, setRecipients] = useState([]);
    const [ufList, setUfList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const [modalConfig, setModalConfig] = useState({
        show: false,
        type: 'create',
        data: null
    });

    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm({
        resolver: zodResolver(recipientSchema)
    });

    const maskCPF = (value) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
            .slice(0, 14);
    };

    const maskPhone = (value) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .slice(0, 15);
    };

    async function getRecipients() {
        setIsLoading(true);
        try {
            const response = await api.get("/recipients");
            setRecipients(response.data);
        } catch (error) {
            console.error("Erro ao buscar destinatários:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function loadStates() {
        try {
            const response = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome");
            setUfList(response.data);
        } catch (error) {
            console.error("Erro ao buscar UFs do IBGE:", error);
        }
    }

    useEffect(() => { getRecipients(); loadStates();}, []);

    const onSubmit = async (formData) => {
        setIsLoading(true);
        try {
            const payload = {
                ...formData,
                cpf: formData.cpf.replace(/\D/g, ""),
                phone_number: formData.phone_number.replace(/\D/g, "")
            };

            if (modalConfig.type === 'create') {
                await api.post("/recipients", payload);
            } else {
                await api.patch(`/recipients/${modalConfig.data.id}`, payload);
            }
            await getRecipients();
            closeModal();
        } catch (error) {
            const backendError = error.response?.data?.error;
            if (backendError?.includes("E-mail")) {
                setError("email", { type: "manual", message: "E-mail já cadastrado" });
            }
            if (backendError?.includes("CPF")) {
                setError("cpf", { type: "manual", message: "CPF já cadastrado" });
            }
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
            console.error("Erro ao deletar:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const openCreate = () => {
        reset({ 
            name: '', cpf: '', email: '', phone_number: '',
            addresses: { description: '', street: '', number: '', neighborhood: '', city: '', state: '' } 
        });
        setModalConfig({ show: true, type: 'create', data: null });
    };

    const openEdit = (recipient) => {
        const addressData = recipient.addresses?.[0] || {};
        reset({ ...recipient, addresses: addressData });
        setModalConfig({ show: true, type: 'edit', data: recipient });
    };

    const closeModal = () => {
        setModalConfig({ ...modalConfig, show: false });
        reset();
    };

    return (
        <>
            <Navbar isLandingPage={false} />

            <main className="container-fluid px-4 py-2 mt-4">
                <ListTable 
                    data={recipients} 
                    onCreate={openCreate} 
                    onEdit={openEdit} 
                    onDelete={(id) => setModalConfig({ show: true, type: 'delete', data: recipients.find(r => r.id === id) })}
                    type="destinatarios"
                    isLoading={isLoading}
                />
            </main>

            {(modalConfig.type === 'create' || modalConfig.type === 'edit') && (
                <ModalWrapper
                    show={modalConfig.show}
                    onClose={closeModal}
                    onSuccess={handleSubmit(onSubmit)} 
                    title={modalConfig.type === 'create' ? "Novo Destinatário" : "Editar Destinatário"}
                    successLabel="Salvar"
                    isLoading={isLoading}
                >
                    <form className="row g-3">
                        <div className="col-md-8">
                            <label className="form-label fw-bold small">Nome Completo</label>
                            <input {...register("name")} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                        </div>

                        <div className="col-md-4">
                            <label className="form-label fw-bold small">CPF</label>
                            <input 
                                {...register("cpf", {
                                    onChange: (e) => { e.target.value = maskCPF(e.target.value); }
                                })} 
                                type="text"
                                placeholder="000.000.000-00" 
                                className={`form-control ${errors.cpf ? 'is-invalid' : ''}`} 
                            />
                            {errors.cpf && <div className="invalid-feedback">{errors.cpf.message}</div>}
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-bold small">E-mail</label>
                            <input {...register("email")} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-bold small">Telefone</label>
                            <input 
                                {...register("phone_number", {
                                    onChange: (e) => { e.target.value = maskPhone(e.target.value); }
                                })} 
                                type="text"
                                placeholder="(00) 00000-0000"
                                className={`form-control ${errors.phone_number ? 'is-invalid' : ''}`} 
                            />
                            {errors.phone_number && <div className="invalid-feedback">{errors.phone_number.message}</div>}
                        </div>

                        <hr className="my-3 text-muted" />
                        <h6 className="fw-bold mb-0">Endereço de Entrega</h6>

                        <div className="col-12">
                            <label className="form-label fw-bold small">Descrição (Ex: Casa, Trabalho)</label>
                            <input {...register("addresses.description")} className={`form-control ${errors.addresses?.description ? 'is-invalid' : ''}`} />
                            {errors.addresses?.description && <div className="invalid-feedback">{errors.addresses.description.message}</div>}
                        </div>
                        <div className="col-12">
                            <label className="form-label fw-bold small">Rua/Avenida</label>
                            <input {...register("addresses.street")} className={`form-control ${errors.addresses?.street ? 'is-invalid' : ''}`} />
                            {errors.addresses?.street && <div className="invalid-feedback">{errors.addresses.street.message}</div>}
                        </div>

                        <div className="col-md-4">
                            <label className="form-label fw-bold small">Número</label>
                            <input 
                                {...register("addresses.number")} 
                                type="number" 
                                className={`form-control no-spinners ${errors.addresses?.number ? 'is-invalid' : ''}`} 
                            />
                            {errors.addresses?.number && <div className="invalid-feedback">{errors.addresses.number.message}</div>}
                        </div>

                        <div className="col-md-8">
                            <label className="form-label fw-bold small">Bairro</label>
                            <input {...register("addresses.neighborhood")} className={`form-control ${errors.addresses?.neighborhood ? 'is-invalid' : ''}`} />
                            {errors.addresses?.neighborhood && <div className="invalid-feedback">{errors.addresses.neighborhood.message}</div>}
                        </div>
                        <div className="col-md-8">
                            <label className="form-label fw-bold small">Cidade</label>
                            <input {...register("addresses.city")} className={`form-control ${errors.addresses?.city ? 'is-invalid' : ''}`} />
                            {errors.addresses?.city && <div className="invalid-feedback">{errors.addresses.city.message}</div>}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label fw-bold small">UF</label>
                            <select 
                                {...register("addresses.state")}
                                className={`form-select shadow-none ${errors.addresses?.state ? 'is-invalid' : ''}`}
                            >
                                <option value="">Selecione...</option>
                                {ufList.map((uf) => (
                                    <option key={uf.id} value={uf.sigla}>
                                        {uf.sigla} - {uf.nome}
                                    </option>
                                ))}
                            </select>
                            {errors.addresses?.state && <div className="invalid-feedback">{errors.addresses.state.message}</div>}
                        </div>
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
                        <i className="bi bi-geo-alt-fill text-danger fs-1 mb-3"></i>
                        <p className="fs-5">Remover o destinatário <strong>{modalConfig.data?.name}</strong>?</p>
                        <p className="text-muted small">Esta ação não pode ser desfeita.</p>
                    </div>
                </ModalWrapper>
            )}

            <Footer />
        </>
    );
}