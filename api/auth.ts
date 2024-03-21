import { ISignUpFx } from './../types/authPopup'
import { createEffect } from 'effector'
import { $api } from './api'
import toast from 'react-hot-toast'
import { onAuthSuccess } from '@/lib/utils/auth'

export const singUpFx = createEffect(
  async ({ email, password, name }: ISignUpFx) => {
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

export const singInFx = createEffect(async ({ email, password }: ISignUpFx) => {
  const { data } = await $api.post('/api/users/login', { email, password })

  if (data.warningMessage) {
    return toast.error(data.warningMessage)
  }

  onAuthSuccess('Вход выполнен', data)

  return data
})
