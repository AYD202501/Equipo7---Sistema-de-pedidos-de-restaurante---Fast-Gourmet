import React from 'react'
import { CardItem } from '@/components/molecules/card'

const MenuItems = ( {cardDescriptions} : {cardDescriptions: Array<{ title: string; image: string; description: string }> } ) => {
  return (
    <div className='flex flex-col mt-6 gap-4 items-center justify-center'>
      {cardDescriptions.map((item) => (
        <CardItem
          key={item.title}
          title={item.title}
          image={item.image}
          description={item.description}
        />
      ))}
    </div>
  )
}

export default MenuItems