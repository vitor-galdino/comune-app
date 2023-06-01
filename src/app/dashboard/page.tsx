'use client';
import Table from '@/components/Table';
import { UserAndContactsResponse } from '@/interfaces';
import { instance } from '@/services/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState<UserAndContactsResponse>();
  const router = useRouter();

  useEffect(() => {
    instance.get('/users')
      .then(res => setData(res.data))
      .catch(err => {
        if (err.response.status === 401) {
          Cookies.remove('token');
          router.push('/');
        }
        throw err;
      });
  }, []);

  return (
    <main className='antialiased sans-serif bg-slate-100 h-screen'>
      <Table response={data?.contacts} />
    </main>
  );
}