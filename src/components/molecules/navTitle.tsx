import React from 'react'
import { MediumTitle } from '@/components/atoms/titles'

const NavTitle = ({ title = 'Title', alt = 'Title', image = '/'} : {title: string, alt?: string, image: string}) => {
  return (
    <div className="flex gap-2">
      <img src={image} alt={alt} className="size-7 rounded-full mb-4"/>
      <MediumTitle text={title}/>
    </div>
  )
}

export default NavTitle