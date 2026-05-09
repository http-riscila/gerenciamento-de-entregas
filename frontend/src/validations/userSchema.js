import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Insira um e-mail válido"),
  role: z.enum(['ADMIN', 'LOGISTICS', 'DRIVER'], {
    errorMap: () => ({ message: "Selecione um cargo válido" }),
  }),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});