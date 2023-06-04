'use client';
import { ContactResponse, UserAndContactsResponse } from '@/interfaces';
import { instance } from '@/services/api';
import { saveAs } from 'file-saver';
import { redirect } from 'next/navigation';
import nookies, { parseCookies } from 'nookies';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

interface DashboardContextData {
  userData: UserAndContactsResponse | undefined;
  setUserData: React.Dispatch<React.SetStateAction<UserAndContactsResponse | undefined>>;
  contactsData: ContactResponse[];
  setContactsData: React.Dispatch<React.SetStateAction<ContactResponse[]>>;
  filteredContacts: ContactResponse[];
  setFilteredContacts: React.Dispatch<React.SetStateAction<ContactResponse[]>>;
  showModalCreateContact: boolean;
  setShowModalCreateContact: React.Dispatch<React.SetStateAction<boolean>>;
  showModalEditContact: number;
  setShowModalEditContact: React.Dispatch<React.SetStateAction<number>>;
  showModalDeleteContact: number;
  setShowModalDeleteContact: React.Dispatch<React.SetStateAction<number>>;
  showModalUserTools: boolean;
  setShowModalUserTools: React.Dispatch<React.SetStateAction<boolean>>;
  showModalUserDelete: boolean;
  setShowModalUserDelete: React.Dispatch<React.SetStateAction<boolean>>;
  handleDownloadPDF: () => Promise<void>;
  filterContactNameOnInput: (event: string) => void;
}

const DashboardContext = createContext({} as DashboardContextData);

export function DashboardProvider({ children }: Props) {
  const [userData, setUserData] = useState<UserAndContactsResponse>();
  const [contactsData, setContactsData] = useState<ContactResponse[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<ContactResponse[]>([]);
  const [showModalCreateContact, setShowModalCreateContact] = useState<boolean>(false);
  const [showModalEditContact, setShowModalEditContact] = useState<number>(0);
  const [showModalDeleteContact, setShowModalDeleteContact] = useState<number>(0);
  const [showModalUserTools, setShowModalUserTools] = useState<boolean>(false);
  const [showModalUserDelete, setShowModalUserDelete] = useState<boolean>(false);

  useEffect(() => {
    const { token } = parseCookies();
    if (!token) redirect('/');
  }, []);

  useEffect(() => {
    instance.get<UserAndContactsResponse>('/users')
      .then(({ data }) => {
        setContactsData(data.contacts);
        setUserData(data);
      })
      .catch(err => {
        if (err.response.status === 401) {
          nookies.destroy(null, 'token');
          redirect('/login');
        }
        throw err;
      });
  }, []);

  async function handleDownloadPDF() {
    try {
      const res = await instance.get('/reports', {
        responseType: 'blob'
      });

      const date = new Date();
      const formattedDateTime = date.toLocaleString('pt-BR')
        .replaceAll('/', '-')
        .split(',')[0];
      const fileName = `relatorio_${formattedDateTime}`;
      saveAs(res.data, fileName);

    } catch (err) {
      throw err;
    }
  }

  function filterContactNameOnInput(inputValue: string) {
    console.log(inputValue);
    const searchValue = inputValue.toLowerCase();
    const filtered = userData?.contacts.filter(({ fullName }) => fullName.toLowerCase().includes(searchValue));
    console.log(filtered);
    if (filtered) {
      setFilteredContacts([...filtered]);
    }
  }

  return (
    <DashboardContext.Provider value={{
      userData,
      setUserData,
      contactsData,
      setContactsData,
      filteredContacts,
      setFilteredContacts,
      showModalCreateContact,
      setShowModalCreateContact,
      showModalEditContact,
      setShowModalEditContact,
      showModalDeleteContact,
      setShowModalDeleteContact,
      showModalUserTools,
      setShowModalUserTools,
      showModalUserDelete,
      setShowModalUserDelete,
      handleDownloadPDF,
      filterContactNameOnInput,
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);