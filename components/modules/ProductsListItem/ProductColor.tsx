/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useLang } from '@/hooks/useLang'
import styles from '@/styles/product-list-item/index.module.scss'

const ProductColor = ({ color }: { color: string }) => {
  const { lang, translations } = useLang()

  return (
    <span className={styles.product__color}>
      {/*@ts-ignore */}
      {translations[lang].catalog.color}: {translations[lang].catalog[color]}
    </span>
  )
}

export default ProductColor
