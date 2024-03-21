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
  removeOverflowHiddenBody,
} from '@/lib/utils/common'

const PagesLayout = ({ children }: { children: ReactNode }) => {
  const [showQuickViewModal, showSizeTable] = useUnit([
    $showQuickViewModal,
    $showSizeTable,
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
      </body>
    </html>
  )
}

export { PagesLayout }
