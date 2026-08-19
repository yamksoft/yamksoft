import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Download, ExternalLink, FileText, Home, Layers3, PlayCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { ProductInfo } from './productData';
import './ProductDetailPage.css';

type ProductDetailPageProps = {
    product: ProductInfo;
};

export function ProductDetailPage({ product }: ProductDetailPageProps) {
    const { language, dir, t } = useLanguage();
    const copy = product.content[language];
    const isExternalDownload = product.downloadPath.startsWith('http');

    return (
        <div className={`product-page ${dir === 'ltr' ? 'product-ltr' : ''}`} dir={dir}>
            <header className="product-header">
                <Link to="/" className="product-brand">
                    <img src="/images/desktop_icon_256.png" alt={t.auth.common.brand} />
                    <span>{t.auth.common.brand}</span>
                </Link>
                <nav className="product-nav" aria-label="Product navigation">
                    <Link to="/">
                        <Home size={17} />
                        {language === 'ar' ? 'الرئيسية' : 'Home'}
                    </Link>
                    <a href="#documentation">
                        <FileText size={17} />
                        {language === 'ar' ? 'التوثيق' : 'Docs'}
                    </a>
                    <a href="#download">
                        <Download size={17} />
                        {language === 'ar' ? 'التحميل' : 'Download'}
                    </a>
                </nav>
            </header>

            <main>
                <section className="product-hero">
                    <div className="product-hero-copy">
                        <div className="product-kicker">
                            <span style={{ backgroundColor: product.accent }} />
                            {product.category}
                        </div>
                        <h1>
                            <span>{product.shortName}</span>
                            {product.name}
                        </h1>
                        <p className="product-summary">{copy.summary}</p>
                        <div className="product-actions">
                            {product.website && (
                                <a href={product.website} className="product-primary-action" target="_blank" rel="noreferrer">
                                    {language === 'ar' ? 'زيارة المنتج' : 'Visit Product'}
                                    <ExternalLink size={18} />
                                </a>
                            )}
                            <a
                                href={isExternalDownload ? product.downloadPath : '#download'}
                                className="product-secondary-action"
                                target={isExternalDownload ? '_blank' : undefined}
                                rel={isExternalDownload ? 'noreferrer' : undefined}
                            >
                                {language === 'ar' ? 'مسار التحميل' : 'Download Path'}
                                <Download size={18} />
                            </a>
                        </div>
                    </div>

                    <aside className="product-hero-panel">
                        <div className="product-metric">
                            <span>{language === 'ar' ? 'الحالة' : 'Status'}</span>
                            <strong>{product.status}</strong>
                        </div>
                        <div className="product-metric">
                            <span>{language === 'ar' ? 'الخطة' : 'Plan'}</span>
                            <strong>{product.price}</strong>
                        </div>
                        <div className="product-tech-list">
                            {product.technologies.map((tech) => (
                                <span key={tech}>{tech}</span>
                            ))}
                        </div>
                    </aside>
                </section>

                <section className="product-section">
                    <div className="product-section-heading">
                        <Layers3 size={22} />
                        <h2>{copy.headline}</h2>
                    </div>
                    <p className="product-description">{copy.description}</p>
                    <div className="product-highlight-grid">
                        {copy.highlights.map((item) => (
                            <div className="product-highlight" key={item}>
                                <CheckCircle2 size={20} />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                    <div className="product-use-cases">
                        {copy.useCases.map((useCase) => (
                            <span key={useCase}>{useCase}</span>
                        ))}
                    </div>
                </section>

                <section className="product-section">
                    <div className="product-section-heading">
                        <PlayCircle size={22} />
                        <h2>{language === 'ar' ? 'طرق الاستخدام' : 'How to Use'}</h2>
                    </div>
                    <div className="product-steps">
                        {copy.usageSteps.map((step, index) => (
                            <div className="product-step" key={step}>
                                <span>{index + 1}</span>
                                <p>{step}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="product-section" id="documentation">
                    <div className="product-section-heading">
                        <FileText size={22} />
                        <h2>{language === 'ar' ? 'التوثيق' : 'Documentation'}</h2>
                    </div>
                    <div className="product-doc-grid">
                        {copy.documentation.map((doc) => (
                            <article className="product-doc-card" key={doc.title}>
                                <h3>{doc.title}</h3>
                                <p>{doc.body}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="product-section product-download-section" id="download">
                    <div>
                        <div className="product-section-heading">
                            <Download size={22} />
                            <h2>{language === 'ar' ? 'مسار التحميل' : 'Download Path'}</h2>
                        </div>
                        <p>{copy.downloadNote}</p>
                    </div>
                    <code dir="ltr">{product.downloadPath}</code>
                </section>

                <Link to="/" className="product-back-link">
                    <ArrowLeft size={18} />
                    {language === 'ar' ? 'العودة إلى الصفحة الرئيسية' : 'Back to Home'}
                </Link>
            </main>
        </div>
    );
}
