import { closeQuickViewModal } from '@/context/modals'
import { useLang } from '@/hooks/useLang'
import { formatPrice, removeOverflowHiddenBody } from '@/lib/utils/common'
import styles from '@/styles/quick-view-modal/index.module.scss'
import { QuickViewModalSlider } from './QuickViewModalSlider'
import { useCartAction } from '@/hooks/useCartAction'
import { useProductImages } from '@/hooks/useProductImages'
import ProductAvailable from '@/components/elements/ProductAvailable/ProductAvailable'
import ProductColor from '../ProductsListItem/ProductColor'
import stylesForProduct from '@/styles/product-list-item/index.module.scss'
import ProductComposition from '../ProductsListItem/ProductComposition'
import ProductSizeTableBtn from '../ProductsListItem/ProductSizeTableBtn'
import { ProductSizesItem } from '../ProductsListItem/ProductSizesItem'
import { ProductCounter } from '../ProductsListItem/ProductCounter'
import { AddToCartBtn } from '../ProductsListItem/AddToCartBtn'
import Link from 'next/link'
import ProductItemActionBtn from '@/components/elements/ProductItemActionBtn/ProductItemActionBtn'
import { ICartItem } from '@/types/cart'
import { useComparisonAction } from '@/hooks/useComparisonAction'
import { useFavoritesAction } from '@/hooks/useFavoritesAction'

const QuickViewModal = () => {
  const { lang, translations } = useLang()

  const {
    product,
    selectedSize,
    setSelectedSize,
    handleAddToCart,
    addToCartSpinner,
    updateCountSpinner,
    currentCartItems,
    allCurrentCartItemCount,
    setCount,
    existingItem,
    count,
  } = useCartAction()

  const addToCart = () => handleAddToCart(count)

  const {
    addToComparisonSpinner,
    handleAddToComparison,
    isProductInComparison,
  } = useComparisonAction(product)

  const {
    addToFavoritesSpinner,
    handleAddProductToFavorites,
    isProductInFavorites,
  } = useFavoritesAction(product)

  const images = useProductImages(product)

  const handleCloseModal = () => {
    removeOverflowHiddenBody()
    closeQuickViewModal()
  }

  return (
    <div className={styles.modal}>
      <button
        className={`btn-reset ${styles.modal__close}`}
        onClick={handleCloseModal}
      />

      <div className={styles.modal__actions}>
        <ProductItemActionBtn
          text={translations[lang].product.add_to_favorites}
          iconClass={`${
            addToFavoritesSpinner
              ? 'actions__btn_spinner'
              : isProductInFavorites
                ? 'actions__btn_favorite_checked'
                : 'actions__btn_favorite'
          }`}
          withTooltip={false}
          callback={handleAddProductToFavorites}
          spinner={addToFavoritesSpinner}
        />

        <ProductItemActionBtn
          text={translations[lang].product.add_to_comparison}
          iconClass={`${
            addToComparisonSpinner
              ? 'actions__btn_spinner'
              : isProductInComparison
                ? 'actions__btn_comparison_checked'
                : 'actions__btn_comparison'
          }`}
          withTooltip={false}
          callback={handleAddToComparison}
          spinner={addToComparisonSpinner}
        />
      </div>

      <div className={styles.modal__left}>
        <QuickViewModalSlider images={images} />
      </div>

      <div className={styles.modal__right}>
        <h3 className={styles.modal__right__title}>{product.name}</h3>

        <div className={styles.modal__right__price}>
          {formatPrice(+product.price)} ₽
        </div>

        <div className={styles.modal__right__info}>
          <ProductAvailable
            vendorCode={product.vendorCode}
            inStock={+product.inStock}
          />

          <ProductColor color={product.characteristics.color} />

          {product.characteristics?.composition && (
            <ProductComposition
              composition={product.characteristics.composition}
            />
          )}

          {Object.keys(product.sizes).length ? (
            <div className={styles.modal__right__info__size}>
              <div className={styles.modal__right__info__size__inner}>
                <span className={stylesForProduct.product__size_title}>
                  {translations[lang].catalog.size}
                </span>
                <ProductSizeTableBtn
                  sizes={product.sizes}
                  type={product.type}
                  className={`sizes-table-btn ${styles.modal__right__info__sizes_btn}`}
                />
              </div>
              <ul className={`list-reset ${styles.modal__right__info__sizes}`}>
                {Object.entries(product.sizes).map(([key, value], i) => (
                  <ProductSizesItem
                    key={i}
                    currentSize={[key, value]}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    currentCartItems={currentCartItems}
                  />
                ))}
              </ul>
            </div>
          ) : (
            ''
          )}

          <div className={styles.modal__right__bottom}>
            <span className={stylesForProduct.product__count_title}>
              {translations[lang].product.count}
            </span>

            <div className={styles.modal__right__bottom__inner}>
              {!!selectedSize ? (
                <ProductCounter
                  className={`counter ${styles.modal__right__bottom__counter}`}
                  count={count}
                  totalCount={+product.inStock}
                  initialCount={+(existingItem?.count || 1)}
                  setCount={setCount}
                  cartItem={existingItem as ICartItem}
                  updateCountAsync={false}
                />
              ) : (
                <div
                  className={`counter ${styles.modal__right__bottom__counter}`}
                  style={{ justifyContent: 'center' }}
                >
                  <span>
                    {translations[lang].product.total_in_cart}{' '}
                    {allCurrentCartItemCount}
                  </span>
                </div>
              )}

              <AddToCartBtn
                className={styles.modal__right__bottom__add}
                text={translations[lang].product.to_cart}
                handleAddToCart={addToCart}
                addToCartSpinner={addToCartSpinner || updateCountSpinner}
                btnDisabled={
                  addToCartSpinner ||
                  updateCountSpinner ||
                  allCurrentCartItemCount === +product.inStock
                }
              />
            </div>
          </div>
        </div>

        <div className={styles.modal__right__more}>
          <Link
            href={`/catalog/${product.category}/${product._id}`}
            className={styles.modal__right__more__link}
            onClick={handleCloseModal}
          >
            {translations[lang].product.more}
          </Link>
        </div>
      </div>
    </div>
  )
}

export { QuickViewModal }
