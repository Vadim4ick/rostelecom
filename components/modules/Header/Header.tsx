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
import { loginCheckFx } from '@/api/auth'
import { useEffect } from 'react'
import { $user } from '@/context/user'
import { useCartByAuth } from '@/hooks/useCartByAuth'

const Header = () => {
  const { lang, translations } = useLang()
  const [auth, loginCheckSpinner, user] = useUnit([
    $isAuth,
    loginCheckFx.pending,
    $user,
  ])

  const currentCartByAuth = useCartByAuth()

  console.log(currentCartByAuth)

  const handleOpenMenu = () => {
    openMenu()
    addOverflowHiddenBody()
  }

  const handleOpenSearchModal = () => {
    openSearchModal()
    addOverflowHiddenBody()
  }

  useEffect(() => {
    triggerLoginCheck()
  }, [])

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
            />
          </li>

          <li className='header__links__item'>
            <Link
              href={'/comparsion'}
              className='header__links__item__btn header__links__item__btn--compare'
            />
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
