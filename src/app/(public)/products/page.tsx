// app/(public)/products/page.tsx
'use server'
interface User {
  id: string
  email: string
  name: string
  posts: Post[]
  createdAt: string
}
interface PHOTO {
  id: string
  defaultImage: boolean
  childImage: string
  fileKey: string
  ownerId: string | null

}
export interface Post {
  id: string
  content?: string | null
  title: string
  published: boolean
  price: string
  author?: User
  authorId: string
  createdAt: Date
  updatedAt: Date
  productImage: PHOTO[]
}

import ProductList from '@/components/products/ProductList'
// import ProductList from "../../components/products/ProductList";

// import { getProducts } from '@/lib/api/products';
import { GetProduct } from '../../../../actions/GetProductList'
import { FormattedPostType } from '@/utils/types'

export default async function ProductsPage() {
  // const products:Post[] = await getProducts();
  const data: Response = await GetProduct();

  const products: FormattedPostType[] = await data.json();


  return (
    <div className="container mx-auto p-4">

      <h1 className="text-3xl font-bold mb-8">همه محصولات</h1>
      <ProductList products={products} />
    </div>
  );
}