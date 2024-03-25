/* eslint-disable indent */
import { loginCheckFx, refreshTokenFx } from '@/api/auth'
import { addProducToCartFx, deleteCartItemFx, getCartItemFx } from '@/api/cart'
import { JWTError } from '@/const/jwt'
import { addProductsFromLSToCartFx } from '@/context/cart'
import {
  IAddProductToCartFx,
  IAddProductsFromLSToCartFx,
  IDeleteCartItemsFx,
} from '@/types/cart'

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
