'use client';
import { ContactResponse, UserAndContactsResponse } from '@/interfaces';
import { instance } from '@/services/api';
import { saveAs } from 'file-saver';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
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
  handleDownloadPDF: () => Promise<void>;
  filterContactNameOnInput: (event: string) => void;
}

const DashboardContext = createContext({} as DashboardContextData);

export function DashboardProvider({ children }: Props) {
  const [userData, setUserData] = useState<UserAndContactsResponse>();
  const [contactsData, setContactsData] = useState<ContactResponse[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<ContactResponse[]>([]);
  const [showModalCreateContact, setShowModalCreateContact] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    instance.get<UserAndContactsResponse>('/users')
      .then(({ data }) => {
        setContactsData(data.contacts);
        setUserData(data);
      })
      .catch(err => {
        if (err.response.status === 401) {
          Cookies.remove('token');
          router.push('/');
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
    const searchValue = inputValue.toLowerCase();
    const filtered = userData?.contacts.filter(({ fullName }) => fullName.toLowerCase().includes(searchValue));
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
      handleDownloadPDF,
      filterContactNameOnInput,
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);