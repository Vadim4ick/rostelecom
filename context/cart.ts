/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { $api } from '@/api/api'
import {
  addProducToCartFx,
  deleteCartItemFx,
  getCartItemFx,
  updateCartItemCountFx,
} from '@/api/cart'
import { handleJWTError } from '@/lib/utils/errors'
import {
  IAddProductToCartFx,
  IAddProductsFromLSToCartFx,
  ICartItem,
  IDeleteCartItemsFx,
  IUpdateCartItemCountFx,
} from '@/types/cart'
import { createDomain, createEffect, sample } from 'effector'
import toast from 'react-hot-toast'

export const addProductsFromLSToCartFx = createEffect(
  async ({ jwt, cartItems }: IAddProductsFromLSToCartFx) => {
    try {
      const { data } = await $api.post(
        '/api/cart/add-many',
        { items: cartItems },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )

      if (data?.error) {
        const newData: { cartItems: ICartItem[] } = await handleJWTError(
          data.error.name,
          {
            repeatRequestMethodName: 'addProductsFromLSToCartFx',
            payload: { items: cartItems },
          }
        )
        return newData
      }

      loadCartItems({ jwt })
      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

const cart = createDomain()

export const loadCartItems = cart.createEvent<{ jwt: string }>()
export const setCartFromLs = cart.createEvent<ICartItem[]>()
export const addProductToCart = cart.createEvent<IAddProductToCartFx>()
export const setTotalPrice = cart.createEvent<number>()
export const setShouldShowEmpty = cart.createEvent<boolean>()

export const addProductsFromLSToCart =
  cart.createEvent<IAddProductsFromLSToCartFx>()

export const updateCartItemCount = cart.createEvent<IUpdateCartItemCountFx>()
export const deleteProductFromCart = cart.createEvent<IDeleteCartItemsFx>()

export const $cart = cart
  .createStore<ICartItem[]>([])
  .on(getCartItemFx.done, (_, { result }) => result)
  .on(addProductsFromLSToCartFx.done, (_, { result }) => result.items)
  .on(addProducToCartFx.done, (cart, { result }) => [
    ...new Map(
      [...cart, result.newCartItem].map((item) => [item.clientId, item])
    ).values(),
  ])
  .on(updateCartItemCountFx.done, (cart, { result }) =>
    cart.map((item) =>
      item._id === result.id ? { ...item, count: result.count } : item
    )
  )
  .on(deleteCartItemFx.done, (cart, { result }) =>
    cart.filter((item) => item._id !== result.id)
  )

export const $cartFromLs = cart
  .createStore<ICartItem[]>([])
  .on(setCartFromLs, (_, cart) => cart)

export const $totalPrice = cart
  .createStore<number>(0)
  .on(setTotalPrice, (_, value) => value)

export const $shouldShowEmpty = cart
  .createStore<boolean>(false)
  .on(setShouldShowEmpty, (_, value) => value)

sample({
  clock: loadCartItems,
  source: $cart,
  fn: (_, data) => data,
  target: getCartItemFx,
})

sample({
  clock: addProductToCart,
  source: $cart,
  fn: (_, data) => data,
  target: addProducToCartFx,
})

sample({
  clock: addProductsFromLSToCart,
  source: $cart,
  fn: (_, data) => data,
  target: addProductsFromLSToCartFx,
})

sample({
  clock: updateCartItemCount,
  source: $cart,
  fn: (_, data) => data,
  target: updateCartItemCountFx,
})

sample({
  clock: deleteProductFromCart,
  source: $cart,
  fn: (_, data) => data,
  target: deleteCartItemFx,
})
