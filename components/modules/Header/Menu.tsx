/* eslint-disable @next/next/no-img-element */
import { Logo } from '@/components/elements/Logo/Logo'
import { AllowedLangs } from '@/const/lang'
import { setLang } from '@/context/lang'
import { $menuIsOpen, closeMenu } from '@/context/modals'
import { useLang } from '@/hooks/useLang'
import { removeOverflowHiddenBody } from '@/lib/utils/common'
import clsx from 'clsx'
import { useUnit } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Accordion from '../Accordion/Accordion'
import { usePathname } from 'next/navigation'
import MenuLinkItem from './MenuLinkItem'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import BuyersListItems from './BuyersListItems'
import ContactsListItems from './ContactsListItems'

const Menu = () => {
  const [showCatalogList, setShowCatalogList] = useState(false)
  const [showBuyersList, setShowBuyersList] = useState(false)
  const [showContactsList, setShowContactsList] = useState(false)

  const menuIsOpen = useUnit($menuIsOpen)

  const { lang, translations } = useLang()

  const handleCloseMenu = () => {
    removeOverflowHiddenBody()
    closeMenu()
  }

  const pathname = usePathname()

  const isMedia800 = useMediaQuery(800)
  const isMedia640 = useMediaQuery(640)

  const handleReddirectCatalog = (path: string) => {
    if (pathname.includes('/catalog')) {
      window.history.pushState({ path }, '', path)
      window.location.reload()
    }

    handleCloseMenu()
  }

  const handleShowCatalogList = () => {
    setShowCatalogList(true)
    setShowBuyersList(false)
    setShowContactsList(false)
  }

  const handleShowBuyersList = () => {
    setShowCatalogList(false)
    setShowBuyersList(true)
    setShowContactsList(false)
  }

  const handleContactsBuyersList = () => {
    setShowCatalogList(false)
    setShowBuyersList(false)
    setShowContactsList(true)
  }

  const clothLinks = [
    {
      id: 1,
      text: translations[lang].comparison['t-shirts'],
      href: '/catalog/cloth?offset=0&type=t-shirts',
    },
    {
      id: 2,
      text: translations[lang].comparison['long-sleeves'],
      href: '/catalog/cloth?offset=0&type=long-sleeves',
    },
    {
      id: 3,
      text: translations[lang].comparison.hoodie,
      href: '/catalog/cloth?offset=0&type=hoodie',
    },
    {
      id: 4,
      text: translations[lang].comparison.outerwear,
      href: '/catalog/cloth?offset=0&type=outerwear',
    },
  ]

  const accessoriesLinks = [
    {
      id: 1,
      text: translations[lang].comparison.bags,
      href: '/catalog/accessories?offset=0&type=bags',
    },
    {
      id: 2,
      text: translations[lang].comparison.headdress,
      href: '/catalog/accessories?offset=0&type=headdress',
    },
    {
      id: 3,
      text: translations[lang].comparison.umbrella,
      href: '/catalog/accessories?offset=0&type=umbrella',
    },
  ]

  const souvenirsLinks = [
    {
      id: 1,
      text: translations[lang].comparison['business-souvenirs'],
      href: '/catalog/souvenirs?offset=0&type=business-souvenirs',
    },
    {
      id: 2,
      text: translations[lang].comparison['promotional-souvenirs'],
      href: '/catalog/souvenirs?offset=0&type=promotional-souvenirs',
    },
  ]

  const officeLinks = [
    {
      id: 1,
      text: translations[lang].comparison.notebook,
      href: '/catalog/office?offset=0&type=notebook',
    },
    {
      id: 2,
      text: translations[lang].comparison.pen,
      href: '/catalog/office?offset=0&type=pen',
    },
  ]

  const handleSwitchLang = (lang: string) => {
    setLang(lang as AllowedLangs)
    localStorage.setItem('lang', JSON.stringify(lang))
  }

  const handleSwitchLangToRu = () => handleSwitchLang('ru')
  const handleSwitchLangToEn = () => handleSwitchLang('en')

  return (
    <nav
      className={clsx('nav-menu', {
        open: menuIsOpen,
        close: !menuIsOpen,
      })}
    >
      <div className='container nav-menu__container'>
        <div
          className={clsx('nav-menu__logo', {
            open: menuIsOpen,
          })}
        >
          <Logo />
        </div>

        <img
          className={clsx('nav-menu__bg', {
            open: menuIsOpen,
          })}
          src={`/img/menu-bg${isMedia800 ? '-small' : ''}.png`}
          alt='menu-bg'
        />

        <button
          className={clsx('btn-reset nav-menu__close', {
            open: menuIsOpen,
          })}
          onClick={handleCloseMenu}
        />

        <div
          className={clsx('nav-menu__lang', {
            open: menuIsOpen,
          })}
        >
          <button
            className={clsx('btn-reset nav-menu__lang__btn', {
              'lang-active': lang === 'ru',
            })}
            onClick={handleSwitchLangToRu}
          >
            RU
          </button>

          <button
            className={clsx('btn-reset nav-menu__lang__btn', {
              'lang-active': lang === 'en',
            })}
            onClick={handleSwitchLangToEn}
          >
            EN
          </button>
        </div>

        <ul
          className={clsx('list-reset nav-menu__list', {
            open: menuIsOpen,
          })}
        >
          {!isMedia800 && (
            <li className='nav-menu__list__item'>
              <button
                className='btn-reset nav-menu__list__item__btn'
                onMouseEnter={handleShowCatalogList}
              >
                {translations[lang].main_menu.catalog}
              </button>

              <AnimatePresence>
                {showCatalogList && (
                  <motion.ul
                    className='list-reset nav-menu__accordion'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <li className='nav-menu__accordion__item'>
                      <Accordion
                        title={translations[lang].main_menu.cloth}
                        titleClass='btn-reset nav-menu__accordion__item__title'
                      >
                        <ul className='list-reset nav-menu__accordion__item__list'>
                          {clothLinks.map((el) => (
                            <MenuLinkItem
                              key={el.id}
                              item={el}
                              handleRedirectToCatalog={handleReddirectCatalog}
                            />
                          ))}
                        </ul>
                      </Accordion>
                    </li>

                    <li className='nav-menu__accordion__item'>
                      <Accordion
                        title={translations[lang].main_menu.accessories}
                        titleClass='btn-reset nav-menu__accordion__item__title'
                      >
                        <ul className='list-reset nav-menu__accordion__item__list'>
                          {accessoriesLinks.map((el) => (
                            <MenuLinkItem
                              key={el.id}
                              item={el}
                              handleRedirectToCatalog={handleReddirectCatalog}
                            />
                          ))}
                        </ul>
                      </Accordion>
                    </li>

                    <li className='nav-menu__accordion__item'>
                      <Accordion
                        title={translations[lang].main_menu.souvenirs}
                        titleClass='btn-reset nav-menu__accordion__item__title'
                      >
                        <ul className='list-reset nav-menu__accordion__item__list'>
                          {souvenirsLinks.map((el) => (
                            <MenuLinkItem
                              key={el.id}
                              item={el}
                              handleRedirectToCatalog={handleReddirectCatalog}
                            />
                          ))}
                        </ul>
                      </Accordion>
                    </li>

                    <li className='nav-menu__accordion__item'>
                      <Accordion
                        title={translations[lang].main_menu.office}
                        titleClass='btn-reset nav-menu__accordion__item__title'
                      >
                        <ul className='list-reset nav-menu__accordion__item__list'>
                          {officeLinks.map((el) => (
                            <MenuLinkItem
                              key={el.id}
                              item={el}
                              handleRedirectToCatalog={handleReddirectCatalog}
                            />
                          ))}
                        </ul>
                      </Accordion>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          )}

          <li className='nav-menu__list__item'>
            {!isMedia640 && (
              <button
                className='btn-reset nav-menu__list__item__btn'
                onMouseEnter={handleShowBuyersList}
              >
                {translations[lang].main_menu.buyers}
              </button>
            )}

            {!isMedia640 && (
              <AnimatePresence>
                {showBuyersList && (
                  <motion.ul
                    className='list-reset nav-menu__accordion'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <BuyersListItems />
                  </motion.ul>
                )}
              </AnimatePresence>
            )}

            {isMedia640 && (
              <Accordion
                title={translations[lang].main_menu.buyers}
                titleClass='btn-reset nav-menu__list__item__btn'
              >
                <ul className='list-reset  nav-menu__accordion__item__list'>
                  <BuyersListItems />
                </ul>
              </Accordion>
            )}
          </li>

          <li className='nav-menu__list__item'>
            {!isMedia640 && (
              <button
                className='btn-reset nav-menu__list__item__btn'
                onMouseEnter={handleContactsBuyersList}
              >
                {translations[lang].main_menu.contacts}
              </button>
            )}

            {!isMedia640 && (
              <AnimatePresence>
                {showContactsList && (
                  <motion.ul
                    className='list-reset nav-menu__accordion'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ContactsListItems />
                  </motion.ul>
                )}
              </AnimatePresence>
            )}

            {isMedia640 && (
              <Accordion
                title={translations[lang].main_menu.contacts}
                titleClass='btn-reset nav-menu__list__item__btn'
              >
                <ul className='list-reset  nav-menu__accordion__item__list'>
                  <ContactsListItems />
                </ul>
              </Accordion>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export { Menu }
