import { useEffect, useState } from 'react'

export const useMenuAnimation = (zIdx: number, popupIsOpen: boolean) => {
  const [popupZIdx, setPopupZIdx] = useState<string | number>(0)

  const itemVariants = {
    closed: {
      opacity: 0,
    },
    open: { opacity: 1 },
  }

  const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  }

  useEffect(() => {
    if (popupIsOpen) {
      setPopupZIdx(zIdx)
      return
    }

    const timerId = setTimeout(() => setPopupZIdx('-1'), 1000)

    return () => clearTimeout(timerId)
  }, [popupIsOpen, zIdx])

  return { popupZIdx, itemVariants, sideVariants }
}
