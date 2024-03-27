import {
  closeCatalogMenu,
  closeMenu,
  openCatalogMenu,
  openMenu,
} from '@/context/modals'
import { useLang } from '@/hooks/useLang'
import { addOverflowHiddenBody } from '@/lib/utils/common'
import Link from 'next/link'
import { CatalogMenu } from '../Header/CatalogMenu'
import { $cart, $cartFromLs } from '@/context/cart'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { $favorites, $favoritesFromLs } from '@/context/favorites'

const MobileNavbar = () => {
  const { lang, translations } = useLang()

  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)

  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLs)

  const handleOpenMenu = () => {
    addOverflowHiddenBody()
    openMenu()
    closeCatalogMenu()
  }

  const handleOpenCatalogMenu = () => {
    addOverflowHiddenBody('0')
    openCatalogMenu()
    closeMenu()
  }

  return (
    <>
      <CatalogMenu />

      <div className='mobile-navbar'>
        <Link href={'/'} className='mobile-navbar__btn'>
          {translations[lang].breadcrumbs.main}
        </Link>

        <button
          className='btn-reset mobile-navbar__btn'
          onClick={handleOpenCatalogMenu}
        >
          {translations[lang].breadcrumbs.catalog}
        </button>

        <Link href={'/favorites'} className='mobile-navbar__btn'>
          {!!currentFavoritesByAuth.length && (
            <span className='not-empty not-empty-mobile-favorite' />
          )}
          {translations[lang].breadcrumbs.favorites}
        </Link>

        <Link href={'/cart'} className='mobile-navbar__btn'>
          {!!currentCartByAuth.length && (
            <span className='not-empty not-empty-mobile' />
          )}
          {translations[lang].breadcrumbs.cart}
        </Link>

        <button
          className='btn-reset mobile-navbar__btn'
          onClick={handleOpenMenu}
        >
          {translations[lang].common.more}
        </button>
      </div>
    </>
  )
}

export { MobileNavbar }
