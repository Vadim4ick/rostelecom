'use client'

import { ReactNode, useEffect, useState } from 'react'
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
import { EarthoOneProvider } from '@eartho/one-client-react'
import { motion } from 'framer-motion'
import CookieAlert from '../modules/CookieAlert/CookieAlert'
import { Next13ProgressBar } from 'next13-progressbar'

const PagesLayout = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState(false)

  const [showQuickViewModal, showSizeTable, openAuthPopup] = useUnit([
    $showQuickViewModal,
    $showSizeTable,
    $openAuthPopup,
  ])

  const [cookieAlertOpen, setCookieAlertOpen] = useState(false)

  useEffect(() => {
    const checkCookie = document.cookie.indexOf('CookieBy=Rostelecom')
    console.log(checkCookie)

    checkCookie != -1
      ? setCookieAlertOpen(false)
      : setTimeout(() => setCookieAlertOpen(true), 3000)
  }, [])

  const handleCloseQuickViewModal = () => {
    removeOverflowHiddenBody()
    closeQuickViewModal()
  }

  const handleCloseSizeTable = () => {
    closeSizeTableByCheck(showQuickViewModal)
  }

  useEffect(() => setClient(true), [])

  return (
    <>
      {client ? (
        <EarthoOneProvider
          clientId={String(process.env.NEXT_PUBLIC_EARTHO_CLIENT_ID)}
        >
          <html lang='en'>
            <body>
              <Next13ProgressBar height='4px' color='#9466FF' showOnShallow />

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

              {cookieAlertOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className='cookie-popup'
                >
                  <CookieAlert setCookieAlertOpen={setCookieAlertOpen} />
                </motion.div>
              )}
              <Toaster position='top-center' reverseOrder={false} />
            </body>
          </html>
        </EarthoOneProvider>
      ) : (
        <html lang='en'>
          <body>
            <></>
          </body>
        </html>
      )}
    </>
  )
}

export { PagesLayout }
