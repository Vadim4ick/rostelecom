'use client'

import { $isAuth } from '@/context/auth'
import { $cart, $cartFromLs } from '@/context/cart'
import { useUnit } from 'effector-react'

const useCartByAuth = () => {
  const [cart, cartFromLS, isAuth] = useUnit([$cart, $cartFromLs, $isAuth])

  // LOL
  const currentCartByAuth = isAuth ? cart : cartFromLS

  return currentCartByAuth
}

export { useCartByAuth }
