'use client';
import { useDashboard } from '@/contexts/DashboardContext';
import { OptionalContact } from '@/interfaces';
import { editContactSchema } from '@/schemas/editContactSchema';
import { instance } from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Input from './Input';

export default function ModalEditContact() {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<OptionalContact>({
    resolver: zodResolver(editContactSchema)
  });
  const { showModalEditContact, setShowModalEditContact, setContactsData, contactsData } = useDashboard();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contactFound = contactsData.find((elem) => elem.id == showModalEditContact);
    setValue('fullName', contactFound?.fullName);
    setValue('email', contactFound?.email);
    setValue('phone', contactFound?.phone);
  }, []);

  useEffect(() => {
    const handleOutClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const element = modalRef.current;
      if (element && target.contains(element)) {
        setShowModalEditContact(0);
      }
    };

    window.addEventListener('mousedown', handleOutClick);
    return () => window.removeEventListener('mousedown', handleOutClick);
  }, []);

  function handleRequest(formData: OptionalContact) {
    if (formData) {
      const res = instance.patch(`/users/contacts/${showModalEditContact}`, formData)
        .then(({ data }) => {
          setContactsData(old => old.map(contact => contact.id === data.id ? data : contact));
          setShowModalEditContact(0);
        })
        .catch(err => {
          throw err;
        });

      toast.promise(res, {
        loading: 'Loading...',
        success: 'Contato atualizado com sucesso!',
        error: 'Algo deu errado. Tente novamente.',
      });
    }
  }

  return (
    <div ref={modalRef} className='absolute z-[999] top-0 w-screen h-screen bg-black/10 backdrop-blur-[1px] grid place-items-center'>
      <section className='container relative max-w-[358px] w-11/12 h-auto p-5 bg-white rounded-lg shadow-lg'>
        <header className='absolute top-0 left-0 right-0 flex justify-between w-full h-4 p-5'>
          <h3 className='text-lg font-semibold text-gray-900'>Editar contato</h3>
          <button
            className='flex items-center justify-center p-2 rounded-full w-9 h-9 hover:bg-gray-200/40 -translate-y-0.5 text-gray-700 hover:text-branding-blue transition'
            onClick={() => setShowModalEditContact(0)}
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
            placeholder='Insira o nome...'
            label='Nome'
            id='name'
            register={register('fullName')}
            error={errors.fullName}
          />
          <Input
            type='email'
            placeholder='Insira o e-mail...'
            label='E-mail'
            id='email'
            register={register('email')}
            error={errors.email}
          />
          <Input
            type='text'
            placeholder='Insira o número de telefone...'
            label='Número de telefone'
            id='phone'
            register={register('phone')}
            error={errors.phone}
          />
          <button type="submit" className='h-10 mt-2 font-medium text-white transition-all duration-300 border bg-branding-blue rounded-xl hover:bg-white hover:text-branding-blue hover:border-branding-blue'
          >
            Salvar
          </button>
        </form>
      </section>
    </div>
  );
}