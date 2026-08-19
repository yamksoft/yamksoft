import { ProductDetailPage } from '../ProductDetailPage';
import { getProductBySlug } from '../productData';

const product = getProductBySlug('yamkcoder');

export function YamkCoderPage() {
    if (!product) return null;
    return <ProductDetailPage product={product} />;
}
