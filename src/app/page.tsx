import Link from 'next/link';
import { kronaOne } from './layout';

export default function Home() {
  return (
    <main className='w-screen h-screen'>
      <div className='fixed -z-20 bg-[url("../assets/background.png")] bg-no-repeat bg-cover bg-center bg-fixed h-screen w-screen transition duration-500 scale-[1.3]' />
      <div className='fixed -z-10 bg-[url("../assets/noise.png")] bg-no-repeat bg-cover bg-fixed h-full w-full' />
      <section className='flex items-center justify-center w-full h-full p-16'>
        <div className='w-[560px] space-y-10 text-white'>
          <h1 className={`${kronaOne.className} font-extrabold text-6xl -tracking-widest`}>Comune</h1>
          <p className='text-2xl font-normal -tracking-normal'>
            A solução definitiva para organizar seus contatos.
            Com uma interface fácil de usar, o Comune permite que
            você gerencie seus contatos com eficiência e praticidade.
          </p>
          <Link
            href='/login'
            className='inline-block px-4 py-3 text-lg font-medium transition-all duration-300 bg-white border border-white sm:px-9 text-branding-blue rounded-xl hover:brightness-110 hover:bg-branding-blue/40 hover:text-white'
          >
            Entrar
          </Link>
          <span className='mx-4'>ou</span>
          <Link
            href='/register'
            className='inline-block px-4 py-3 text-lg font-medium transition-all duration-300 bg-white border border-white sm:px-9 text-branding-blue rounded-xl hover:brightness-110 hover:bg-branding-blue/40 hover:text-white'
          >
            Cadastre-se
          </Link>
        </div>
      </section>
    </main >
  );
}
