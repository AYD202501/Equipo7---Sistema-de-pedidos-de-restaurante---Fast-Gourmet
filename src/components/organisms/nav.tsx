import React, { useState } from 'react';
import { NavTitle, MenuTitle } from '@/components/molecules/navTitle';
import Sidebar from '@/components/organisms/sidebar';
import { useSession, signIn, signOut } from "next-auth/react";
import Image from 'next/image';

const Nav = ( {sideBarOpen = true} : {sideBarOpen?: boolean} ) => {
  const [sidebarOpen, setSidebarOpen] = useState(sideBarOpen);
  // 1. Usamos el hook para obtener la sesión del usuario
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

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
            <div className="relative">
              <div className="cursor-pointer" onClick={() => setShowDropdown((prev) => !prev)} tabIndex={0}>
                <NavTitle title={session.user?.name || 'Usuario'} image={session.user?.image || '/user.webp'} alt={session.user?.name || 'Usuario'} />
              </div>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-gray-800 rounded-lg shadow-lg z-50 text-white flex flex-col" tabIndex={0} onBlur={() => setShowDropdown(false)}
                >
                  <button className="px-4 py-2 cursor-pointer hover:text-[#EF4343] text-left" onClick={() => {setShowDropdown(false); window.location.href = '/config'}}>Ajustes</button>
                  {session.user?.role === 'ADMIN' && (
                  <button className="px-4 py-2 cursor-pointer hover:text-[#EF4343] text-left" onClick={() => {setShowDropdown(false); window.location.href = '/users'}}>Usuarios</button>)}
                  <button className="px-4 py-2 cursor-pointer hover:text-[#EF4343] text-left" onClick={() => {setShowDropdown(false); signOut(); }}>Cerrar sesión</button>
                </div>
              )}
            </div>
          ) : (
            // 3. SI EL USUARIO NO HA INICIADO SESIÓN, se muestra esto:
            <NavTitle title='Iniciar Sesión' image='user.webp' alt='Iniciar sesión' onClick={() => signIn('auth0')}/>
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