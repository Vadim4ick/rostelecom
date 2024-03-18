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
      return setPopupZIdx(zIdx)
    }

    const timerId = setTimeout(() => {
      setPopupZIdx('-1')
    }, 100)

    return () => clearTimeout(timerId)
  }, [popupIsOpen, zIdx])

  return {
    popupZIdx,
    itemVariants,
    sideVariants,
  }
}
