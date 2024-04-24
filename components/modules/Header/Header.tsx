'use client'

import { Logo } from '@/components/elements/Logo/Logo'
import { useLang } from '@/hooks/useLang'
import Link from 'next/link'
import { Menu } from './Menu'
import { openMenu, openSearchModal } from '@/context/modals'
import {
  addOverflowHiddenBody,
  handleOpenAuthPopup,
  triggerLoginCheck,
} from '@/lib/utils/common'
import CartPopup from './CartPopup/CartPopup'
import HeaderProfule from './HeaderProfule'
import { useUnit } from 'effector-react'
import { $isAuth } from '@/context/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import {
  addProductsFromLSToCart,
  setCartFromLs,
  setShouldShowEmpty,
} from '@/context/cart'
import { setLang } from '@/context/lang'
import {
  $favorites,
  $favoritesFromLs,
  addProductsFromLSToFavorites,
  setFavoritesFromLs,
  setShowEmptyFavorites,
} from '@/context/favorites'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import {
  $comparisonFromLs,
  $comparsion,
  addProductsFromLSToComparsion,
  setComparisonFromLs,
  setShouldShowEmptyComparison,
} from '@/context/comparsion'
import { loginCheckFx } from '@/context/user'

const Header = () => {
  const { lang, translations } = useLang()
  const [auth, loginCheckSpinner] = useUnit([$isAuth, loginCheckFx.pending])

  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLs)
  const currentComparisonByAuth = useGoodsByAuth($comparsion, $comparisonFromLs)

  const handleOpenMenu = () => {
    openMenu()
    addOverflowHiddenBody()
  }

  const handleOpenSearchModal = () => {
    openSearchModal()
    addOverflowHiddenBody()
  }

  useEffect(() => {
    const lang = JSON.parse(localStorage.getItem('lang') as string)
    const cart = JSON.parse(localStorage.getItem('cart') as string)
    const authorization = JSON.parse(localStorage.getItem('auth') as string)
    const favoritesFromLS = JSON.parse(
      localStorage.getItem('favorites') as string
    )

    const comparsionFromLS = JSON.parse(
      localStorage.getItem('comparison') as string
    )

    if (lang) {
      if (lang === 'ru' || lang === 'en') {
        setLang(lang)
      }
    }

    triggerLoginCheck()

    if (!favoritesFromLS || !favoritesFromLS?.length) {
      setShowEmptyFavorites(true)
    }

    if (!cart || !cart?.length) {
      setShouldShowEmpty(true)
    }

    if (authorization?.accessToken) {
      return
    }

    if (cart && Array.isArray(cart)) {
      if (!cart.length) {
        setShouldShowEmpty(true)
      } else {
        setCartFromLs(cart)
      }
    }

    if (favoritesFromLS && Array.isArray(favoritesFromLS)) {
      if (!favoritesFromLS.length) {
        setShowEmptyFavorites(true)
      } else {
        setFavoritesFromLs(favoritesFromLS)
      }
    }

    if (comparsionFromLS && Array.isArray(comparsionFromLS)) {
      if (!comparsionFromLS.length) {
        setShouldShowEmptyComparison(true)
      } else {
        setComparisonFromLs(comparsionFromLS)
      }
    }
  }, [])

  useEffect(() => {
    if (auth) {
      const cartFromLs = JSON.parse(localStorage.getItem('cart') as string)
      const authorization = JSON.parse(localStorage.getItem('auth') as string)
      const favoritesFromLS = JSON.parse(
        localStorage.getItem('favorites') as string
      )

      const comparsionFromLS = JSON.parse(
        localStorage.getItem('comparison') as string
      )

      if (cartFromLs && Array.isArray(cartFromLs)) {
        addProductsFromLSToCart({
          jwt: authorization.accessToken,
          cartItems: cartFromLs,
        })
      }

      if (favoritesFromLS && Array.isArray(favoritesFromLS)) {
        addProductsFromLSToFavorites({
          jwt: authorization.accessToken,
          favoriteItems: favoritesFromLS,
        })
      }

      if (comparsionFromLS && Array.isArray(comparsionFromLS)) {
        addProductsFromLSToComparsion({
          jwt: authorization.accessToken,
          comparisonItems: comparsionFromLS,
        })
      }
    }
  }, [auth])

  return (
    <header className='header'>
      <div className='container header__container'>
        <button className='btn-reset header__burger' onClick={handleOpenMenu}>
          {translations[lang].header.menu_btn}
        </button>

        <Menu />

        <div className='header__logo'>
          <Logo />
        </div>

        <ul className='header__links list-reset'>
          <li className='header__links__item'>
            <button
              className='btn-reset header__links__item__btn header__links__item__btn--search'
              onClick={handleOpenSearchModal}
            />
          </li>
          <li className='header__links__item'>
            <Link
              href={'/favorites'}
              className='header__links__item__btn header__links__item__btn--favorites'
            >
              {!!currentFavoritesByAuth.length && (
                <span className='not-empty' />
              )}
            </Link>
          </li>
          <li className='header__links__item'>
            <Link
              href={'/comparsion'}
              className='header__links__item__btn header__links__item__btn--compare'
            >
              {!!currentComparisonByAuth.length && (
                <span className='not-empty' />
              )}
            </Link>
          </li>
          <li className='header__links__item'>
            <CartPopup />
          </li>

          <li className='header__links__item header__links__item--profile'>
            {auth ? (
              <HeaderProfule />
            ) : loginCheckSpinner ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <button
                className='btn-reset header__links__item__btn header__links__item__btn--profile'
                onClick={handleOpenAuthPopup}
              />
            )}
          </li>
        </ul>
      </div>
    </header>
  )
}

export { Header }
