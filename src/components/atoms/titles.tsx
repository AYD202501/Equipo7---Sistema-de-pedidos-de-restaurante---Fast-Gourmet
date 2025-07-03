import React from 'react'

// #f2a7a3
// #e3817c
// #e58a85
// #e38884

const HeroTitle = () => {
  return (
    <h1 className="text-8xl font-bold text-[#e38884] text-center tracking-tight m-20">
      FAST<br/>GOURMET
    </h1>
  )
}

const MediumTitle = ({ text }: { text: string }) => {
  return (
    <h2 className="text-2xl font-semibold text-center mb-2">{text}</h2>
  )
}

const SideBarTitle = () => {
  return (
    <h3></h3>
  )
}

const SubText = () => {
  return (
    <p></p>
  )
}

export { HeroTitle, MediumTitle, SideBarTitle, SubText }