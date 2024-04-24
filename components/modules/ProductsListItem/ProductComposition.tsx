/* eslint-disable @typescript-eslint/ban-ts-comment */
import styles from '@/styles/product-list-item/index.module.scss'
import { useLang } from '@/hooks/useLang'

const ProductComposition = ({ composition }: { composition: string }) => {
  const { lang, translations } = useLang()

  return (
    <span className={styles.product__composition}>
      {translations[lang].product.composition}: {/* @ts-ignore */}
      {translations[lang].catalog[composition]}
    </span>
  )
}

export default ProductComposition
