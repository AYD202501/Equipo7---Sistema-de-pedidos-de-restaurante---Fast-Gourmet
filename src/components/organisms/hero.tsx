import React from 'react'
import { HeroTitle } from '@/components/atoms/titles'
import FoodCards from '@/components/organisms/foodCards'

const Hero = () => {
  return (
        <main className='flex flex-col items-center justify-center w-full'>
            <HeroTitle />
            <FoodCards/>
        </main>
  )
}

export default Hero