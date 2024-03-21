import { getBestsellerProductFx } from '@/api/main-page'
import { $bestsellerProducts } from '@/context/goods'
import { useLang } from '@/hooks/useLang'
import { useUnit } from 'effector-react'
import { MainPageSection } from './MainPageSection'

const BestsellerGoods = () => {
  const goods = useUnit($bestsellerProducts)

  const spinner = useUnit(getBestsellerProductFx.pending)

  const { lang, translations } = useLang()

  return (
    <MainPageSection
      goods={goods}
      spinner={spinner}
      title={translations[lang].main_page.bestsellers_title}
    />
  )
}

export { BestsellerGoods }
