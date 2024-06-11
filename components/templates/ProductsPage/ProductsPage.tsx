/* eslint-disable indent */
'use client'

import { useProductFilters } from '@/hooks/useProductFilters'
import { IProductsPage } from '@/types/catalog'
import ReactPaginate from 'react-paginate'
import styles from '@/styles/catalog/index.module.scss'
import { useLang } from '@/hooks/useLang'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import { motion } from 'framer-motion'
import { ProductsListItem } from '@/components/modules/ProductsListItem/ProductsListItem'
import { basePropsForMotion } from '@/const/motion'
import { HeadingWithCount } from '@/components/elements/HeadingWithCount/HeadingWithCount'
import { useEffect } from 'react'
import { setCatalogCategoryOptions } from '@/context/catalog'
import CatalogFilters from '@/components/modules/CatalogFilters/CatalogFilters'

const ProductsPage = ({ pageName, searchParams }: IProductsPage) => {
  const {
    handlePageChange,
    paginationProps,
    products,
    productsSpinner,
    handleApplyFiltersWithCategory,
    handleApplyFiltersWithPrice,
    handleApplyFiltersWithSizes,
    handleApplyFiltersWithColors,
    handleApplyFiltersBySort,
  } = useProductFilters(searchParams, pageName, pageName === 'catalog')

  const { lang, translations } = useLang()

  useEffect(() => {
    switch (pageName) {
      case 'catalog':
        setCatalogCategoryOptions({
          rootCategoryOptions: [
            {
              id: 2,
              title: translations[lang].main_menu.cloth,
              href: '/catalog/cloth',
            },
            {
              id: 3,
              title: translations[lang].main_menu.accessories,
              href: '/catalog/accessories',
            },
            {
              id: 4,
              title: translations[lang].main_menu.souvenirs,
              href: '/catalog/souvenirs',
            },
            {
              id: 5,
              title: translations[lang].main_menu.office,
              href: '/catalog/office',
            },
          ],
        })
        break
      case 'accessories':
        setCatalogCategoryOptions({
          accessoryCategoryOptions: [
            {
              id: 1,
              title: translations[lang].comparison.bags,
              filterHandler: () => handleApplyFiltersWithCategory('bags'),
            },
            {
              id: 2,
              title: translations[lang].comparison.headdress,
              filterHandler: () => handleApplyFiltersWithCategory('headdress'),
            },
            {
              id: 3,
              title: translations[lang].comparison.umbrella,
              filterHandler: () => handleApplyFiltersWithCategory('umbrella'),
            },
          ],
        })
        break
      case 'cloth':
        setCatalogCategoryOptions({
          clothCategoryOptions: [
            {
              id: 1,
              title: translations[lang].comparison['t-shirts'],
              filterHandler: () => handleApplyFiltersWithCategory('t-shirts'),
            },
            {
              id: 2,
              title: translations[lang].comparison['long-sleeves'],
              filterHandler: () =>
                handleApplyFiltersWithCategory('long-sleeves'),
            },
            {
              id: 3,
              title: translations[lang].comparison.hoodie,
              filterHandler: () => handleApplyFiltersWithCategory('hoodie'),
            },
            {
              id: 4,
              title: translations[lang].comparison.outerwear,
              filterHandler: () => handleApplyFiltersWithCategory('outerwear'),
            },
          ],
        })
        break
      case 'office':
        setCatalogCategoryOptions({
          officeCategoryOptions: [
            {
              id: 1,
              title: translations[lang].comparison.pen,
              filterHandler: () => handleApplyFiltersWithCategory('pen'),
            },
            {
              id: 2,
              title: translations[lang].comparison.notebook,
              filterHandler: () => handleApplyFiltersWithCategory('notebook'),
            },
          ],
        })
        break
      case 'souvenirs':
        setCatalogCategoryOptions({
          souvenirsCategoryOptions: [
            {
              id: 1,
              title: translations[lang].comparison['business-souvenirs'],
              filterHandler: () =>
                handleApplyFiltersWithCategory('business-souvenirs'),
            },
            {
              id: 2,
              title: translations[lang].comparison['promotional-souvenirs'],
              filterHandler: () =>
                handleApplyFiltersWithCategory('promotional-souvenirs'),
            },
          ],
        })
        break
      default:
        break
    }
  }, [lang])

  return (
    <>
      <HeadingWithCount
        count={products.count}
        title={
          (translations[lang].breadcrumbs as { [index: string]: string })[
            pageName
          ]
        }
        spinner={productsSpinner}
      />

      <CatalogFilters
        handleApplyFiltersWithPrice={handleApplyFiltersWithPrice}
        handleApplyFiltersWithSizes={handleApplyFiltersWithSizes}
        handleApplyFiltersWithColors={handleApplyFiltersWithColors}
        handleApplyFiltersBySort={handleApplyFiltersBySort}
      />

      {productsSpinner && (
        <motion.ul
          {...basePropsForMotion}
          className={skeletonStyles.skeleton}
          style={{ marginBottom: 60 }}
        >
          {Array.from(new Array(12)).map((_, i) => (
            <li key={i} className={skeletonStyles.skeleton__item}>
              <div className={skeletonStyles.skeleton__item__light} />
            </li>
          ))}
        </motion.ul>
      )}

      {!productsSpinner && (
        <motion.ul
          {...basePropsForMotion}
          className={`list-reset ${styles.catalog__list}`}
        >
          {(products.items || []).map((item) => (
            <ProductsListItem key={item._id} item={item} />
          ))}
        </motion.ul>
      )}

      {!products.items?.length && !productsSpinner && (
        <div className={styles.catalog__list__empty}>
          {translations[lang].common.nothing_is_found}
        </div>
      )}

      <div className={styles.catalog__bottom}>
        <ReactPaginate
          {...paginationProps}
          nextLabel={<span>{translations[lang].catalog.next_page}</span>}
          previousLabel={
            <span>{translations[lang].catalog.previous_page}</span>
          }
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}

export { ProductsPage }
