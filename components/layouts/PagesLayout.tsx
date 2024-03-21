'use client'

import { ReactNode } from 'react'
import { Layout } from './Layout'
import { useUnit } from 'effector-react'
import { $showQuickViewModal, closeQuickViewModal } from '@/context/modals'
import clsx from 'clsx'
import { removeOverflowHiddenBody } from '@/lib/utils/common'

const PagesLayout = ({ children }: { children: ReactNode }) => {
  const showQuickViewModal = useUnit($showQuickViewModal)

  const handleCloseQuickViewModal = () => {
    removeOverflowHiddenBody()
    closeQuickViewModal()
  }

  return (
    <html lang='en'>
      <body>
        <Layout>{children} </Layout>

        <div
          className={clsx('quick-view-modal-overlay', {
            'overlay-active': showQuickViewModal,
          })}
          onClick={handleCloseQuickViewModal}
        />
      </body>
    </html>
  )
}

export { PagesLayout }
