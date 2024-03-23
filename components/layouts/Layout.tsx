/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { MouseEvent, ReactNode, useRef } from 'react'
import { Header } from '../modules/Header/Header'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { MobileNavbar } from '../modules/MobileNavbar/MobileNavbar'
import { AnimatePresence, motion } from 'framer-motion'
import { SearchModal } from '../modules/Header/SearchModal'
import {
  $searchModal,
  $showQuickViewModal,
  $showSizeTable,
} from '@/context/modals'
import { useUnit } from 'effector-react'
import {
  handleCloseAuthPopup,
  handleCloseSearchModal,
} from '@/lib/utils/common'
import clsx from 'clsx'
import Footer from '../modules/Footer/Footer'
import { QuickViewModal } from '../modules/QuickViewModal/QuickViewModal'
import { SizeTable } from '../modules/SizeTable/SizeTable'
import { $openAuthPopup } from '@/context/auth'
import { AuthPopup } from '../modules/AuthPopup/AuthPopup'

const Layout = ({ children }: { children: ReactNode }) => {
  const isMedia800 = useMediaQuery(800)

  const [searchModal, showQuickViewModal, showSizeTable, openAuthPopup] =
    useUnit([$searchModal, $showQuickViewModal, $showSizeTable, $openAuthPopup])

  const authWrapperRef = useRef<HTMLDivElement>(null)

  const handlerCloseAuthPopupByTarget = (
    e: MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as Element

    if (target === authWrapperRef.current) {
      handleCloseAuthPopup()
    }
  }

  return (
    <>
      <Header />

      {children}

      {isMedia800 && <MobileNavbar />}

      <AnimatePresence>
        {openAuthPopup && (
          <motion.div
            // @ts-ignore
            onClick={handlerCloseAuthPopupByTarget}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className='auth-popup-wrapper'
            ref={authWrapperRef}
          >
            <AuthPopup />
          </motion.div>
        )}

        {searchModal && (
          <motion.div
            initial={{ opacity: 0, zIndex: 102 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SearchModal />
          </motion.div>
        )}

        {showSizeTable && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SizeTable />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showQuickViewModal && (
          <motion.div
            initial={{ opacity: 0, zIndex: 102 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuickViewModal />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={clsx('header__search-overlay', {
          'overlay-active': searchModal,
        })}
        onClick={handleCloseSearchModal}
      />

      <Footer />
    </>
  )
}

export { Layout }
