import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MediumTitle, SmallTitle, SubText } from '@/components/atoms/titles'
import Button from '@/components/atoms/button'

const Card = ({ title, image, link } : { title: string, image: string, link: string }) => {
    return (
        <Link href={link} key={title} className='bg-[#EF4343] aspect-auto overflow-hidden w-96 flex flex-col rounded-2xl hover:scale-105 transition-transform duration-200 ease-in-out'>
            <Image src={image} alt={title} className='w-full object-fill' width={384} height={216} />
            <MediumTitle text={title} props='py-4 text-black'/>
        </Link>
    )
}

const CardItem = ({ title, image, description } : { title: string, image: string, description: string }) => {
    const handleAddToCart = () => {
        const stored = localStorage.getItem('cart');
        const cart = stored ? JSON.parse(stored) : [];
        const idx = cart.findIndex((item: any) => item.title === title);
        if (idx >= 0) {
            cart[idx].quantity += 1;
        } else {
            cart.push({ title, image, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cartUpdate'));
    };
    return (
        <div className='flex gap-8 items-center w-[900px]'>
            <Image src={image} alt={title} className='w-64 h-44 rounded-2xl object-cover bg-black' width={256} height={176} />
            <div className='flex-1 flex flex-col'>
                <div className='bg-gray-200 rounded-2xl pl-4 pr-10 py-2 mb-2 flex flex-col'>
                    <SmallTitle text={title} props='text-black'/>
                    <SubText text={description} props='mb-2'/>
                </div>
                <div className='flex flex-col justify-center items-end h-full'>
                    <Button text='Pedir' onClick={handleAddToCart}/>
                </div>
            </div>
        </div>
    )
}

export { Card, CardItem }