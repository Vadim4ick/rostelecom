import { IAddToCartBtnProps } from '@/types/goods'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AddToCartBtn = ({
  text,
  className,
  addToCartSpinner,
  handleAddToCart,
  btnDisabled = false,
}: IAddToCartBtnProps) => (
  <button
    disabled={btnDisabled}
    onClick={handleAddToCart}
    className={`btn-reset ${className}`}
  >
    {addToCartSpinner ? <FontAwesomeIcon spin icon={faSpinner} /> : text}
  </button>
)

export { AddToCartBtn }
