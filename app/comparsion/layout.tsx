import { ComparisonLayout } from '@/components/layouts/ComparisonLayout'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Ростелеком | Сравнение товаров',
}

export default function ComparisonRootLayout({
  children,
}: {
  children: ReactNode
}) {
  return <ComparisonLayout>{children}</ComparisonLayout>
}
