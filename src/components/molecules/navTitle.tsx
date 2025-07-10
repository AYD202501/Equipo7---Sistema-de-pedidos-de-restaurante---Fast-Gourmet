import React from 'react'
import { MediumTitle } from '@/components/atoms/titles'
import Link from 'next/link'

const NavTitle = ({ title = 'Title', image = '/', link = '/'} : {title: string, alt?: string, image: string, link?: string}) => {
  return (
      <Link href={link} className="flex gap-2 hover:text-[#EF4343]">
        <img src={image} alt={title} className="size-7 rounded-full"/>
        <MediumTitle text={title}/>
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