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
        const res = await instance.get('/users', {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg1MjkyOTQ5LCJleHAiOjE2ODUzNzkzNDl9.VbCHlclqx82pREHjYVejz8mjUhLZMqnqz6onscfareA'
          }
        });

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