import { $api } from '@/api/api'
import { handleJWTError } from '@/lib/utils/errors'
import {
  IAddProductToComparisonFx,
  IAddProductsFromLSToComparisonFx,
  IComparisonItem,
  IDeleteComparisonItemsFx,
} from '@/types/comparison'
import { createDomain, createEffect, sample } from 'effector'
import toast from 'react-hot-toast'

export const addProductToComparisonFx = createEffect(
  async ({ jwt, setSpinner, ...payload }: IAddProductToComparisonFx) => {
    try {
      setSpinner(true)
      const { data } = await $api.post(`/api/comparsion/add`, payload, {
        headers: { Authorization: `Bearer ${jwt}` },
      })

      if (data?.error) {
        const newData: { newComparisonItem: IComparisonItem } =
          await handleJWTError(data.error.name, {
            repeatRequestMethodName: 'addProductToComparisonFx',
            payload: { ...payload, setSpinner },
          })
        return newData
      }

      toast.success('Добавлено в сравнение!')
      return data
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }
)

export const getComparisonItemsFx = createEffect(
  async ({ jwt }: { jwt: string }) => {
    try {
      const { data } = await $api.get(`/api/comparsion/all`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })

      if (data?.error) {
        const newData: IComparisonItem[] = await handleJWTError(
          data.error.name,
          {
            repeatRequestMethodName: 'getComparisonItemsFx',
          }
        )
        return newData
      }
      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const addProductsFromLSToComparisonFx = createEffect(
  async ({ jwt, comparisonItems }: IAddProductsFromLSToComparisonFx) => {
    try {
      const { data } = await $api.post(
        `/api/comparsion/add-many`,
        {
          items: comparisonItems,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )

      if (data?.error) {
        const newData: { comparisonItems: IComparisonItem[] } =
          await handleJWTError(data.error.name, {
            repeatRequestMethodName: 'addProductsFromLSToComparisonFx',
            payload: { items: comparisonItems },
          })
        return newData
      }

      loadComparsionItems({ jwt })

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const deleteComparisonItemFx = createEffect(
  async ({ jwt, id, setSpinner }: IDeleteComparisonItemsFx) => {
    try {
      setSpinner(true)

      const { data } = await $api.delete(`/api/comparsion/delete?id=${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })

      if (data?.error) {
        const newData: { id: string } = await handleJWTError(data.error.name, {
          repeatRequestMethodName: 'deleteComparisonItemFx',
          payload: { id, setSpinner },
        })
        return newData
      }

      toast.success('Удалено из сравнений!')
      return data
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }
)

const comparsion = createDomain()

export const loadComparsionItems = comparsion.createEvent<{ jwt: string }>()
export const addProductToComparsion =
  comparsion.createEvent<IAddProductToComparisonFx>()

export const setComparisonFromLs = comparsion.createEvent<IComparisonItem[]>()

export const setShouldShowEmptyComparison = comparsion.createEvent<boolean>()

export const deleteProductFromComparison =
  comparsion.createEvent<IDeleteComparisonItemsFx>()

export const addProductsFromLSToComparsion =
  comparsion.createEvent<IAddProductsFromLSToComparisonFx>()

// export const $comparsion = comparsion
//   .createStore<IComparisonItem[]>([])
//   .on(getComparisonItemsFx.done, (_, { result }) => result)
//   .on(addProductToComparisonFx.done, (state, { result }) => [
//     ...state,
//     result.newComparisonItem,
//   ])
//   .on(addProductsFromLSToComparisonFx.done, (_, { result }) => result.items)
//   .on(deleteComparisonItemFx.done, (state, { result }) =>
//     state.filter((item) => item._id !== result.id)
//   )

export const $comparsion = comparsion
  .createStore<IComparisonItem[]>([])
  .on(getComparisonItemsFx.done, (_, { result }) => result)
  .on(addProductToComparisonFx.done, (state, { result }) => [
    ...state,
    result.newComparisonItem,
  ])
  .on(addProductsFromLSToComparisonFx.done, (_, { result }) => result.items)
  .on(deleteComparisonItemFx.done, (state, { result }) =>
    state.filter((item) => item._id !== result.id)
  )

export const $comparisonFromLs = comparsion
  .createStore<IComparisonItem[]>([])
  .on(setComparisonFromLs, (_, comparsion) => comparsion)

export const $shouldShowEmptyComparison = comparsion
  .createStore<boolean>(false)
  .on(setShouldShowEmptyComparison, (_, value) => value)

sample({
  clock: loadComparsionItems,
  source: $comparsion,
  fn: (_, data) => data,
  target: getComparisonItemsFx,
})

sample({
  clock: addProductToComparsion,
  source: $comparsion,
  fn: (_, data) => data,
  target: addProductToComparisonFx,
})

sample({
  clock: addProductsFromLSToComparsion,
  source: $comparsion,
  fn: (_, data) => data,
  target: addProductsFromLSToComparisonFx,
})

sample({
  clock: deleteProductFromComparison,
  source: $comparsion,
  fn: (_, data) => data,
  target: deleteComparisonItemFx,
})
