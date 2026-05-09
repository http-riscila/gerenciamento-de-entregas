import { z } from 'zod';

export const recipientSchema = z.object({
  name: z.string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),
  
  email: z.string()
    .email("Insira um e-mail válido"),

  cpf: z.string().min(11, "CPF inválido"),

  phone_number: z.string()
    .min(10, "Telefone inválido (mínimo 10 dígitos)")
    .max(15, "Telefone muito longo")
    .refine((value) => /^\d+$/.test(value.replace(/\D/g, "")), {
      message: "O telefone deve conter apenas números",
    }),

  addresses: z.object({
    description: z.string().min(3, "Dê um nome ao endereço (Ex: Casa)"),
    street: z.string().min(3, "Rua obrigatória"),
    number: z.string().min(1, "Número obrigatório"),
    neighborhood: z.string().min(2, "Bairro obrigatório"),
    city: z.string().min(2, "Cidade obrigatória"),
    state: z.string().length(2, "Use a sigla (Ex: CE)"),
  })
});