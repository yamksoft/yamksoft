import { ProductDetailPage } from '../ProductDetailPage';
import { getProductBySlug } from '../productData';

const product = getProductBySlug('yamktranslator');

export function YamkTranslatorPage() {
    if (!product) return null;
    return <ProductDetailPage product={product} />;
}
