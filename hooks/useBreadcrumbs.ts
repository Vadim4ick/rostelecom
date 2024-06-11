import { useCallback, useEffect, useState } from 'react'
import { useCrumbText } from './useCrumbText'
import { usePageTitle } from './usePageTitle'
import { usePathname } from 'next/navigation'
import { useLang } from './useLang'

const useBreadcrumbs = (page: string) => {
  const { lang, translations } = useLang()
  const { crumbText } = useCrumbText(page)
  usePageTitle(page)

  const breadcrumbs = document.querySelector('.breadcrumbs') as HTMLUListElement

  const pathname = usePathname()

  const [dynamicTitle, setDynamicTitle] = useState('')

  const getDefaultTextGenerator = useCallback(() => crumbText, [crumbText])
  const getTextGenerator = useCallback((param: string) => ({})[param], [])
  usePageTitle(page, dynamicTitle)

  useEffect(() => {
    const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

    if (lastCrumb) {
      const productTypePathname = pathname.split(
        `/${page === 'comparison' ? 'comparsion' : page}/`
      )[1]

      if (!productTypePathname) {
        setDynamicTitle('')
        lastCrumb.textContent = crumbText

        return
      }

      const text = (
        translations[lang][
          page === 'comparison' ? 'comparison' : 'breadcrumbs'
        ] as { [index: string]: string }
      )[productTypePathname]

      setDynamicTitle(text)
      lastCrumb.textContent = text
    }
  }, [crumbText, lang, pathname, translations, breadcrumbs])

  return { getDefaultTextGenerator, getTextGenerator }
}

export { useBreadcrumbs }
