'use client'

import { ReactNode } from 'react'
import { Header } from '../modules/Header/Header'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { MobileNavbar } from '../modules/MobileNavbar/MobileNavbar'

const Layout = ({ children }: { children: ReactNode }) => {
  const isMedia800 = useMediaQuery(800)

  return (
    <>
      <Header />

      {children}

      {isMedia800 && <MobileNavbar />}
      <div>Footer</div>
    </>
  )
}

export { Layout }
