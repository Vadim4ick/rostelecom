import { $currentProduct } from '@/context/goods'
import { useUnit } from 'effector-react'
import { useState } from 'react'

const useCartAction = () => {
  const product = useUnit($currentProduct)

  const [selectedSize, setSelectedSize] = useState('')

  return { product, setSelectedSize, selectedSize }
}

export { useCartAction }
