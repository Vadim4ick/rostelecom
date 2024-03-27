'use client'

import { $api } from '@/api/api'
import { handleJWTError } from '@/lib/utils/errors'
import { IAddProductToCartFx } from '@/types/cart'
import {
  IAddProductsFromLSToFavoriteFx,
  IFavoriteItem,
} from '@/types/favorites'
import { createDomain, createEffect, sample } from 'effector'
import toast from 'react-hot-toast'

export const addProductToFavoriteFx = createEffect(
  async ({
    jwt,
    setSpinner,
    ...dataFields
  }: Omit<IAddProductToCartFx, 'count'>) => {
    try {
      setSpinner(true)

      const { data } = await $api.post('/api/favorites/add', dataFields, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

      if (data?.error) {
        const newData: { newFavoriteItem: IFavoriteItem } =
          await handleJWTError(data.error.name, {
            repeatRequestMethodName: 'addProductToFavoriteFx',
            payload: {
              ...dataFields,
              setSpinner,
            },
          })

        return newData
      }
      toast.success('Добавлено в избранное!!')

      return data
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }
)

export const getFavoriteItemsFx = createEffect(
  async ({ jwt }: { jwt: string }) => {
    try {
      const { data } = await $api.get('/api/favorites/all', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

      if (data?.error) {
        const newData: IFavoriteItem[] = await handleJWTError(data.error.name, {
          repeatRequestMethodName: 'getFavoriteItemsFx',
        })

        return newData
      }

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const addProductsFromLsToFavoritesFx = createEffect(
  async ({ jwt, favoriteItems }: IAddProductsFromLSToFavoriteFx) => {
    try {
      const { data } = await $api.post(
        '/api/favorites/add-many',
        { items: favoriteItems },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )

      if (data?.error) {
        const newData: { cartItems: IFavoriteItem[] } = await handleJWTError(
          data.error.name,
          {
            repeatRequestMethodName: 'addProductsFromLsToFavoritesFx',
            payload: {
              items: favoriteItems,
            },
          }
        )

        return newData
      }

      loadFavoriteItems({ jwt })

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

const favorites = createDomain()

export const addProductToFavorites =
  favorites.createEvent<Omit<IAddProductToCartFx, 'count'>>()

export const loadFavoriteItems = favorites.createEvent<{ jwt: string }>()

export const setFavoritesFromLs = favorites.createEvent<IFavoriteItem[]>()

export const setIsAddToFavorites = favorites.createEvent<boolean>()

export const addProductsFromLSToFavorites =
  favorites.createEvent<IAddProductsFromLSToFavoriteFx>()

export const $favorites = favorites
  .createStore<IFavoriteItem[]>([])
  .on(getFavoriteItemsFx.done, (_, { result }) => result)
  .on(addProductToFavoriteFx.done, (cart, { result }) => [
    ...new Map(
      [...cart, result.newFavoriteItem].map((item) => [item.clientId, item])
    ).values(),
  ])
  .on(addProductsFromLsToFavoritesFx.done, (_, { result }) => result.items)

export const $favoritesFromLs = favorites
  .createStore<IFavoriteItem[]>([])
  .on(setFavoritesFromLs, (_, favorites) => favorites)

export const $isAddToFavorites = favorites
  .createStore(false)
  .on(setIsAddToFavorites, (_, value) => value)

sample({
  clock: addProductToFavorites,
  source: $favorites,
  fn: (_, data) => data,
  target: addProductToFavoriteFx,
})

sample({
  clock: loadFavoriteItems,
  source: $favorites,
  fn: (_, data) => data,
  target: getFavoriteItemsFx,
})

sample({
  clock: addProductsFromLSToFavorites,
  source: $favorites,
  fn: (_, data) => data,
  target: addProductsFromLsToFavoritesFx,
})
