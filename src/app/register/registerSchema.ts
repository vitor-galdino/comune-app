import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string()
    .nonempty('Campo obrigatório')
    .min(3, 'O nome precisa ter no mínimo 3 caracteres')
    .max(120, 'A senha ultrapassou o limite de 120 caracteres'),
  email: z.string()
    .nonempty('Campo obrigatório')
    .email('Formato de e-mail inválido')
    .max(45, 'O e-mail ultrapassou o limite de 45 caracteres'),
  password: z.string()
    .nonempty('Campo obrigatório')
    .min(3, 'A senha precisa ter no mínimo 3 caracteres')
    .max(120, 'A senha ultrapassou o limite de 120 caracteres'),
  confirmPassword: z.string()
    .nonempty('Campo obrigatório')
    .min(3, 'A senha precisa ter no mínimo 3 caracteres')
    .max(120, 'A senha ultrapassou o limite de 120 caracteres'),
  phone: z.string()
    .nonempty('Campo obrigatório')
    .max(14, 'O número ultrapassou o limite de 14 caracteres')
})
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'],
  });

type RegisterDataSchema = z.infer<typeof registerSchema>;

export type RegisterData = Omit<RegisterDataSchema, 'confirmPassword'> & {
  confirmPassword?: string;
};