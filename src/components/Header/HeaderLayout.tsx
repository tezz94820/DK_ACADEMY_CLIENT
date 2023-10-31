import React from 'react'
import Header from './index'

type HeaderLayoutProps = {
    children: React.ReactNode;
}
function HeaderLayout({children} : HeaderLayoutProps) {
  return (
    <>
      <Header />
      {children}  
    </>
  )
}

export default HeaderLayout