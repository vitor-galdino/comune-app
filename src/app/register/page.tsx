'use client';
import BrandName from '@/components/BrandName';
import Input from '@/components/Input';
import { instance } from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import { RegisterData, registerSchema } from './registerSchema';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema)
  });
  const [animate, setAnimate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const { token } = parseCookies();
    if (token) redirect('/dashboard');
  }, []);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 300);
  }, []);

  function handleRegister(formData: RegisterData) {
    const res = instance.post('/users', formData)
      .then(() => router.push('/login'))
      .catch(err => {
        throw err;
      });

    toast.promise(res, {
      loading: 'Loading...',
      success: 'Cadastro concluído com sucesso!',
      error: 'Algo deu errado. Tente novamente!',
    });
  }

  return (
    <>
      <Toaster />
      <main className='flex justify-center sm:justify-normal'>
        <div className='overflow-hidden fixed z-10 left-0 w-screen h-20 justify-center rounded-bl-[70px] sm:hidden'>
          <div className='absolute inset-0 z-20 scale-[1.3] bg-[url("../assets/background.png")] bg-no-repeat bg-left bg-fixed bg-cover h-full w-full' />
          <div className='absolute inset-0 z-30 bg-[url("../assets/noise.png")] bg-no-repeat bg-cover bg-center bg-fixed h-full w-full' />
          <div className='absolute z-40 flex items-center justify-start w-full h-full ml-16'>
            <BrandName fontSize='md:text-6xl min-[660px]:text-4xl text-3xl' />
          </div>
        </div>
        <div className={`
        overflow-hidden fixed z-10 right-0 justify-center h-full w-full transition duration-500 hidden sm:flex
        ${animate && 'translate-x-[470px] rounded-l-[70px]'}
        `}>
          <div className='absolute inset-0 z-20 scale-[1.3] bg-[url("../assets/background.png")] bg-no-repeat bg-center bg-fixed bg-cover h-full w-full' />
          <div className={`
            absolute inset-0 z-30 bg-[url("../assets/noise.png")] bg-no-repeat bg-cover bg-center bg-fixed h-full w-full transition
            ${animate ? 'opacity-100' : 'opacity-40'}
          `} />
          <div className={`
            absolute z-40 w-full h-full flex items-center justify-center transition duration-500
            ${animate && '-translate-x-[238px]'}
          `}>
            <BrandName fontSize='md:text-6xl min-[660px]:text-4xl text-3xl' />
          </div>
        </div>
        <div className='sm:w-[470px] sm:px-0 container w-screen px-8'>
          <section className='flex flex-col items-center justify-center w-full h-screen'>
            <h2 className='mb-10 text-xl font-medium'>Bem vindo ao <span className='text-branding-blue'>Comune</span>!</h2>
            <form
              noValidate
              className='flex flex-col gap-4 w-full sm:w-max'
              onSubmit={handleSubmit(handleRegister)}
            >
              <Input
                type='text'
                placeholder='Digite seu nome...'
                label='Nome'
                id='name'
                register={register('fullName')}
                error={errors.fullName}
              />
              <Input
                type='email'
                placeholder='Digite seu e-mail...'
                label='E-mail'
                id='email'
                register={register('email')}
                error={errors.email}
              />
              <Input
                type='password'
                placeholder='Digite sua senha...'
                label='Senha'
                id='password'
                register={register('password')}
                error={errors.password}
              />
              <Input
                type='text'
                placeholder='Digite seu número de telefone...'
                label='Número de telefone'
                id='phone'
                register={register('phone')}
                error={errors.phone}
              />
              <button type="submit" className='h-10 mb-4 font-medium text-white transition-all duration-300 border bg-branding-blue rounded-xl hover:bg-white hover:text-branding-blue hover:border-branding-blue'>Criar</button>
            </form>
            <span>Já tem uma conta? <Link href='/login' className='text-branding-blue hover:underline decoration-branding-blue'>Login</Link></span>
          </section>
        </div>
      </main>
    </>
  );
}