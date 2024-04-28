import { useUnit } from 'effector-react'
import { showSizeTable, $showQuickViewModal } from '@/context/modals'
import { ISelectedSizes } from '@/types/common'
import { useLang } from '@/hooks/useLang'
import { addOverflowHiddenBody } from '@/lib/utils/common'
import { setSizeTableSizes } from '@/context/sizeTable'
import { setIsAddToFavorites } from '@/context/favorites'

const ProductSizeTableBtn = ({ sizes, type, className }: ISelectedSizes) => {
  const { lang, translations } = useLang()
  const showQuickViewModal = useUnit($showQuickViewModal)

  const handleShowSizeTable = () => {
    setIsAddToFavorites(false)

    if (!showQuickViewModal) {
      addOverflowHiddenBody()
    }

    setSizeTableSizes({ sizes, type })
    showSizeTable()
  }

  return (
    <button className={`btn-reset ${className}`} onClick={handleShowSizeTable}>
      {translations[lang].product.size_table}
    </button>
  )
}

export default ProductSizeTableBtn
