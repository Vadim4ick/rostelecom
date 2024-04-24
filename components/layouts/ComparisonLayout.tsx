'use client'

import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { useCrumbText } from '@/hooks/useCrumbText'
import { useLang } from '@/hooks/useLang'
import { usePageTitle } from '@/hooks/usePageTitle'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import Breadcrumbs from '../modules/Breadcrumbs/Breadcrumbs'
import { HeadingWithCount } from '../elements/HeadingWithCount/HeadingWithCount'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import {
  $comparisonFromLs,
  $comparsion,
  $shouldShowEmptyComparison,
} from '@/context/comparsion'
import { useComparisonLinks } from '@/hooks/useComparisonLinks'
import styles from '@/styles/comparison/index.module.scss'
import skeletonLinksStyles from '@/styles/comparison-links-skeleton/index.module.scss'
import skeletonListsStyles from '@/styles/comparison-list-skeleton/index.module.scss'
import comparisonSkeleton from '@/styles/comparison-skeleton/index.module.scss'
import Skeleton from '../elements/Skeleton/Skeleton'
import ComparisonLinksList from '../modules/Comparison/ComparisonLinksList'
import { EmptyPageContent } from '../modules/EmptyPageContent/EmptyPageContent'
import { useUnit } from 'effector-react'
import { isUserAuth } from '@/lib/utils/common'
import { loginCheckFx } from '@/context/user'

const ComparisonLayout = ({ children }: { children: ReactNode }) => {
  const breadcrumbs = document.querySelector('.breadcrumbs') as HTMLUListElement

  const pathname = usePathname()

  const [dynamicTitle, setDynamicTitle] = useState('')
  usePageTitle('comparison', dynamicTitle)

  const { lang, translations } = useLang()

  const { crumbText } = useCrumbText('comparison')
  const { availableProductLinks, linkSpinner } = useComparisonLinks()

  const loginCheckSpinner = useUnit(loginCheckFx.pending)

  const shouldShowEmptyComparison = useUnit($shouldShowEmptyComparison)

  const { getDefaultTextGenerator, getTextGenerator } =
    useBreadcrumbs('comparison')

  const currentComparisonByAuth = useGoodsByAuth($comparsion, $comparisonFromLs)

  useEffect(() => {
    const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

    if (lastCrumb) {
      const productTypePathname = pathname.split('/comparsion/')[1]

      if (!productTypePathname) {
        setDynamicTitle('')
        lastCrumb.textContent = crumbText

        return
      }

      const text = (
        translations[lang].comparison as { [index: string]: string }
      )[productTypePathname]

      setDynamicTitle(text)
      lastCrumb.textContent = text
    }
  }, [crumbText, lang, pathname, translations, breadcrumbs])

  const mainSpinner = isUserAuth()
    ? linkSpinner || loginCheckSpinner
    : linkSpinner

  return (
    <main>
      {!shouldShowEmptyComparison ? (
        <section className={styles.comparison}>
          <Breadcrumbs
            getDefaultTextGenerator={getDefaultTextGenerator}
            getTextGenerator={getTextGenerator}
          />

          <div className='container'>
            <HeadingWithCount
              count={currentComparisonByAuth.length}
              title={translations[lang].comparison.main_heading}
              spinner={false}
            />

            {!(pathname === '/comparison') &&
              (mainSpinner ? (
                <Skeleton styles={skeletonLinksStyles} />
              ) : (
                <ComparisonLinksList
                  links={availableProductLinks}
                  className={styles.comparison_links}
                />
              ))}

            <div>
              {mainSpinner ? (
                pathname === '/comparison' ? (
                  <Skeleton styles={comparisonSkeleton} />
                ) : (
                  <Skeleton styles={skeletonListsStyles} />
                )
              ) : (
                children
              )}
            </div>
          </div>
        </section>
      ) : (
        <section>
          <div className='container'>
            <EmptyPageContent
              subtitle={translations[lang].common.comparison_empty}
              description={translations[lang].common.comparison_empty_advice}
              btnText={translations[lang].common.go_catalog}
              bgClassName={styles.empty_bg}
            />
          </div>
        </section>
      )}
    </main>
  )
}

export { ComparisonLayout }
