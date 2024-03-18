'use client'

import { ReactNode } from 'react'
import { Header } from '../modules/Header/Header'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { MobileNavbar } from '../modules/MobileNavbar/MobileNavbar'
import { AnimatePresence, motion } from 'framer-motion'
import { SearchModal } from '../modules/Header/SearchModal'
import { $searchModal } from '@/context/modals'
import { useUnit } from 'effector-react'
import { handleCloseSearchModal } from '@/lib/utils/common'
import clsx from 'clsx'
import Footer from '../modules/Footer/Footer'

const Layout = ({ children }: { children: ReactNode }) => {
  const isMedia800 = useMediaQuery(800)

  const searchModal = useUnit($searchModal)

  return (
    <>
      <Header />

      {children}

      {isMedia800 && <MobileNavbar />}

      <AnimatePresence>
        {searchModal && (
          <motion.div
            initial={{ opacity: 0, zIndex: 102 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SearchModal />
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
