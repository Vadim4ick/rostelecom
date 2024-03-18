import { ReactNode } from 'react'
import { Header } from '../modules/Header/Header'

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    {children}
    <div>Footer</div>
  </>
)

export { Layout }
