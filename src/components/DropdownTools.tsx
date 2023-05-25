'use client';
import { PersonResponse } from '@/interfaces';
import { Download, Edit2, MoreVertical, Trash, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface DropdownToolsProps {
  person: PersonResponse;
  open: number;
  setOpen: (value: number) => void;
  type: 'customers' | 'contacts';
}

export default function DropdownTools({ person, open, setOpen, type }: DropdownToolsProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; }>({ top: 0, left: 0 });

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    let top = rect.bottom + window.scrollY - 45;
    let left = rect.right - 170 + window.scrollX;

    if (top + 200 > window.innerHeight + window.scrollY) {
      top = window.innerHeight + window.scrollY - 187;
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
          setOpen(open == person.id ? 0 : person.id);
        }}
        className={
          `flex items-center justify-center p-2 text-gray-700 rounded-full w-9 h-9 hover:bg-gray-200/40 hover:text-blue-500 
           ${open == person.id && 'text-blue-500 bg-gray-200/40'}`
        }
        id='dropdownButton'
      >
        <MoreVertical id='dropdownButton' />
      </button>
      {open == person.id && (
        <div
          onClick={() => setOpen(0)}
          className='fixed z-40 block w-44 py-1 mt-12 -mr-1 rounded-lg shadow-lg backdrop-blur-sm border border-gray-100'
          ref={dropdownRef}
          style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
        >
          {type == 'customers' && (
          <label className='flex cursor-pointer relative decoration-clone items-center justify-start px-4 py-2 hover:bg-gray-100/60 text-gray-700'>
            <div className='select-none flex gap-3 items-center'>
              <User strokeWidth={1.5} className='text-gray-700/90 w-5 h-5' />
              Ver Contatos
            </div>
            <div className='absolute bottom-0 left-0 right-0 h-px w-11/12 bg-gray-300 mx-auto rounded-full'></div>
          </label>)}
          <label className='flex cursor-pointer relative decoration-clone items-center justify-start px-4 py-2 hover:bg-gray-100/60 text-gray-700'>
            <div className='select-none flex gap-3 items-center'>
              <Edit2 strokeWidth={1.5} className='text-gray-700/90 w-5 h-5' />
              Editar
            </div>
            <div className='absolute bottom-0 left-0 right-0 h-px w-11/12 bg-gray-300 mx-auto rounded-full'></div>
          </label>
          <label className='flex cursor-pointer relative items-center justify-start px-4 py-2 hover:bg-gray-100/60 text-gray-700'>
            <div className='select-none flex gap-3 items-center'>
            <Download strokeWidth={1.5} className='text-gray-700/90 w-5 h-5' />
              Relatório
            </div>
            <div className='absolute bottom-0 left-0 right-0 h-px w-11/12 bg-gray-300 mx-auto rounded-full'></div>
          </label>
          <label className='flex cursor-pointer relative items-center justify-start px-4 py-2 hover:bg-red-100/40 text-red-500/90'>
            <div className='select-none flex gap-3 items-center'>
            <Trash strokeWidth={1.5} className='text-red-500/80 w-5 h-5' />
              Deletar
            </div>
          </label>
        </div>
      )}
    </>
  );
}