import React, { useState } from 'react';
import { NavTitle, MenuTitle } from '@/components/molecules/navTitle';
import Sidebar from '@/components/organisms/sidebar';
import { useSession, signIn, signOut } from "next-auth/react";
import Image from 'next/image';

const Nav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // 1. Usamos el hook para obtener la sesión del usuario
  const { data: session } = useSession();

  return (
    <div className='hidden sm:block'>
      <nav className="flex items-center justify-between h-16 text-white px-8">
        <div onClick={() => setSidebarOpen(!sidebarOpen)} className="menu cursor-pointer">
          <MenuTitle title='Menú' image='bars.webp' alt='Menú' />
        </div>
        
        {/* --- Esta es la sección que ahora es dinámica --- */}
        <div className="flex gap-4 items-center">
          <NavTitle title='Carrito' image='cart.webp' alt='Carro de compras' link='/cart' />

          { session ? (
            // 2. SI EL USUARIO HA INICIADO SESIÓN, se muestra esto:
            <>
              <div className="flex items-center gap-2">
                <Image
                  src={session.user?.image || '/user.webp'} // Usa la imagen del usuario o una por defecto
                  alt={session.user?.name || 'Usuario'}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span>{session.user?.name}</span>
              </div>
              {/* Usamos NavTitle para el botón de cerrar sesión para mantener el estilo */}
              <NavTitle title="Cerrar Sesión" onClick={() => signOut()} />
            </>
          ) : (
            // 3. SI EL USUARIO NO HA INICIADO SESIÓN, se muestra esto:
            <>
              <NavTitle 
                title='Iniciar Sesión' 
                image='user.webp' 
                alt='Iniciar sesión' 
                onClick={() => signIn('auth0')} 
              />
              {/* Un NavTitle para el botón de registrarse */}
              <NavTitle 
                title='Registrarse' 
                onClick={() => signIn('auth0', undefined, { prompt: 'login', screen_hint: 'signup' })}
              />
            </>
          )}
        </div>
      </nav>
      <div className='absolute px-8'>
        <Sidebar isVisible={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
    </div>
  );
};

const NavMobile = () => {
  return (
    <div className='flex sm:hidden'>
      {/* Aquí podrías desarrollar la versión móvil en el futuro */}
    </div>
  );
};

export { Nav, NavMobile };