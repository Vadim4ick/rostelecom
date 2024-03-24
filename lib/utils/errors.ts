/* eslint-disable indent */
import { loginCheckFx, refreshTokenFx } from '@/api/auth'
import { JWTError } from '@/const/jwt'

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
      const { repeatRequestMethodName } = repeatRequestAfterRefreshData

      switch (repeatRequestMethodName) {
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
