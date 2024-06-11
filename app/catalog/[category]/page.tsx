import { ProductsPage } from '@/components/templates/ProductsPage/ProductsPage'
import { productCategories } from '@/const/product'
import { notFound } from 'next/navigation'

const Category = ({ params }: { params: { category: string } }) => {
  if (!productCategories.includes(params.category)) {
    notFound()
  }

  return <ProductsPage searchParams={params || {}} pageName={params.category} />
}

export default Category
