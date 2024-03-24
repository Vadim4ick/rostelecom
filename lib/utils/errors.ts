/* eslint-disable indent */
import { loginCheckFx, refreshTokenFx } from '@/api/auth'
import { addProducToCartFx, getCartItemFx } from '@/api/cart'
import { JWTError } from '@/const/jwt'
import { IAddProductToCartFx } from '@/types/cart'

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
