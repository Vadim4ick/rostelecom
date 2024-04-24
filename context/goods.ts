'use client'

import { $api } from '@/api/api'

import { getBestsellerProductFx, getNewProductFx } from '@/api/main-page'
import { handleShowSizeTable } from '@/lib/utils/common'
import { IProduct } from '@/types/common'
import { ILoadOneProductFx } from '@/types/goods'
import {
  Effect,
  createDomain,
  createEffect,
  createEvent,
  sample,
} from 'effector'
import { Gate, createGate } from 'effector-react'
import toast from 'react-hot-toast'

export const loadOneProductFx = createEffect(
  async ({
    category,
    productId,
    withShowingSizeTable,
    setSpinner,
  }: ILoadOneProductFx) => {
    try {
      setSpinner(true)

      const { data } = await $api.post('/api/goods/one', {
        category,
        productId,
      })

      if (withShowingSizeTable) {
        handleShowSizeTable(data.productItem)
      }

      if (data.message === 'Wrong product id') {
        return { productItem: { errorMessage: 'Wrong product id' } }
      }

      return data
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }
)

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
  source: $currentProduct,
  fn: (_, data) => data,
  target: loadOneProductFx,
})
