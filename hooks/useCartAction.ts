import { $currentProduct } from '@/context/goods'
import { useUnit } from 'effector-react'
import { useState } from 'react'
import { useCartByAuth } from './useCartByAuth'
import { isItemInList, isUserAuth } from '@/lib/utils/common'
import {
  addCartItemToLs,
  addItemToCart,
  addProductToCartBySizeTable,
} from '@/lib/utils/cart'

const useCartAction = (isSizeTable = false) => {
  const product = useUnit($currentProduct)

  const [selectedSize, setSelectedSize] = useState('')

  const currentCartByAuth = useCartByAuth()

  const currentCartItems = currentCartByAuth.filter(
    (item) => item.productId === product._id
  )

  const cartItemBySize = currentCartItems.find(
    (item) => item.size === selectedSize
  )

  const isProductInCart = isItemInList(currentCartByAuth, product._id)

  const [addToCartSpinner, setAddToCartSpinner] = useState(false)

  const handleAddToCart = (countFromCounter?: number) => {
    if (isProductInCart) {
      if (!isUserAuth()) {
        return addCartItemToLs(product, selectedSize, countFromCounter || 1)
      }

      if (cartItemBySize) {
        const auth = JSON.parse(localStorage.getItem('auth') as string)

        const count = !!countFromCounter
          ? +cartItemBySize.count !== countFromCounter
            ? countFromCounter
            : +cartItemBySize.count + 1
          : +cartItemBySize.count + 1

        return addCartItemToLs(product, selectedSize, count)
      }

      if (isSizeTable) {
        return addItemToCart(
          product,
          setAddToCartSpinner,
          countFromCounter || 1,
          selectedSize
        )
      }

      addProductToCartBySizeTable(
        product,
        setAddToCartSpinner,
        countFromCounter || 1,
        selectedSize
      )
    }
  }

  return {
    product,
    setSelectedSize,
    selectedSize,
    addToCartSpinner,
    currentCartItems,
    cartItemBySize,
    handleAddToCart,
    isProductInCart,
    currentCartByAuth,
    setAddToCartSpinner,
  }
}

export { useCartAction }
