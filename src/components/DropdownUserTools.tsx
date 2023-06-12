'use client';
import { useDashboard } from '@/contexts/DashboardContext';
import { LogOut, User2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import nookies from 'nookies';
import { useEffect, useRef, useState } from 'react';

interface DropdownUserToolsProps {
  setOpen: (value: boolean) => void;
  setAnimate: (value: boolean) => void;
}

export default function DropdownUserTools({ setOpen, setAnimate }: DropdownUserToolsProps) {
  const { setShowModalUserTools, userData } = useDashboard();
  const [shouldLeave, setShouldLeave] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleOutClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const element = dropdownRef.current;

      if (target.id == 'dropdownButton') return;

      if (element && !element.contains(target)) {
        setShouldLeave(0);
        setOpen(false);
      }
    };
    window.addEventListener('mousedown', handleOutClick);
    return () => window.removeEventListener('mousedown', handleOutClick);

  }, []);

  return (
    <div
      onClick={() => setOpen(false)}
      className='absolute z-[60] right-0 -top-4 block mt-12 -mr-1 border border-gray-300 bg-gray-100/50 rounded-lg shadow-lg w-60 backdrop-blur-sm'
      ref={dropdownRef}
    >
      <div
        className='relative flex items-center justify-start px-4 py-2 overflow-hidden text-gray-700 rounded-lg hover:bg-gray-100/60'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex flex-col w-full'>
          <span className='text-sm font-medium truncate w-full'>{userData?.fullName}</span>
          <span className='text-sm font-normal text-gray-500 truncate w-full'>{userData?.email}</span>
        </div>
        <div className='absolute bottom-0 left-0 right-0 w-11/12 h-px mx-auto bg-gray-300 rounded-full'></div>
      </div>
      <label
        className='relative flex items-center justify-start px-4 py-2 text-gray-700 rounded-lg cursor-pointer decoration-clone hover:bg-gray-100/60'
        onClick={() => setShowModalUserTools(true)}
      >
        <div className='flex items-center gap-3 select-none'>
          <User2 strokeWidth={1.5} className='w-5 h-5 text-gray-700/90' />
          Conta
        </div>
        <div className='absolute bottom-0 left-0 right-0 w-11/12 h-px mx-auto bg-gray-300 rounded-full'></div>
      </label>
      <label
        className='relative flex items-center justify-start px-4 py-2 rounded-lg cursor-pointer hover:bg-red-100/40 text-red-500/90'
        onClick={(e) => {
          if (!shouldLeave) {
            e.stopPropagation();
            setShouldLeave(1);
          }
          if (shouldLeave) {
            setShouldLeave(0);
            setAnimate(false);
            nookies.destroy(null, 'token');
            setTimeout(() => router.push('/'), 500);
          }
        }}
      >
        <div className='flex items-center gap-3 select-none'>
          <LogOut strokeWidth={1.5} className='w-5 h-5 text-red-500/80' />
          {!!shouldLeave ? 'Confirma Saída' : 'Sair'}
        </div>
      </label>
    </div>
  );
}