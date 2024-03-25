/* eslint-disable indent */
import { ICartItem } from '@/types/cart'
import { IProduct } from '@/types/common'
import { handleShowSizeTable, idGenerator, isUserAuth } from './common'
import { addProductToCart, setCartFromLs } from '@/context/cart'
import toast from 'react-hot-toast'
import { productsWithoutSizes } from '@/const/product'

export const addCartItemToLs = (
  product: IProduct,
  selectedSize: string,
  count: number,
  withToast = true
) => {
  let cartFromLs: ICartItem[] = JSON.parse(
    localStorage.getItem('cart') as string
  )

  const clientId = idGenerator()

  if (!cartFromLs) {
    cartFromLs = []
  }

  const existingItem = cartFromLs.find(
    (item) => item.productId === product._id && item.size === selectedSize
  )

  if (existingItem) {
    const updatedCountWithSize =
      existingItem.count !== count ? count : +existingItem.count + 1

    const updatedCart = cartFromLs.map((item) =>
      item.productId === existingItem.productId && item.size === selectedSize
        ? {
            ...existingItem,
            count: selectedSize.length
              ? updatedCountWithSize
              : +existingItem.count + 1,
          }
        : item
    )

    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setCartFromLs(updatedCart)
    toast.success('Добавлено в корзину!')
    return existingItem.clientId
  }

  const cart = [
    ...cartFromLs,
    {
      clientId,
      productId: product._id,
      size: selectedSize,
      count,
      image: product.images[0],
      name: product.name,
      price: product.price,
      inStock: product.inStock,
      category: product.category,
      color: product.characteristics.color,
    },
  ]

  localStorage.setItem('cart', JSON.stringify(cart))

  setCartFromLs(cart as ICartItem[])

  withToast && toast.success('Добавлено в корзину')

  return clientId
}

export const addItemToCart = (
  product: IProduct,
  setSpinner: (arg0: boolean) => void,
  count: number,
  selectedSize = ''
) => {
  const res = isUserAuth()

  if (!res) {
    return addCartItemToLs(product, selectedSize, count)
  }

  const auth = JSON.parse(localStorage.getItem('auth') as string)

  const clientId = addCartItemToLs(product, selectedSize, count, false)

  addProductToCart({
    jwt: auth.accessToken,
    setSpinner,
    productId: product._id,
    category: product.category,
    count,
    size: selectedSize,
    clientId,
  })
}

export const addProductToCartBySizeTable = (
  product: IProduct,
  setSpinner: (arg0: boolean) => void,
  count: number,
  selectedSize = ''
) => {
  if (productsWithoutSizes.includes(product.type)) {
    return addItemToCart(product, setSpinner, count)
  }

  if (selectedSize) {
    return addItemToCart(product, setSpinner, count, selectedSize)
  }

  handleShowSizeTable(product)
}

export const updateCartItemCountInLS = (cartItemId: string, count: number) => {
  let cart: ICartItem[] = JSON.parse(localStorage.getItem('cart') as string)

  if (!cart) {
    cart = []
  }

  const updatedCart = cart.map((item) =>
    item.clientId === cartItemId ? { ...item, count } : item
  )

  localStorage.setItem('cart', JSON.stringify(updatedCart))
  setCartFromLs(updatedCart as ICartItem[])
}
