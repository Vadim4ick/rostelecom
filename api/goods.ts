'use client'

import { toast } from 'react-hot-toast'
import { ILoadOneProductFx } from '@/types/goods'
import { createEffect } from 'effector'
import { $api } from './api'

export const loadOneProductFx = createEffect(
  async ({ category, productId }: ILoadOneProductFx) => {
    try {
      const { data } = await $api.post('/api/goods/one', {
        category,
        productId,
      })

      if (data.message === 'Wrong product id') {
        return { productItem: { errorMessage: 'Wrong product id' } }
      }

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)
