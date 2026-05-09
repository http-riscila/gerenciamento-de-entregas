import { z } from 'zod';

export const deliverySchema = z.object({
  recipient_id: z.string().min(1, "Selecione um destinatário obrigatório"),
  status: z.string().default("REQUESTED")
});