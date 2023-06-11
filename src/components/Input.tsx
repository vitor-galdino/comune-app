import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import InputMask from 'react-input-mask';

interface InputProps {
  type: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder: string;
  defaultValue?: string;
  label?: string;
  id: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
}

export default function Input({ type, placeholder, defaultValue, label, id, register, error }: InputProps) {
  const inputClassName = `outline-none max-w-[95%] sm:w-80 w-full text-base pb-1 border-b-2 ${!!error && 'border-red-400 hover:border-red-400'} border-gray-200 focus:border-branding-blue hover:border-branding-blue`;

  return (
    <fieldset className='flex flex-col'>
      <label htmlFor={id} className='font-normal text-gray-700'>{label}</label>
      {type === 'tel' ? (
        <InputMask
          mask='99 99999-9999'
          className={inputClassName}
          defaultValue={defaultValue}
          type={type}
          id={id}
          placeholder={placeholder}
          {...register}
        />
      ) : (
        <input
          className={inputClassName}
          type={type}
          id={id}
          placeholder={placeholder}
          {...register}
        />
      )}
      {!!error && <span className='mt-2 text-sm text-red-500'>{error.message}</span>}
    </fieldset>
  );
}