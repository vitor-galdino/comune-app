import { z } from 'zod';

export const createContactSchema = z.object({
  fullName: z.string()
    .nonempty('Campo obrigatório')
    .min(3, 'O nome precisa ter no mínimo 3 caracteres')
    .max(120, 'A senha ultrapassou o limite de 120 caracteres'),
  email: z.string()
    .nonempty('Campo obrigatório')
    .email('Formato de e-mail inválido')
    .max(45, 'O e-mail ultrapassou o limite de 45 caracteres'),
  phone: z.string()
    .nonempty('Campo obrigatório')
    .max(14, 'O número ultrapassou o limite de 14 caracteres')
});