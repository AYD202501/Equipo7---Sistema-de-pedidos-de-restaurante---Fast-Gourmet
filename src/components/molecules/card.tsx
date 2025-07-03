import React from 'react'
import Link from 'next/link'

const Card = ({ title, image, link } : { title: string, image: string, link: string }) => {
    return (
        <Link href={link} key={title} className='bg-[#EF4343] overflow-hidden w-96 flex flex-col rounded-2xl'>
            <img src={image} alt={title} className='w-full object-fill' loading="lazy"/>
            <div className='py-4 text-black text-xl font-semibold text-center tracking-wide'>{title}</div>
        </Link>
    )
}

export default Card