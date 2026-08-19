import { ProductDetailPage } from '../ProductDetailPage';
import { getProductBySlug } from '../productData';

const product = getProductBySlug('yamkeyecare');

export function YamkEyeCarePage() {
    if (!product) return null;
    return <ProductDetailPage product={product} />;
}
