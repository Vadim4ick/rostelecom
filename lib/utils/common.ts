import { closeSearchModal } from '@/context/modals'
import { ICartItem } from '@/types/cart'

export const removeOverflowHiddenBody = () => {
  const body = document.body as HTMLBodyElement
  body.classList.remove('overflow-hidden')
}

export const addOverflowHiddenBody = (pr = '') => {
  const body = document.body as HTMLBodyElement
  body.classList.add('overflow-hidden')

  pr && (body.style.paddingRight = pr)
}

export const getWindowWidth = () => {
  const { innerWidth: windowWidth } =
    typeof window !== 'undefined' ? window : { innerWidth: 0 }

  return { windowWidth }
}

export const handleCloseSearchModal = () => {
  closeSearchModal()
  removeOverflowHiddenBody()
}

export const shuffle = <T>(array: T[]) => {
  let currentIdx = array.length

  let randomIdx

  while (currentIdx != 0) {
    randomIdx = Math.floor(Math.random() * currentIdx)
    currentIdx--
    ;[array[currentIdx], array[randomIdx]] = [
      array[randomIdx],
      array[currentIdx],
    ]
  }

  return array
}

export const formatPrice = (x: number) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export const idGenerator = () => {
  const S4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}

export const getCartItemCountBySize = (
  cartItems: ICartItem[],
  currentSize: string
) =>
  cartItems.find((item) => item.size === currentSize.toLocaleLowerCase())
    ?.count || 0
