import React from 'react'

const HeroTitle = () => {
  return (
    <h1 className="text-8xl font-bold text-[#f2a7a3] text-center tracking-tight m-20">
      FAST<br/>GOURMET
    </h1>
  )
}

const MediumTitle = ({ text }: { text: string }) => {
  return (
    <h2 className="text-xl font-semibold text-center mb-2">{text}</h2>
  )
}

export { HeroTitle, MediumTitle }