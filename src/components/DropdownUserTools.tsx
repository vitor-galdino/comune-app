'use client';
import { useDashboard } from '@/contexts/DashboardContext';
import { LogOut, User2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import nookies from 'nookies';
import { useEffect, useRef } from 'react';

interface DropdownUserToolsProps {
  setOpen: (value: boolean) => void;
}

export default function DropdownUserTools({ setOpen }: DropdownUserToolsProps) {
  const { setShowModalUserTools } = useDashboard();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleOutClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const element = dropdownRef.current;

      if (target.id == 'dropdownButton') return;

      if (element && !element.contains(target)) {
        setOpen(false);
      }
    };
    window.addEventListener('mousedown', handleOutClick);
    return () => window.removeEventListener('mousedown', handleOutClick);

  }, []);

  return (
    <div
      onClick={() => setOpen(false)}
      className='absolute z-40 right-0 -top-2 block py-1 mt-12 -mr-1 border border-gray-300 rounded-lg shadow-lg w-44 backdrop-blur-sm'
      ref={dropdownRef}
    >
      <label
        className='relative flex items-center justify-start px-4 py-2 text-gray-700 cursor-pointer decoration-clone hover:bg-gray-100/60'
        onClick={() => setShowModalUserTools(true)}
      >
        <div className='flex items-center gap-3 select-none'>
          <User2 strokeWidth={1.5} className='w-5 h-5 text-gray-700/90' />
          Conta
        </div>
        <div className='absolute bottom-0 left-0 right-0 w-11/12 h-px mx-auto bg-gray-300 rounded-full'></div>
      </label>
      <label
        className='relative flex items-center justify-start px-4 py-2 cursor-pointer hover:bg-red-100/40 text-red-500/90'
        onClick={() => {
          nookies.destroy(null, 'token');
          router.push('/');
        }}
      >
        <div className='flex items-center gap-3 select-none'>
          <LogOut strokeWidth={1.5} className='w-5 h-5 text-red-500/80' />
          Sair
        </div>
      </label>
    </div>
  );
}