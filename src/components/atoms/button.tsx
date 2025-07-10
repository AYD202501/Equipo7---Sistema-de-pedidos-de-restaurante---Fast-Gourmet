import React from 'react'

const Button = ({ text, props } : { text: string, props?: string}) => {
  return (
    <button className={`bg-[#EF4343] w-fit cursor-pointer text-white text-center font-medium py-2 px-4 rounded-full ${props}`}>{text}</button>
  )
}

export default Button