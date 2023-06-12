'use client';
import { useDashboard } from '@/contexts/DashboardContext';
import { ContactResponse } from '@/interfaces';
import { Edit2, Mail, MoreVertical, Phone, Trash } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface DropdownToolsProps {
  contact: ContactResponse;
  open: number;
  setOpen: (value: number) => void;
}

export default function DropdownTools({ contact, open, setOpen }: DropdownToolsProps) {
  const { setShowModalEditContact, setShowModalDeleteContact } = useDashboard();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; }>({ top: 0, left: 0 });

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    let top = rect.bottom + window.scrollY - 45;
    let left = rect.right - 170 + window.scrollX;

    if (top + 220 > window.innerHeight + window.scrollY) {
      top = window.innerHeight + window.scrollY - 230;
    }

    setDropdownPosition({ top, left });
  };


  useEffect(() => {
    const handleOutClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const element = dropdownRef.current;

      if (target.id == 'dropdownButton') return;

      if (element && !element.contains(target)) {
        setOpen(0);
      }
    };
    window.addEventListener('mousedown', handleOutClick);
    return () => window.removeEventListener('mousedown', handleOutClick);

  }, []);

  return (
    <>
      <button
        onClick={(e) => {
          handleButtonClick(e);
          setOpen(open == contact.id ? 0 : contact.id);
        }}
        className={
          `flex items-center justify-center p-2 rounded-full w-9 h-9 hover:bg-gray-200/40 
           ${open == contact.id ? 'text-branding-blue bg-gray-200/40' : 'text-gray-700 hover:text-branding-blue'}`
        }
        id='dropdownButton'
      >
        <MoreVertical id='dropdownButton' />
      </button>
      {open == contact.id && (
        <div
          onClick={() => setOpen(0)}
          className='fixed z-40 block mt-12 -mr-1 border border-gray-300 bg-gray-50/60 rounded-lg shadow-lg w-44 backdrop-blur-sm'
          ref={dropdownRef}
          style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
        >
          <a href={`tel:${contact.phone}`} className='relative flex items-center justify-start px-4 py-2 text-gray-700 rounded-lg cursor-pointer decoration-clone hover:bg-white/40'>
            <div className='flex items-center gap-3 select-none'>
              <Phone strokeWidth={1.5} className='w-5 h-5 text-gray-700/90' />
              Ligar
            </div>
            <div className='absolute bottom-0 left-0 right-0 w-11/12 h-px mx-auto bg-gray-300 rounded-full'></div>
          </a>
          <a href={`mailto:${contact.email}`} className='relative flex items-center justify-start px-4 py-2 text-gray-700 cursor-pointer decoration-clone hover:bg-white/40'>
            <div className='flex items-center gap-3 select-none'>
              <Mail strokeWidth={1.5} className='w-5 h-5 text-gray-700/90' />
              Enviar Email
            </div>
            <div className='absolute bottom-0 left-0 right-0 w-11/12 h-px mx-auto bg-gray-300 rounded-full'></div>
          </a>
          <label
            onClick={() => setShowModalEditContact(contact.id)}
            className='relative flex items-center justify-start px-4 py-2 text-gray-700 cursor-pointer decoration-clone hover:bg-white/40'
          >
            <div className='flex items-center gap-3 select-none'>
              <Edit2 strokeWidth={1.5} className='w-5 h-5 text-gray-700/90' />
              Editar
            </div>
            <div className='absolute bottom-0 left-0 right-0 w-11/12 h-px mx-auto bg-gray-300 rounded-full'></div>
          </label>
          <label
            onClick={() => setShowModalDeleteContact(contact.id)}
            className='relative flex items-center justify-start px-4 py-2 cursor-pointer hover:bg-red-100/40 text-red-500/90'
          >
            <div className='flex items-center gap-3 select-none'>
              <Trash strokeWidth={1.5} className='w-5 h-5 text-red-500/80' />
              Deletar
            </div>
          </label>
        </div>
      )}
    </>
  );
}