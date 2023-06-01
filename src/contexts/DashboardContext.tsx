'use client';
import { UserAndContactsResponse } from '@/interfaces';
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
  handleDownloadPDF: () => Promise<void>;
}

const DashboardContext = createContext({} as DashboardContextData);

export function DashboardProvider({ children }: Props) {
  const [userData, setUserData] = useState<UserAndContactsResponse>();
  const router = useRouter();

  useEffect(() => {
    instance.get('/users')
      .then(res => setUserData(res.data))
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

  return (
    <DashboardContext.Provider value={{
      userData,
      setUserData,
      handleDownloadPDF,
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);