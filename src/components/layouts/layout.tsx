import React, {ReactNode} from 'react'
import { Nav, NavMobile } from '@/components/organisms/nav'

const Layout = ( {children} : {children: ReactNode} ) => {
  return (
    <div className='min-h-screen bg-[#040404]'>
      <Nav/>
      <NavMobile/>
      <div>{children}</div>
    </div>
  )
}

export default Layout