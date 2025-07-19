import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Layout from '@/components/layouts/layout'

interface CartItem {
  title: string;
  image: string;
  quantity: number;
}

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const updateCart = (items: CartItem[]) => {
    setCart(items);
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const increment = (title: string) => {
    updateCart(cart.map(item => item.title === title ? { ...item, quantity: item.quantity + 1 } : item));
  };
  const decrement = (title: string) => {
    updateCart(cart.map(item => item.title === title ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item));
  };
  const remove = (title: string) => {
    updateCart(cart.filter(item => item.title !== title));
  };
  const goToPay = () => {
    window.location.href = '/pay';
  };

  return (
    <Layout>
      <div className='text-white p-4 max-w-2xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6'>Carrito</h1>
        {cart.length === 0 ? (
          <p className='text-lg'>Tu carrito está vacío.</p>
        ) : (
          <div className='flex flex-col gap-4'>
            {cart.map(item => (
              <div key={item.title} className='flex items-center bg-gray-800 rounded-lg p-4 gap-4'>
                <Image src={item.image} alt={item.title} className='w-20 h-20 object-cover rounded' width={80} height={80} />
                <div className='flex-1'>
                  <div className='font-semibold text-lg'>{item.title}</div>
                </div>
                <div className='flex items-center gap-2'>
                  <button className='bg-gray-600 px-2 py-1 rounded text-xl' onClick={() => decrement(item.title)}>-</button>
                  <span className='w-8 text-center'>{item.quantity}</span>
                  <button className='bg-gray-600 px-2 py-1 rounded text-xl' onClick={() => increment(item.title)}>+</button>
                </div>
                <button className='ml-4 text-red-500 hover:text-red-700' onClick={() => remove(item.title)} title='Quitar'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            <button className='mt-6 bg-[#EF4343] text-white px-6 py-3 rounded-full font-bold text-lg' onClick={goToPay}>Ir a pagar</button>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Cart