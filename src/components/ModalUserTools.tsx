'use client';
import { useDashboard } from '@/contexts/DashboardContext';
import { OptionalUser } from '@/interfaces';
import { editUserSchema } from '@/schemas/editUserSchema';
import { instance } from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Input from './Input';

export default function ModalUserTools() {
  const { register, setValue, watch, handleSubmit, formState: { errors } } = useForm<OptionalUser>({
    resolver: zodResolver(editUserSchema)
  });
  const phone = watch('phone');
  const { setShowModalUserTools, setUserData, userData, setShowModalUserDelete } = useDashboard();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setValue('fullName', userData?.fullName);
    setValue('email', userData?.email);
    setValue('phone', userData?.phone);
  }, []);

  useEffect(() => {
    const handleOutClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const element = modalRef.current;
      if (element && target.contains(element)) {
        setShowModalUserTools(false);
      }
    };

    window.addEventListener('mousedown', handleOutClick);
    return () => window.removeEventListener('mousedown', handleOutClick);
  }, []);

  function handleRequest(formData: OptionalUser) {
    if (formData) {
      if (formData.email === userData?.email) {
        delete formData.email;
      }

      const res = instance.patch('/users', formData)
        .then(({ data }) => {
          setUserData({ ...data, contacts: userData?.contacts });
          setShowModalUserTools(false);
        })
        .catch(err => {
          throw err;
        });

      toast.promise(res, {
        loading: 'Loading...',
        success: 'Dados atualizados com sucesso!',
        error: 'Algo deu errado. Tente novamente.',
      });
    }
  }

  return (
    <div ref={modalRef} className='absolute z-[999] top-0 w-screen h-screen bg-black/10 backdrop-blur-[1px] grid place-items-center'>
      <section className='container relative max-w-[358px] w-11/12 h-auto p-5 bg-white rounded-lg shadow-lg'>
        <header className='absolute top-0 left-0 right-0 flex justify-between w-full h-4 p-5'>
          <h3 className='text-lg font-semibold text-gray-900'>Dados Pessoais</h3>
          <button
            className='flex items-center justify-center p-2 rounded-full w-9 h-9 hover:bg-gray-200/40 -translate-y-0.5 text-gray-700 hover:text-branding-blue transition'
            onClick={() => setShowModalUserTools(false)}
          >
            <X />
          </button>
          <div className='absolute bottom-0 left-0 right-0 top-[65px] w-full h-px bg-gray-300 rounded-full' />
        </header>
        <form
          noValidate
          className='flex flex-col w-full gap-4 mt-16 sm:w-max'
          onSubmit={handleSubmit(handleRequest)}
        >
          <Input
            type='text'
            placeholder='Insira um novo nome...'
            label='Nome'
            id='name'
            register={register('fullName')}
            error={errors.fullName}
          />
          <Input
            type='email'
            placeholder='Insira um novo e-mail...'
            label='E-mail'
            id='email'
            register={register('email')}
            error={errors.email}
          />
          <Input
            type='password'
            placeholder='Insira uma nova senha...'
            label='Senha'
            id='password'
            register={register('password')}
            error={errors.password}
          />
          <Input
            type='tel'
            placeholder='Insira um novo número de telefone...'
            defaultValue={phone}
            label='Número de telefone'
            id='phone'
            register={register('phone')}
            error={errors.phone}
          />
          <div className='flex gap-3'>
            <button
              type="button"
              className='h-10 mt-2 w-2/4 font-medium hover:text-white transition-all duration-300 hover:bg-red-600 border rounded-xl bg-white text-red-600 border-red-600'
              onClick={() => {
                setShowModalUserTools(false);
                setShowModalUserDelete(true);
              }}
            >
              Deletar conta
            </button>
            <button type="submit" className='h-10 mt-2 w-1/2 font-medium text-white transition-all duration-300 border bg-branding-blue rounded-xl hover:bg-white hover:text-branding-blue hover:border-branding-blue'
            >
              Salvar
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}