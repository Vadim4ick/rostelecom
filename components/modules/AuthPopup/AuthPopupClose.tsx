import { useUnit } from 'effector-react'
import { $showQuickViewModal, $showSizeTable } from '@/context/modals'
import { closeAuthPopupWhenSomeModalOpened } from '@/lib/utils/common'

const AuthPopupClose = () => {
  const [showQuickViewModal, showSizeTable] = useUnit([
    $showQuickViewModal,
    $showSizeTable,
  ])

  const closePopup = () =>
    closeAuthPopupWhenSomeModalOpened(showQuickViewModal, showSizeTable)

  return <button className='btn-reset auth-popup__close' onClick={closePopup} />
}

export { AuthPopupClose }
