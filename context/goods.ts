'use client'

import { loadOneProductFx } from '@/api/goods'
import { getBestsellerProductFx, getNewProductFx } from '@/api/main-page'
import { IProduct } from '@/types/common'
import { ILoadOneProductFx } from '@/types/goods'
import { Effect, createDomain, createEvent, sample } from 'effector'
import { Gate, createGate } from 'effector-react'

export const setCurrentProduct = createEvent<IProduct>()
export const loadOneProduct = createEvent<ILoadOneProductFx>()

const goods = createDomain()

export const MainPageGate = createGate()

const goodsStoreInstance = (effect: Effect<void, [], Error>) =>
  goods
    .createStore([])
    .on(effect.done, (_, { result }) => result)
    .on(effect.fail, (_, { error }) => {
      console.log('error.message', error.message)
    })

const goodsSampleInstance = (
  effect: Effect<void, [], Error>,
  gate: Gate<unknown>
) =>
  sample({
    clock: gate.open,
    target: effect,
  })

export const $newProducts = goodsStoreInstance(getNewProductFx)
export const $bestsellerProducts = goodsStoreInstance(getBestsellerProductFx)

goodsSampleInstance(getNewProductFx, MainPageGate)
goodsSampleInstance(getBestsellerProductFx, MainPageGate)

export const $currentProduct = goods
  .createStore<IProduct>({} as IProduct)
  .on(setCurrentProduct, (_, product) => product)
  .on(loadOneProductFx.done, (_, { result }) => result.productItem)

sample({
  clock: loadOneProduct,
  to: loadOneProductFx,
})
