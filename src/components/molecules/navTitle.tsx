import React, { MouseEventHandler, useEffect, useState } from 'react'
import { MediumTitle } from '@/components/atoms/titles'
import Link from 'next/link'

const NavTitle = ({ title = 'Title', image, link = '', onClick }: { title: string, alt?: string, image?: string, link?: string, onClick?: React.MouseEventHandler }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (title === 'Carrito') {
      const update = () => {
        const stored = localStorage.getItem('cart');
        setCartCount(stored ? JSON.parse(stored).length : 0);
      };
      update();
      window.addEventListener('storage', update);
      window.addEventListener('cartUpdate', update as any);
      return () => {
        window.removeEventListener('storage', update);
        window.removeEventListener('cartUpdate', update as any);
      };
    }
  }, [title]);

  return (
    <Link href={link} className="flex gap-2 hover:text-[#EF4343] relative" onClick={onClick}>
      {/* Esta línea es la que cambia: la imagen solo se muestra si la prop 'image' existe */}
      {image && <img src={image} alt={title} className="size-7 rounded-full" />}

      <MediumTitle text={title} />
      {title === 'Carrito' && cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#EF4343] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-black">{cartCount}</span>
      )}
    </Link>
  )
}

const MenuTitle = ({ title = 'Menu', image = 'bars.webp', alt = 'Menu' } : {title?: string, image?: string, alt?: string}) => {
  return (
    <div className="flex gap-2 cursor-pointer hover:text-[#EF4343]">
      <img src={image} alt={title} className="size-7 rounded-full"/>
      <MediumTitle text={title}/>
    </div>
  )
}

export { NavTitle, MenuTitle }