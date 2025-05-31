// components/products/ProductList.tsx
import ProductCard from './ProductCard';
import { FormattedPostType } from '@/utils/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProductList({ products }: { products: FormattedPostType[] }) {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}