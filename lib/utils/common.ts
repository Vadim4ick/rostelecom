import { closeAuthPopup, openAuthPopup, setIsAuth } from '@/context/auth'
import { setCurrentProduct } from '@/context/goods'
import {
  closeSearchModal,
  closeSizeTable,
  showSizeTable,
} from '@/context/modals'
import { setSizeTableSizes } from '@/context/sizeTable'
import { loginCheck } from '@/context/user'
import { ICartItem } from '@/types/cart'
import { IProduct } from '@/types/common'
import { EventCallable } from 'effector'
import toast from 'react-hot-toast'

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

export const closeSizeTableByCheck = (showQuickViewModal: boolean) => {
  if (!showQuickViewModal) {
    removeOverflowHiddenBody()
  }

  closeSizeTable()
}

export const handleCloseAuthPopup = () => {
  removeOverflowHiddenBody()
  closeAuthPopup()
}

export const closeAuthPopupWhenSomeModalOpened = (
  showQuickViewModal: boolean,
  showSizeTable: boolean
) => {
  if (showQuickViewModal || showSizeTable) {
    return closeAuthPopup()
  }

  handleCloseAuthPopup()
}

export const handleOpenAuthPopup = () => {
  addOverflowHiddenBody()
  openAuthPopup()
}

export const isUserAuth = () => {
  const auth = JSON.parse(localStorage.getItem('auth') as string)

  if (!auth?.accessToken) {
    setIsAuth(false)
    return false
  }

  return true
}

export const triggerLoginCheck = () => {
  const res = isUserAuth()
  if (!res) {
    return
  }

  const auth = JSON.parse(localStorage.getItem('auth') as string)

  loginCheck({ jwt: auth?.accessToken })
}

export const isItemInList = (array: ICartItem[], productId: string) =>
  array.some((item) => item.productId === productId)

export const handleShowSizeTable = (product: IProduct) => {
  setCurrentProduct(product)
  setSizeTableSizes({ sizes: product.sizes, type: product.type })
  addOverflowHiddenBody()
  showSizeTable()
}

export const deleteProductFromLS = <T>(
  id: string,
  key: string,
  event: EventCallable<T>,
  setShouldShowEmpty: (arg0: boolean) => void,
  message: string,
  withToast = true
) => {
  let items = JSON.parse(localStorage.getItem(key) as string)

  if (!items) {
    items = []
  }

  const updatedItems = items.filter(
    (item: { clientId: string }) => item.clientId !== id
  )

  localStorage.setItem(key, JSON.stringify(updatedItems))
  event(updatedItems)
  withToast && toast.success(message)

  if (!updatedItems.length) {
    setShouldShowEmpty(true)
  }
}

export const showCountMessage = (count: string, lang: string) => {
  if (count == '11' || count == '12' || count == '13' || count == '14') {
    return lang === 'ru' ? 'товаров' : 'items'
  }

  if (count.endsWith('1')) {
    return lang === 'ru' ? 'товар' : 'item'
  }

  if (count.endsWith('2') || count.endsWith('3') || count.endsWith('4')) {
    return lang === 'ru' ? 'товара' : 'items'
  }

  return lang === 'ru' ? 'товаров' : 'items'
}

export const checkOffsetParam = (offset: string | string[] | undefined) =>
  offset && !isNaN(+offset) && +offset > 0

export const getSearchParamsUrl = () => {
  const paramsString = window.location.search

  const urlParams = new URLSearchParams(paramsString)

  return urlParams
}

export const updateSearchParam = (
  key: string,
  value: string | number,
  pathname: string
) => {
  const paramsString = window.location.search

  const urlParams = new URLSearchParams(paramsString)
  urlParams.set(key, `${value}`)

  const newPath = `${pathname}?${urlParams.toString()}`

  window.history.pushState({ path: newPath }, '', newPath)
}

export const checkPriceParam = (price: number) =>
  price && !isNaN(price) && price >= 0 && price <= 10000

export const getCheckedArrayParam = (param: string) => {
  try {
    const sizeArr = JSON.parse(decodeURIComponent(param))

    if (Array.isArray(sizeArr) && sizeArr.length) {
      return sizeArr
    }
  } catch (error) {
    return false
  }
}
