import { ProductsPage } from '@/components/templates/ProductsPage/ProductsPage'
import { SearchParams } from '@/types/catalog'

const Catalog = ({ searchParams }: { searchParams?: SearchParams }) => (
  <ProductsPage searchParams={searchParams || {}} pageName='catalog' />
)

export default Catalog
