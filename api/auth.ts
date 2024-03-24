'use client'

import { ISignUpFx } from './../types/authPopup'
import { createEffect } from 'effector'
import { $api } from './api'
import toast from 'react-hot-toast'
import { onAuthSuccess } from '@/lib/utils/auth'
import { setIsAuth } from '@/context/auth'
import { handleJWTError } from '@/lib/utils/errors'

export const oAuthFx = createEffect(
  async ({ email, password, name }: ISignUpFx) => {
    try {
      const { data } = await $api.post('/api/users/oauth', {
        name,
        email,
        password,
      })

      await $api.post('/api/users/email', {
        password,
        email,
      })

      onAuthSuccess('Авторизация выполнена!', data)

      return data.user
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const singUpFx = createEffect(
  async ({ email, password, name, isOAuth }: ISignUpFx) => {
    if (isOAuth) {
      return await oAuthFx({
        email,
        password,
        name,
      })
    }

    const { data } = await $api.post('/api/users/signup', {
      name,
      email,
      password,
    })

    if (data.warningMessage) {
      return toast.error(data.warningMessage)
    }

    onAuthSuccess('Регистрация прошла успешно', data)

    return data
  }
)

export const singInFx = createEffect(
  async ({ email, password, isOAuth }: ISignUpFx) => {
    if (isOAuth) {
      return await oAuthFx({
        email,
        password,
      })
    }

    const { data } = await $api.post('/api/users/login', { email, password })

    if (data.warningMessage) {
      return toast.error(data.warningMessage)
    }

    onAuthSuccess('Вход выполнен', data)

    return data
  }
)

export const loginCheckFx = createEffect(async ({ jwt }: { jwt: string }) => {
  try {
    const { data } = await $api.get('/api/users/login-check', {
      headers: { Authorization: `Bearer ${jwt}` },
    })

    if (data?.error) {
      handleJWTError(data.error.name, {
        repeatRequestMethodName: 'loginCheckFx',
      })
      return
    }

    setIsAuth(true)
    return data.user
  } catch (error) {
    toast.error((error as Error).message)
  }
})

export const refreshTokenFx = createEffect(async ({ jwt }: { jwt: string }) => {
  const { data } = await $api.post('/api/users/refresh', {
    jwt,
  })

  localStorage.setItem('auth', JSON.stringify(data))

  return data
})
