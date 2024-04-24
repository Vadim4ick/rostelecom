import {
  $comparsion,
  $comparisonFromLs,
  getComparisonItemsFx,
} from '@/context/comparsion'
import { useGoodsByAuth } from './useGoodsByAuth'
import { useUnit } from 'effector-react'
import { useLang } from './useLang'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

const useComparisonLinks = () => {
  const currentComparisonByAuth = useGoodsByAuth($comparsion, $comparisonFromLs)

  const spiner = useUnit(getComparisonItemsFx.pending)

  const { lang, translations } = useLang()

  const pathname = usePathname()

  // const availableProductLinks = useMemo(
  //   () =>
  //     [
  //       ...new Set(
  //         currentComparisonByAuth.map((item) => item.characteristics.type)
  //       ),
  //     ].map((type) => ({
  //       title: (translations[lang].comparison as { [index: string]: string })[
  //         type
  //       ],
  //       href: `/comparison/${type}`,
  //       itemsCount: currentComparisonByAuth.filter(
  //         (item) => item.characteristics.type === type
  //       ).length,
  //       isActive: pathname.split('/comparison/')[1] === type,
  //     })),
  //   [currentComparisonByAuth, lang, pathname, translations]
  // )

  const availableProductLinks = useMemo(
    () =>
      [...new Set(currentComparisonByAuth)]
        .map((item) => item.characteristics.type)
        .map((type) => ({
          title: (translations[lang].comparison as { [index: string]: string })[
            type
          ],
          href: `/comparsion/${type}`,
          itemsCount: currentComparisonByAuth.filter(
            (item) => item.characteristics.type === type
          ).length,

          isActive: pathname.split('/comparsion/')[1] === type,
        })),

    [currentComparisonByAuth, lang, pathname, translations]
  )

  return { availableProductLinks, linkSpinner: spiner }
}

export { useComparisonLinks }
