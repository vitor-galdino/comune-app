'use client';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import DropdownTools from './DropdownTools';
import { PersonResponse } from '@/interfaces';

interface TableProps {
  response: PersonResponse[];
  type: 'customers' | 'contacts';
  title: string;
}

export default function Table({ response, type, title }: TableProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [open, setOpen] = useState<number>(0);

  const headings = [
    { key: 'fullName', value: 'Nome' },
    { key: 'email', value: 'Email' },
    { key: 'phone', value: 'Telefone' },
    { key: 'createdAt', value: 'Data de Registro' },
    { key: 'empty', value: '' },
  ];

  return (
    <div className='container px-4 py-6 mx-auto'>
      <h1 className='py-4 mb-10 text-3xl font-bold text-gray-800 border-b'>{title}</h1>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex-1 pr-4'>
          <div className='relative md:w-1/3'>
            <input
              type='search'
              className='w-full py-2 pl-10 pr-4 font-medium text-gray-600 rounded-lg shadow focus:outline-none'
              placeholder='Search...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className='absolute top-0 bottom-0 left-0 inline-flex items-center p-2 text-gray-400/60'>
              <Search className='w-5 h-5 ' strokeWidth={2.5} />
            </div>
          </div>
        </div>
        <div>
          <div className='flex rounded-lg shadow'>
            <div>
              <button
                className='flex items-center gap-1 px-2 py-2 font-semibold text-gray-500 bg-white rounded-lg hover:text-blue-500 md:px-4'
              >
                <Plus className='w-5 h-5' strokeWidth={2.5} />
                <span className='hidden md:block'>Adicionar {title.slice(0, title.length - 1)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='relative overflow-x-auto overflow-y-auto bg-white rounded-lg shadow' style={{ height: '405px' }}>
        <table className='relative w-full whitespace-no-wrap bg-white border-collapse table-auto table-striped'>
          <thead>
            <tr className='text-left'>
              {headings.map((heading) => (
                <th
                  key={heading.key}
                  className={`bg-gray-100 sticky top-0 z-50 border-b border-gray-200 px-6 py-4 text-gray-600 font-bold tracking-wider uppercase text-xs`}
                >
                  {heading.value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className=''>
            {response.map((person) => (
              <tr key={person.id}>
                <td className='border-t border-gray-200 border-dashed'>
                  <span className='flex items-center px-6 py-3 text-gray-700'>
                    {person.fullName}
                  </span>
                </td>
                <td className='border-t border-gray-200 border-dashed'>
                  <span className='flex items-center px-6 py-3 text-gray-700'>
                    {person.email}
                  </span>
                </td>
                <td className='border-t border-gray-200 border-dashed'>
                  <span className='flex items-center px-6 py-3 text-gray-700'>
                    {person.phone}
                  </span>
                </td>
                <td className='border-t border-gray-200 border-dashed'>
                  <span className='flex items-center px-6 py-3 text-gray-700'>
                    {person.createdAt}
                  </span>
                </td>
                <td className='relative mt-2 mr-4 border-t border-gray-200 border-dashed '>
                  <DropdownTools person={person} open={open} setOpen={setOpen} type={type} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
