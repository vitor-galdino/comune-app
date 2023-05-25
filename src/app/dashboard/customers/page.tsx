'use client';
import Table from '@/components/Table';
import { PersonResponse } from '@/interfaces';
import { instance } from '@/services/api';
import { useEffect, useState } from 'react';

export default function Customer() {
  const [data, setData] = useState<PersonResponse[]>([]);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await instance.get('/customers');

        setData([...res.data]);
        return res.data;

      } catch (err) {
        console.error(err);
        throw new Error('Error');
      }
    }
    fetchCustomers();
  }, []);

  return (
    <main className='antialiased sans-serif bg-slate-100 h-screen'>
      <Table response={data} type='customers' title='Clientes' />
    </main>
  );
}