import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  type: 'text' | 'email' | 'password' | 'number';
  placeholder: string;
  label?: string;
  id: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
}

export default function Input({ type, placeholder, label, id, register, error }: InputProps) {
  return (
    <fieldset className='flex flex-col'>
      <label htmlFor={id} className='font-normal text-gray-700'>{label}</label>
      <input
        className='outline-none max-w-[95%] sm:w-80 w-full text-base pb-1 border-b-2 border-gray-200 focus:border-branding-blue hover:border-branding-blue'
        type={type}
        id={id}
        placeholder={placeholder}
        {...register}
      />
      {!!error && <span className='mt-2 text-sm text-red-500'>{error.message}</span>}
    </fieldset>
  );
}