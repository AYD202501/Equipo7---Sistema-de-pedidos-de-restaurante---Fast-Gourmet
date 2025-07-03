import React from 'react'
import Card from '@/components/molecules/card'
import { link } from 'fs';

const categories = [
    {
        title: 'HAMBURGUESAS',
        image: 'burger.webp',
        link: '/burger',
    },
    {
        title: 'SANDWICHS',
        image: 'sandwich.webp',
        link: '/sandwichs',
    },
    {
        title: 'CARNES',
        image: 'meat.webp',
        link: '/meats',
    },
];

const foodCards = () => {
    return (
        <div className='flex flex-row gap-8 w-full justify-center px-8'>
            {categories.map((cat) => (
                <Card key={cat.title} title={cat.title} image={cat.image} link={cat.link}/>
            ))}
        </div>
    )
}
export default foodCards