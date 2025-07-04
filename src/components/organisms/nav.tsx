import React, { useState } from 'react'
import NavTitle from '@/components/molecules/navTitle'
import Sidebar from '@/components/organisms/sidebar'

const Nav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between h-16 text-white px-8">
        <div onClick={() => setSidebarOpen(!sidebarOpen)} className="cursor-pointer">
          <NavTitle title='MENÚ' image='bars.webp' alt='Menú'/>
        </div>
        <div className="flex gap-4">
          <NavTitle title='CARRO' image='cart.webp' alt='Carro de compras'/>
          <NavTitle title='INICIAR SESIÓN' image='user.webp' alt='Iniciar sesión'/>
        </div>
      </nav>
      <Sidebar isVisible={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}

export default Nav