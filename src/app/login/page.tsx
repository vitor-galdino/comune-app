'use client';
import { useEffect, useState } from 'react';

export default function Register() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <main>
      <div className={
        `fixed -z-20 bg-[url("../assets/background.png")] bg-no-repeat bg-cover bg-center bg-fixed h-screen w-screen transition duration-500
          ${animate ? 'scale-[2.5]' : 'scale-[1.3]'}
          `
      } />
      <div className='fixed -z-10 bg-[url("../assets/noise.png")] bg-no-repeat bg-cover bg-fixed h-full w-full' />
      <section></section>
    </main>
  );
}