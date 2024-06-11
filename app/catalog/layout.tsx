import { CatalogLayout } from '@/components/layouts/CatalogLayout'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Ростелеком | Каталог',
}

export default function CatalogRootLayout({
  children,
}: {
  children: ReactNode
}) {
  return <CatalogLayout>{children}</CatalogLayout>
}
