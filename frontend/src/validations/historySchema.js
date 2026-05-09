import { z } from 'zod';

export const historySchema = z.object({
  newStatus: z.string().min(1, "O status é obrigatório"),
  note: z.string().min(5, "A observação deve ter pelo menos 5 caracteres para o histórico"),
});