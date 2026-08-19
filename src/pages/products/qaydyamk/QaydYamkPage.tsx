import { ProductDetailPage } from '../ProductDetailPage';
import { getProductBySlug } from '../productData';

const product = getProductBySlug('qaydyamk');

export function QaydYamkPage() {
    if (!product) return null;
    return <ProductDetailPage product={product} />;
}
