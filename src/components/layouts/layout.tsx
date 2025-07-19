import React, {ReactNode} from 'react'
import { Nav, NavMobile } from '@/components/organisms/nav'

const Layout = ( {children, sideBarOpen} : {children: ReactNode, sideBarOpen?: boolean} ) => {
  return (
    <div className='min-h-screen bg-[#040404]'>
      <Nav sideBarOpen={sideBarOpen}/>
      <NavMobile/>
      <div>{children}</div>
    </div>
  )
}

export default Layout