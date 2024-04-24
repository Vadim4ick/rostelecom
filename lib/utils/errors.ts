/* eslint-disable indent */
import { addProducToCartFx, deleteCartItemFx, getCartItemFx } from '@/api/cart'

import { JWTError } from '@/const/jwt'
import { refreshTokenFx } from '@/context/auth'
import { addProductsFromLSToCartFx } from '@/context/cart'
import {
  addProductToComparisonFx,
  addProductsFromLSToComparisonFx,
  deleteComparisonItemFx,
  getComparisonItemsFx,
} from '@/context/comparsion'
import {
  addProductToFavoriteFx,
  addProductsFromLsToFavoritesFx,
  deleteFavoriteItemFx,
  getFavoriteItemsFx,
} from '@/context/favorites'
import { loginCheckFx } from '@/context/user'
import {
  IAddProductToCartFx,
  IAddProductsFromLSToCartFx,
  IDeleteCartItemsFx,
} from '@/types/cart'
import {
  IAddProductToComparisonFx,
  IAddProductsFromLSToComparisonFx,
  IDeleteComparisonItemsFx,
} from '@/types/comparison'
import { IAddProductsFromLSToFavoriteFx } from '@/types/favorites'

const handleJWTError = async (
  errorName: string,
  repeatRequestAfterRefreshData?: {
    repeatRequestMethodName: string
    payload?: unknown
  }
) => {
  if (errorName === JWTError.EXPIRED_JWT_TOKEN) {
    const auth = JSON.parse(localStorage.getItem('auth') as string)
    const newTokens = await refreshTokenFx({ jwt: auth.refreshToken })

    if (repeatRequestAfterRefreshData) {
      const { repeatRequestMethodName, payload } = repeatRequestAfterRefreshData

      switch (repeatRequestMethodName) {
        case 'getCartItemFx':
          return await getCartItemFx({
            jwt: newTokens.accessTokens,
          })
        case 'addProducToCartFx':
          return await addProducToCartFx({
            ...(payload as IAddProductToCartFx),
            jwt: newTokens.accessTokens,
          })
        case 'addProductToComparisonFx':
          return await addProductToComparisonFx({
            ...(payload as IAddProductToComparisonFx),
            jwt: newTokens.accessTokens,
          })
        case 'getComparisonItemsFx':
          return await getComparisonItemsFx({
            jwt: newTokens.accessTokens,
          })
        case 'addProductsFromLSToComparisonFx':
          return await addProductsFromLSToComparisonFx({
            ...(payload as IAddProductsFromLSToComparisonFx),
            jwt: newTokens.accessTokens,
          })
        case 'addProductsFromLSToCartFx':
          return await addProductsFromLSToCartFx({
            ...(payload as IAddProductsFromLSToCartFx),
            jwt: newTokens.accessTokens,
          })
        case 'deleteCartItemFx':
          return await deleteCartItemFx({
            ...(payload as IDeleteCartItemsFx),
            jwt: newTokens.accessTokens,
          })
        case 'getFavoriteItemsFx':
          return await getFavoriteItemsFx({
            jwt: newTokens.accessTokens,
          })
        case 'addProductToFavoriteFx':
          return await addProductToFavoriteFx({
            ...(payload as Omit<IAddProductToCartFx, 'count'>),
            jwt: newTokens.accessTokens,
          })
        case 'addProductsFromLsToFavoritesFx':
          return await addProductsFromLsToFavoritesFx({
            ...(payload as IAddProductsFromLSToFavoriteFx),
            jwt: newTokens.accessTokens,
          })
        case 'deleteFavoriteItemFx':
          return await deleteFavoriteItemFx({
            ...(payload as IDeleteCartItemsFx),
            jwt: newTokens.accessTokens,
          })
        case 'deleteComparisonItemFx':
          return await deleteComparisonItemFx({
            ...(payload as IDeleteComparisonItemsFx),
            jwt: newTokens.accessTokens,
          })

        case 'loginCheckFx':
          await loginCheckFx({
            jwt: newTokens.accessTokens,
          })
          break
      }
    }
  }
}

export { handleJWTError }
