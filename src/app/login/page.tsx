'use client';
import BrandName from '@/components/BrandName';
import { instance, setAuthToken } from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import { LoginData, loginSchema } from './loginSchema';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema)
  });
  const [animate, setAnimate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setAnimate(true), 300);
  }, []);

  function handleLogin(formData: LoginData) {
    const res = instance.post('/login', formData)
      .then(({ data }) => {
        setAuthToken(data.token);
        router.push('/dashboard');
      })
      .catch(err => {
        throw err;
      });

    toast.promise(res, {
      loading: 'Loading...',
      success: 'Entrando...',
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
            <h2 className='mb-10 text-2xl font-medium'>Bem vindo de volta ao <span className='text-branding-blue'>Comune</span>!</h2>
            <form
              noValidate
              className='flex flex-col w-full sm:w-max'
              onSubmit={handleSubmit(handleLogin)}
            >
              <label htmlFor="email" className='font-normal text-gray-700'>E-mail</label>
              <input
                className='outline-none max-w-[95%] sm:w-80 w-full text-base pb-1 border-b-2 border-gray-200 focus:border-branding-blue hover:border-branding-blue'
                type="email"
                id="email"
                placeholder='Digite seu e-mail...'
                {...register('email')}
              />
              {!!errors.email && <span className='mt-2 text-sm text-red-500'>{errors.email.message}</span>}
              <label htmlFor="password" className='mt-4 font-normal text-gray-700'>Senha</label>
              <input
                className='outline-none max-w-[95%] sm:w-80 w-full text-base pb-1 border-b-2 border-gray-200 focus:border-branding-blue hover:border-branding-blue'
                type="password"
                id="password"
                placeholder='Digite sua senha...'
                {...register('password')}
              />
              {!!errors.password && <span className='mt-2 text-sm text-red-500'>{errors.password.message}</span>}
              <button type="submit" className='h-10 mt-4 mb-4 font-medium text-white transition-all duration-300 border bg-branding-blue rounded-xl hover:bg-white hover:text-branding-blue hover:border-branding-blue'>Entrar</button>
            </form>
            <span>Ainda não tem uma conta? <Link href='/register' className='text-branding-blue hover:underline decoration-branding-blue'>Cadastra-se</Link></span>
          </section>
        </div>
      </main>
    </>
  );
}