import toast from 'react-hot-toast'

import { IProduct } from '@/types/common'
import { IComparisonItem } from '@/types/comparison'
import { idGenerator } from './common'
import {
  setComparisonFromLs,
  setShouldShowEmptyComparison,
} from '@/context/comparsion'

export const addComparisonItemToLS = (product: IProduct, withToast = true) => {
  let comparisonFromLS: IComparisonItem[] = JSON.parse(
    localStorage.getItem('comparison') as string
  )

  const clientId = idGenerator()

  if (!comparisonFromLS) {
    comparisonFromLS = []
  }

  setShouldShowEmptyComparison(false)

  const existingItem = comparisonFromLS.find(
    (item) => item.productId === product._id
  )

  if (existingItem) {
    toast.success('Добавлено в сравнение!')
    return existingItem.clientId
  }

  const comparison = [
    ...comparisonFromLS,
    {
      clientId,
      productId: product._id,
      image: product.images[0],
      name: product.name,
      price: product.price,
      inStock: product.inStock,
      category: product.category,
      characteristics: product.characteristics,
      sizes: product.sizes,
    },
  ]

  localStorage.setItem('comparison', JSON.stringify(comparison))
  setComparisonFromLs(comparison as IComparisonItem[])
  withToast && toast.success('Добавлено в сравнение!')

  return clientId
}
