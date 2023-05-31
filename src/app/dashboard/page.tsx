'use client';
import Table from '@/components/Table';
import { UserAndContactsResponse } from '@/interfaces';
import { instance } from '@/services/api';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState<UserAndContactsResponse>();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await instance.get('/users');

        setData(res.data);
        return res.data;

      } catch (err) {
        console.error(err);
        throw new Error('Error');
      }
    }
    fetchUser();
  }, []);

  return (
    <main className='antialiased sans-serif bg-slate-100 h-screen'>
      <Table response={data?.contacts} />
    </main>
  );
}