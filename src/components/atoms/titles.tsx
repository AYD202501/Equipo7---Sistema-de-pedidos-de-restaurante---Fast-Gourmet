import React from 'react'

const HeroTitle = () => {
  return (
    <h1 className="text-8xl font-bold text-[#f2a7a3] text-center tracking-tight m-20">
      FAST<br/>GOURMET
    </h1>
  )
}

const MediumTitle = ({ text, props }: { text: string, props?:  string}) => {
  return (
    <h2 className={`text-xl font-semibold text-center mb-2 ${props}`}>{text}</h2>
  )
}

const SmallTitle = ({ text, props }: { text: string, props?:  string}) => {
  return (
    <h3 className={`text-[16px] font-semibold text-left mb-2 ${props}`}>{text}</h3>
  )
}

const SubText = ({ text, props }: { text: string, props?:  string}) => {
  return (
    <p className={`text-[12px] text-black font-semibold ${props}`}>{text}</p>
  )
}

export { HeroTitle, MediumTitle, SmallTitle, SubText }