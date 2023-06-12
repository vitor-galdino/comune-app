'use client';
import { useDashboard } from '@/contexts/DashboardContext';
import { ChevronDown, Download, GripVertical, Plus, Search, UserCircle2 } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Toaster } from 'sonner';
import BrandName from './BrandName';
import DropdownTools from './DropdownTools';
import DropdownUserTools from './DropdownUserTools';
import ModalCreateContact from './ModalCreateContact';
import ModalDeleteContact from './ModalDeleteContact';
import ModalEditContact from './ModalEditContact';
import ModalUserDelete from './ModalUserDelete';
import ModalUserTools from './ModalUserTools';

export default function Table() {
  const {
    userData,
    contactsData,
    handleDownloadPDF,
    filterContactNameOnInput,
    filteredContacts,
    setShowModalCreateContact,
    showModalCreateContact,
    showModalEditContact,
    showModalDeleteContact,
    showModalUserTools,
    showModalUserDelete,
  } = useDashboard();
  const [dropdownTools, setDropdownTools] = useState<number>(0);
  const [dropdownUserTools, setDropdownUserTools] = useState<boolean>(false);

  const [currentContacts, setCurrentContacts] = useState(
    filteredContacts.length ? filteredContacts : contactsData
  );

  useEffect(() => {
    setCurrentContacts(filteredContacts.length ? filteredContacts : contactsData);
  }, [contactsData, filteredContacts]);

  const headings = [
    { key: 'dragHandle', value: '' },
    { key: 'fullName', value: 'Nome' },
    { key: 'email', value: 'Email' },
    { key: 'phone', value: 'Telefone' },
    { key: 'createdAt', value: 'Data de Registro' },
    { key: 'empty', value: '' },
  ];

  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    const newContacts = [...currentContacts];
    const [removed] = newContacts.splice(result.source.index, 1);
    newContacts.splice(result.destination.index, 0, removed);

    setCurrentContacts(newContacts);
  }

  return (
    <>
      <Toaster />
      <div className='fixed z-40 left-0 right-0 top-0 w-full h-20 justify-center rounded-bl-[40px]'>
        <div className='overflow-hidden absolute w-full h-full rounded-bl-[40px] justify-center'>
          <div className='absolute inset-0 z-20 scale-[1.3] bg-[url("../assets/background.png")] bg-no-repeat bg-left bg-fixed bg-cover h-full w-full' />
          <div className='absolute inset-0 z-30 bg-[url("../assets/noise.png")] bg-no-repeat bg-cover bg-center bg-fixed h-full w-full' />
        </div>
        <div className='container relative z-40 flex items-center justify-between h-full px-4 mx-auto '>
          <BrandName fontSize='text-3xl' />
          <div className='relative flex items-end mt-3'>
            <button
              onClick={() => setDropdownUserTools(!dropdownUserTools)}
              className='flex items-end justify-center gap-1 bg-branding-blue/30 py-[2px] px-[3px] rounded-xl transition duration-300 focus:bg-branding-blue/50 hover:bg-branding-blue/50'
              id='dropdownButton'
            >
              <span id='dropdownButton' className='self-center text-white sm:mr-1'>
                <UserCircle2 id='dropdownButton' size={25} />
              </span>
              <span id='dropdownButton' className='hidden font-medium text-white text-stroke sm:block'>{userData?.fullName}</span>
              <span id='dropdownButton' className={`text-white mb-[1.5px] ${dropdownUserTools ? 'rotate-180' : 'rotate-0'} transition ease-out duration-300`}>
                <ChevronDown id='dropdownButton' size={20} strokeWidth={2.75} />
              </span>
            </button>
            {dropdownUserTools && <DropdownUserTools setOpen={setDropdownUserTools} />}
          </div>
        </div>
      </div>
      <div className='container px-4 py-6 mx-auto'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex-1 pr-4'>
            <div className='relative md:w-1/3 group'>
              <input
                type='text'
                className='w-full py-2 pb-1 pl-10 pr-2 text-base border-b-2 border-gray-200 focus:outline-none focus:border-branding-blue hover:border-branding-blue'
                placeholder='Pesquisar contato...'
                onChange={(e: ChangeEvent<HTMLInputElement>) => filterContactNameOnInput(e.target.value)}
              />
              <div className='absolute top-0 bottom-0 left-0 inline-flex items-center p-2 text-gray-400/60 group-hover:text-branding-blue group-focus-within:text-branding-blue'>
                <Search className='w-5 h-5 ' strokeWidth={2.5} />
              </div>
            </div>
          </div>
          <div>
            <div className='flex gap-3 rounded-lg'>
              <div>
                <button onClick={handleDownloadPDF}
                  className='flex items-center gap-2 px-2 py-2 font-medium text-gray-500 bg-white border-b-2 border-gray-200 hover:border-branding-blue hover:text-branding-blue md:px-4'
                >
                  <Download className='w-5 h-5' strokeWidth={2.5} />
                  <span className='hidden md:block'>Relatório</span>
                </button>
              </div>
              <div>
                <button
                  className='flex items-center gap-1 px-2 py-2 font-medium text-gray-500 bg-white border-b-2 border-gray-200 hover:border-branding-blue hover:text-branding-blue md:px-4'
                  onClick={() => setShowModalCreateContact(true)}
                >
                  <Plus className='w-5 h-5' strokeWidth={2.5} />
                  <span className='hidden md:block'>Adicionar Contato</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <div className='relative overflow-x-auto overflow-y-auto bg-gray-100 rounded-lg shadow-xl shadow-gray-200 border border-gray-200 h-[408px]'>
                  <table className='relative w-full bg-gray-100 border-collapse table-auto'>
                    <thead>
                      <tr className='text-left'>
                        {headings.map((heading) => (
                          <th
                            key={heading.key}
                            className={`
                            bg-gray-200 sticky top-0 z-10 border-b border-gray-200 ${heading.key == 'dragHandle' ? 'pl-6 pr-1' : heading.key == 'empty' ? '' : 'px-6'} py-4 text-gray-500 font-bold tracking-wider uppercase text-xs
                            ${heading.key == 'fullName' && 'pl-10'}
                            `}
                          >
                            {heading.value}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {contactsData && currentContacts.map((contact, index) => (
                        <Draggable key={contact.id} draggableId={contact.id.toString()} index={index}>
                          {(provided, snapshot) => (
                            <tr
                              className={`
                              relative bg-gray-100 border border-gray-200 ${snapshot.isDragging ? 'flex justify-between items-center bg-gray-100/70 backdrop-blur-sm pl-10 pr-4 rounded-lg border-gray-300' : ''
                                }`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <td
                                className='absolute left-0 flex items-center justify-center h-full'
                              >
                                <span
                                  className='w-full h-full flex items-center px-6 py-3 text-gray-400 hover:text-branding-blue'
                                  {...provided.dragHandleProps}
                                >
                                  <GripVertical size={20} strokeWidth={1.5} />
                                </span>
                              </td>
                              <td className=''>
                                <span className='flex items-center px-6 pl-10 pr-3 text-gray-700'>
                                  {contact.fullName}
                                </span>
                              </td>
                              <td className=''>
                                <span className='flex items-center px-6 py-3 text-gray-700'>
                                  {contact.email}
                                </span>
                              </td>
                              <td className=''>
                                <span className='flex items-center px-6 py-3 text-gray-700'>
                                  {contact.phone}
                                </span>
                              </td>
                              <td className=''>
                                <span className='flex items-center px-6 py-3 text-gray-700'>
                                  {new Date(contact.createdAt).toLocaleDateString('pt-BR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    timeZone: 'UTC',
                                  })
                                  }
                                </span>
                              </td>
                              <td className='relative'>
                                <DropdownTools contact={contact} open={dropdownTools} setOpen={setDropdownTools} />
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      ))}
                    </tbody>
                  </table>
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {showModalCreateContact && <ModalCreateContact />}
      {!!showModalEditContact && <ModalEditContact />}
      {!!showModalDeleteContact && <ModalDeleteContact />}
      {showModalUserTools && <ModalUserTools />}
      {showModalUserDelete && <ModalUserDelete />}
    </>
  );
}
