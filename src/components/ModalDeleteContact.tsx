'use client';
import { useDashboard } from '@/contexts/DashboardContext';
import { instance } from '@/services/api';
import { AlertCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export default function ModalDeleteContact() {
  const { showModalDeleteContact, setShowModalDeleteContact, setContactsData } = useDashboard();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const element = modalRef.current;
      if (element && target.contains(element)) {
        setShowModalDeleteContact(0);
      }
    };

    window.addEventListener('mousedown', handleOutClick);
    return () => window.removeEventListener('mousedown', handleOutClick);
  }, []);

  function handleRequest() {
    const res = instance.delete(`/users/contacts/${showModalDeleteContact}`)
      .then(() => {
        setContactsData(old => old.filter(contact => contact.id !== showModalDeleteContact));
        setShowModalDeleteContact(0);
      })
      .catch(err => {
        throw err;
      });

    console.log(showModalDeleteContact);
    toast.promise(res, {
      loading: 'Loading...',
      success: 'Contato deletado com sucesso!',
      error: 'Algo deu errado. Tente novamente.',
    });
  }

  return (
    <div ref={modalRef} className='absolute z-[999] top-0 w-screen h-screen bg-black/10 backdrop-blur-[1px] grid place-items-center'>
      <section className='container relative max-w-max w-11/12 h-auto p-5 bg-white rounded-lg shadow-lg'>
        <header className='flex items-center w-full gap-3'>
          <div className='flex items-center justify-center p-3 border border-red-200/70 text-red-600 bg-red-100 rounded-xl'>
            <AlertCircle />
          </div>
          <div className='flex flex-col'>
            <h4 className='text-lg font-semibold text-gray-950'>Deseja deletar esse contato?</h4>
            <span className='text-sm text-gray-600'>Ao deletar o contato, o contato será deletado permanentemente.</span>
          </div>
        </header>

        <div className='flex justify-end w-full gap-3 mt-5'>
          <button
            type="button"
            className='h-10 mt-2  w-28 font-medium text-gray-900 transition-all duration-300 bg-white border border-neutral-400 rounded-xl hover:bg-neutral-400 hover:text-white'
            onClick={() => setShowModalDeleteContact(0)}
          >
            Cancelar
          </button>
          <button
            type="button"
            className='h-10 mt-2 w-28 font-medium text-white transition-all duration-300 border bg-red-600 rounded-xl hover:bg-white hover:text-red-600 hover:border-red-600'
            onClick={() => handleRequest()}
          >
            Deletar
          </button>
        </div>
      </section>
    </div>
  );
}