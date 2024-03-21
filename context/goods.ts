import { getBestsellerProductFx, getNewProductFx } from '@/api/main-page'
import { Effect, createDomain, sample } from 'effector'
import { Gate, createGate } from 'effector-react'
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
