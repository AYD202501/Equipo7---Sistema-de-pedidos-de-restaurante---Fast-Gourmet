import React from 'react'

const Button = ({ text, props, onClick } : { text: string, props?: string, onClick?: () => void }) => {
  return (
    <button onClick={onClick} className={`bg-[#EF4343] w-fit cursor-pointer text-white text-center font-medium py-2 px-4 rounded-full ${props}`}>{text}</button>
  )
}

export default Button