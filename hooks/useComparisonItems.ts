import { useGoodsByAuth } from './useGoodsByAuth'
import { $comparisonFromLs, $comparsion } from '@/context/comparsion'

export const useComparisonItems = (type: string) => {
  const currentComparisonByAuth = useGoodsByAuth($comparsion, $comparisonFromLs)
  const items = currentComparisonByAuth.filter(
    (item) => item.characteristics.type === type
  )

  return { items }
}
