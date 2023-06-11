import { z } from 'zod';

export const editContactSchema = z.object({
  fullName: z.string()
    .max(120, 'A senha ultrapassou o limite de 120 caracteres')
    .optional()
    .refine(
      (value) => value === undefined || value === '' || value.length >= 3,
      'O nome precisa ter no mínimo 3 caracteres'
    ),
  email: z.string()
    .max(45, 'O e-mail ultrapassou o limite de 45 caracteres')
    .optional()
    .refine(
      (value) =>
        value === undefined ||
        value === '' ||
        z.string().email().safeParse(value).success,
      'Formato de e-mail inválido'
    ),
  phone: z.string()
    .max(14, 'O número ultrapassou o limite de 14 caracteres')
    .regex(/^\d{2} \d{5}-\d{4}$/, 'Número de telefone inválido')
    .optional(),
}).transform((obj) => {
  const newObj: { [key: string]: string | undefined; } = { ...obj };
  Object.keys(newObj).forEach((key) => {
    if (newObj[key] === '') {
      delete newObj[key];
    }
  });
  if (Object.keys(newObj).length) {
    return newObj;
  }
});
