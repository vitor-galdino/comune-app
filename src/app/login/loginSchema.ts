import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string()
    .nonempty('Campo obrigatório')
    .email('Formato de e-mail inválido')
    .max(45, 'O e-mail ultrapassou o limite de 45 caracteres'),
  password: z.string()
    .nonempty('Campo obrigatório')
    .min(3, 'A senha precisa ter no mínimo 3 caracteres')
    .max(120, 'A senha ultrapassou o limite de 120 caracteres')
});

export type LoginData = z.infer<typeof loginSchema>;