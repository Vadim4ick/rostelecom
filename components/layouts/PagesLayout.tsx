'use client'

import { ReactNode } from 'react'
import { Layout } from './Layout'
import { useUnit } from 'effector-react'
import {
  $showQuickViewModal,
  $showSizeTable,
  closeQuickViewModal,
} from '@/context/modals'
import clsx from 'clsx'
import {
  closeSizeTableByCheck,
  handleCloseAuthPopup,
  removeOverflowHiddenBody,
} from '@/lib/utils/common'
import { $openAuthPopup } from '@/context/auth'
import { Toaster } from 'react-hot-toast'

const PagesLayout = ({ children }: { children: ReactNode }) => {
  const [showQuickViewModal, showSizeTable, openAuthPopup] = useUnit([
    $showQuickViewModal,
    $showSizeTable,
    $openAuthPopup,
  ])

  const handleCloseQuickViewModal = () => {
    removeOverflowHiddenBody()
    closeQuickViewModal()
  }

  const handleCloseSizeTable = () => {
    closeSizeTableByCheck(showQuickViewModal)
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

        <div
          className={clsx('size-table-overlay', {
            'overlay-active': showSizeTable,
          })}
          onClick={handleCloseSizeTable}
        />

        <div
          className={clsx('auth-overlay', {
            'overlay-active': openAuthPopup,
          })}
          onClick={handleCloseAuthPopup}
        />

        <Toaster position='top-center' reverseOrder={false} />
      </body>
    </html>
  )
}

export { PagesLayout }
