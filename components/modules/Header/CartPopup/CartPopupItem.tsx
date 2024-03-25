import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils/common'
import { ICartItem } from '@/types/cart'
import { ProductCounter } from '../../ProductsListItem/ProductCounter'
import { useCartItemAction } from '@/hooks/useCartItemAction'
import { DeleteItemBtn } from '@/components/elements/DeleteCartItemBtn/DeleteCartItemBtn'

const CartPopupItem = ({ item }: { item: ICartItem }) => {
  const {
    increasePriceWithAnimation,
    decreasePriceWithAnimation,
    count,
    setCount,
    animatedPrice,
    deleteSpinner,
  } = useCartItemAction(item)

  return (
    <>
      <DeleteItemBtn btnDisabled={deleteSpinner} callback={() => ''} />
      <div className='cart-list__item__img'>
        <Image src={item.image} alt={item.name} width={96} height={96} />
      </div>
      <div className='cart-list__item__inner'>
        <Link
          href={`/catalog/${item.category}/${item.productId}`}
          className='cart-list__item__title'
        >
          <span>
            {item.name.replace('.', '')}
            {item.size ? ', ' : ''}
          </span>
          <span>{item.size.toLocaleUpperCase()}</span>
        </Link>
        <div className='cart-list__item__bottom'>
          <ProductCounter
            className='cart-list__item__counter'
            count={count}
            setCount={setCount}
            increasePrice={increasePriceWithAnimation}
            decreasePrice={decreasePriceWithAnimation}
            cartItem={item}
            updateCountAsync
          />
          <span className='cart-list__item__price'>
            {formatPrice(animatedPrice)} ₽
          </span>
        </div>
      </div>
    </>
  )
}

export default CartPopupItem