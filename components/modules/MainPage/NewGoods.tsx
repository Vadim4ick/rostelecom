import { getNewProductFx } from '@/api/main-page'
import { $newProducts } from '@/context/goods'
import { useUnit } from 'effector-react'
import { MainPageSection } from './MainPageSection'
import { useLang } from '@/hooks/useLang'

const NewGoods = () => {
  const goods = useUnit($newProducts)

  const spinner = useUnit(getNewProductFx.pending)

  const { lang, translations } = useLang()

  return (
    <MainPageSection
      goods={goods}
      spinner={spinner}
      title={translations[lang].main_page.new_title}
    />
  )
}

export { NewGoods }
