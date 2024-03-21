import { createEffect } from 'effector'
import { $api } from './api'

export const getNewProductFx = createEffect(async () => {
  const { data } = await $api.get('/api/goods/new')

  return data
})

export const getBestsellerProductFx = createEffect(async () => {
  const { data } = await $api.get('/api/goods/bestsellers')

  return data
})
