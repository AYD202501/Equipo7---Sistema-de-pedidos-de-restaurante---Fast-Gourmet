import React, { useState } from 'react'
import { NavTitle, MenuTitle } from '@/components/molecules/navTitle'
import Sidebar from '@/components/organisms/sidebar'
import { signIn } from 'next-auth/react'

const logIn = () => {
  signIn ('auth0', {
    callbackUrl: `${window.location.origin}/`
  });
};

const Nav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className='hidden sm:block'>
      <nav className="flex items-center justify-between h-16 text-white px-8">
        <div onClick={() => setSidebarOpen(!sidebarOpen)} className="menu cursor-pointer">
          <MenuTitle title='Menú' image='bars.webp' alt='Menú'/>
        </div>
        <div className="flex gap-4">
          <NavTitle title='Carrito' image='cart.webp' alt='Carro de compras' link='/cart'/>
          <NavTitle title='Iniciar Sesión' image='user.webp' alt='Iniciar sesión' link='/login' onClick={logIn}/>
        </div>
      </nav>
      <div className='absolute px-8'>
        <Sidebar isVisible={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
    </div>
  )
}

const NavMobile = () => {
  return (
    <div className='flex sm:hidden'>

    </div>
  )
}

export { Nav, NavMobile }