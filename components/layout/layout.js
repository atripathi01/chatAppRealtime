import React from 'react'
import NavbarComponent from '../navbar'

const Layout = ({children}) => {
  return (
    <div>
     <NavbarComponent />
     {children}
    </div>
  )
}

export default Layout