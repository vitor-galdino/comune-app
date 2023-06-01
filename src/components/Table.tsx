'use client';
import { useDashboard } from '@/contexts/DashboardContext';
import { Download, Plus, Search } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import DropdownTools from './DropdownTools';

export default function Table() {
  const { userData, handleDownloadPDF, filterContactNameOnInput, filteredContacts } = useDashboard();
  const [open, setOpen] = useState<number>(0);
  const contactsData = filteredContacts.length ? filteredContacts : userData?.contacts;

  const headings = [
    { key: 'fullName', value: 'Nome' },
    { key: 'email', value: 'Email' },
    { key: 'phone', value: 'Telefone' },
    { key: 'createdAt', value: 'Data de Registro' },
    { key: 'empty', value: '' },
  ];

  return (
    <div className='container px-4 py-6 mx-auto'>
      <h1 className='py-4 mb-10 text-3xl font-bold text-gray-800 border-b'>Contatos</h1>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex-1 pr-4'>
          <div className='relative md:w-1/3 group'>
            <input
              type='text'
              className='w-full py-2 pl-10 pr-4 border-b border-transparent rounded-lg shadow focus:outline-none focus:border-b focus:border-branding-blue/60 hover:border-branding-blue/60'
              placeholder='Pesquisar contato...'
              onChange={(e: ChangeEvent<HTMLInputElement>) => filterContactNameOnInput(e.target.value)}
            />
            <div className='absolute top-0 bottom-0 left-0 inline-flex items-center p-2 text-gray-400/60 group-focus-within:text-branding-blue'>
              <Search className='w-5 h-5 ' strokeWidth={2.5} />
            </div>
          </div>
        </div>
        <div>
          <div className='flex gap-3 rounded-lg'>
            <div>
              <button onClick={handleDownloadPDF}
                className='flex items-center gap-2 px-2 py-2 font-semibold text-gray-500 bg-white rounded-lg shadow hover:text-branding-blue md:px-4'
              >
                <Download className='w-5 h-5' strokeWidth={2.5} />
                <span className='hidden md:block'>Relatório</span>
              </button>
            </div>
            <div>
              <button
                className='flex items-center gap-1 px-2 py-2 font-semibold text-gray-500 bg-white rounded-lg shadow hover:text-branding-blue md:px-4'
              >
                <Plus className='w-5 h-5' strokeWidth={2.5} />
                <span className='hidden md:block'>Adicionar Contato</span>
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
            {userData?.contacts && contactsData!.map((contact) => (
              <tr key={contact.id}>
                <td className='border-t border-gray-200 border-dashed'>
                  <span className='flex items-center px-6 py-3 text-gray-700'>
                    {contact.fullName}
                  </span>
                </td>
                <td className='border-t border-gray-200 border-dashed'>
                  <span className='flex items-center px-6 py-3 text-gray-700'>
                    {contact.email}
                  </span>
                </td>
                <td className='border-t border-gray-200 border-dashed'>
                  <span className='flex items-center px-6 py-3 text-gray-700'>
                    {contact.phone}
                  </span>
                </td>
                <td className='border-t border-gray-200 border-dashed'>
                  <span className='flex items-center px-6 py-3 text-gray-700'>
                    {contact.createdAt}
                  </span>
                </td>
                <td className='relative mt-2 mr-4 border-t border-gray-200 border-dashed '>
                  <DropdownTools contact={contact} open={open} setOpen={setOpen} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
