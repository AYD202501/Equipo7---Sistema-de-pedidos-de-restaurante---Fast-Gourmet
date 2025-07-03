import React from 'react'
import NavTitle from '@/components/molecules/navTitle'

const Nav = () => {
  return (
    <nav className="flex items-center justify-between h-16 text-white px-8">
        <NavTitle title='MENÚ' image='cart.webp' alt='Menú'/>
      <div className="flex gap-4">
        <NavTitle title='CARRO' image='cart.webp' alt='Carro de compras'/>
        <NavTitle title='INICIAR SESIÓN' image='user.webp' alt='Iniciar sesión'/>
      </div>
    </nav>
  )
}

export default Nav