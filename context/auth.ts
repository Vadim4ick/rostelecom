'use client'

import { $api } from '@/api/api'
import { onAuthSuccess } from '@/lib/utils/auth'
import { ISignUpFx } from '@/types/authPopup'
import { createDomain, createEffect, sample } from 'effector'
import toast from 'react-hot-toast'

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

export const refreshTokenFx = createEffect(async ({ jwt }: { jwt: string }) => {
  const { data } = await $api.post('/api/users/refresh', {
    jwt,
  })

  localStorage.setItem('auth', JSON.stringify(data))

  return data
})

const auth = createDomain()

export const openAuthPopup = auth.createEvent()
export const closeAuthPopup = auth.createEvent()

export const handleSignUp = auth.createEvent<ISignUpFx>()
export const handleSignIn = auth.createEvent<ISignUpFx>()

export const setIsAuth = auth.createEvent<boolean>()

export const $openAuthPopup = auth
  .createStore<boolean>(false)
  .on(openAuthPopup, () => true)
  .on(closeAuthPopup, () => false)

export const $isAuth = auth
  .createStore<boolean>(false)
  .on(setIsAuth, (_, isAuth) => isAuth)

export const $auth = auth
  .createStore({})
  .on(singUpFx.done, (_, { result }) => result)
  .on(singUpFx.fail, (_, { error }) => {
    toast.error(error.message)
  })
  .on(singInFx.done, (_, { result }) => result)
  .on(singInFx.fail, (_, { error }) => {
    toast.error(error.message)
  })

sample({
  clock: handleSignUp,
  source: $auth,
  fn: (_, { name, email, password, isOAuth }) => ({
    name,
    email,
    password,
    isOAuth,
  }),
  target: singUpFx,
})

sample({
  clock: handleSignIn,
  source: $auth,
  fn: (_, { name, email, password, isOAuth }) => ({
    name,
    email,
    password,
    isOAuth,
  }),
  target: singInFx,
})
