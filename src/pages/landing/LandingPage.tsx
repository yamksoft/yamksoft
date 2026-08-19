import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    Code2, Smartphone, Globe, Database, Shield, Headphones,
    Mail, Phone, MapPin, Send, ChevronLeft, ExternalLink,
    Menu, X, Star, Zap, Users, Award,
    Monitor, Settings, BarChart3, Rocket,
    Twitter, Linkedin, Github, Instagram, MessageCircle, Facebook, Youtube,
    CheckCircle2, Layout, MessageSquareQuote, Sun, Moon
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { PRODUCTS } from '../products/productData';
import './LandingPage.css';

/* ─── Data (Non-translatable) ─── */
const TechLogo = ({ name, color }: { name: string, color: string }) => (
    <div className="tech-logo-svg">
        <svg width="48" height="48" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="60" rx="12" fill={`${color}15`} stroke={`${color}40`} strokeWidth="1" />
            <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle" fill={color} fontSize="14" fontWeight="800" fontFamily="sans-serif">{name.substring(0, 3).toUpperCase()}</text>
        </svg>
    </div>
);

const TECHNOLOGIES = [
    { name: 'JavaScript', color: '#f7df1e' }, { name: 'TypeScript', color: '#3178c6' },
    { name: 'Python', color: '#3776ab' }, { name: 'Java', color: '#007396' },
    { name: 'C#', color: '#239120' }, { name: 'PHP', color: '#777bb4' },
    { name: 'Swift', color: '#fa7343' }, { name: 'Kotlin', color: '#7f52ff' },
    { name: 'Go', color: '#00add8' }, { name: 'PostgreSQL', color: '#336791' },
    { name: 'MongoDB', color: '#47a248' }, { name: 'Redis', color: '#dc382d' },
    { name: 'AWS', color: '#ff9900' }, { name: 'Docker', color: '#2496ed' }
];

const FRAMEWORKS = [
    { name: 'React', color: '#61dafb' }, { name: 'Next.js', color: '#ffffff' },
    { name: 'Vue.js', color: '#4fc08d' }, { name: 'Angular', color: '#dd0031' },
    { name: 'Flutter', color: '#02569b' }, { name: 'React Native', color: '#61dafb' },
    { name: '.NET', color: '#512bd4' }, { name: 'Django', color: '#092e20' },
    { name: 'Laravel', color: '#ff2d20' }, { name: 'Spring Boot', color: '#6db33f' },
    { name: 'Express.js', color: '#ffffff' }, { name: 'Tailwind CSS', color: '#06b6d4' }
];

const PARTNER_LOGOS = [
    { name: 'Vercel', color: '#ffffff' }, { name: 'Microsoft', color: '#00a4ef' },
    { name: 'Google', color: '#4285f4' }, { name: 'AWS', color: '#ff9900' },
    { name: 'GitHub', color: '#ffffff' }, { name: 'Stripe', color: '#635BFF' },
    { name: 'Cloudflare', color: '#F38020' }, { name: 'DigitalOcean', color: '#008bcf' }
];

const CONTACT_EMAILS = ['info@yamksoft.com', 'yamksoft@gmail.com'];
const WHATSAPP_NUMBERS = [
    { label: '+966 50 000 0000', href: 'https://wa.me/966500000000' },
    { label: '+967 70 111 0186', href: 'https://wa.me/967701110186' },
];
const PHONE_NUMBERS = [
    { label: '+966 50 000 0000', href: 'tel:+966500000000' },
    { label: '+967781110186', href: 'tel:+967781110186' },
];

const SOCIAL_LINKS = [
    { label: 'Facebook', href: 'https://www.facebook.com/yamksoft', icon: <Facebook size={18} /> },
    { label: 'Telegram', href: 'https://t.me/yamksoft', icon: <Send size={18} /> },
    { label: 'WhatsApp', href: 'https://wa.me/966500000000', icon: <MessageCircle size={18} /> },
    { label: 'X / Twitter', href: 'https://x.com/yamksoft', icon: <Twitter size={18} /> },
    { label: 'Instagram', href: 'https://www.instagram.com/yamksoft', icon: <Instagram size={18} /> },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/yamksoft', icon: <Linkedin size={18} /> },
    { label: 'GitHub', href: 'https://github.com/yamksoft', icon: <Github size={18} /> },
    { label: 'YouTube', href: 'https://www.youtube.com/@yamksoft', icon: <Youtube size={18} /> },
    { label: 'Email', href: 'mailto:info@yamksoft.com', icon: <Mail size={18} />, isExternal: false },
    { label: 'Website', href: '/', icon: <Globe size={18} />, isExternal: false },
];

/* ─── Hook: Intersection Observer for Scroll Animations ─── */
function useScrollAnimation() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const el = ref.current;
        if (el) {
            const children = el.querySelectorAll('.animate-on-scroll');
            children.forEach((child) => observer.observe(child));
        }

        return () => observer.disconnect();
    }, []);

    return ref;
}

/* ─── Main Component ─── */
export function LandingPage() {
    const { t, language, toggleLanguage, dir } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const sectionRef = useScrollAnimation();

    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > 50);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    // Derived Data using translations
    const SERVICES = t.services.items.map((item, index) => ({
        ...item,
        icon: [ <Globe size={24} key={1}/>, <Smartphone size={24} key={2}/>, <Code2 size={24} key={3}/>, <Database size={24} key={4}/>, <Shield size={24} key={5}/>, <Headphones size={24} key={6}/> ][index]
    }));

    const SOLUTIONS = [
        {
            icon: <Globe size={32} />,
            title: t.solutions.web.title,
            description: t.solutions.web.description,
            features: t.solutions.web.features,
            gradient: 'linear-gradient(135deg, var(--brand-dark) 0%, var(--landing-bg-dark) 100%)',
        },
        {
            icon: <Monitor size={32} />,
            title: t.solutions.desktop.title,
            description: t.solutions.desktop.description,
            features: t.solutions.desktop.features,
            gradient: 'linear-gradient(135deg, var(--brand-dark) 0%, var(--landing-bg-deep) 100%)',
        },
        {
            icon: <Smartphone size={32} />,
            title: t.solutions.mobile.title,
            description: t.solutions.mobile.description,
            features: t.solutions.mobile.features,
            gradient: 'linear-gradient(135deg, var(--brand-dark) 0%, var(--landing-bg-card) 100%)',
        },
    ];

    const WORKFLOW_STEPS = t.workflow.steps.map((step, index) => ({
        ...step,
        icon: [ <MessageSquareQuote size={24} key={1}/>, <Layout size={24} key={2}/>, <Code2 size={24} key={3}/>, <CheckCircle2 size={24} key={4}/> ][index]
    }));

    const projectGradients: [string, string, string, string] = [
            'linear-gradient(135deg, rgba(0, 114, 255,0.2) 0%, var(--landing-bg-dark) 100%)',
            'linear-gradient(135deg, rgba(124, 58, 237,0.18) 0%, var(--landing-bg-dark) 100%)',
            'linear-gradient(135deg, rgba(34, 197, 94,0.18) 0%, var(--landing-bg-dark) 100%)',
            'linear-gradient(135deg, rgba(245, 158, 11,0.18) 0%, var(--landing-bg-dark) 100%)'
    ];

    const PROJECTS = PRODUCTS.map((product, index) => ({
        title: `${product.shortName} ${product.name !== product.shortName ? product.name : ''}`.trim(),
        description: product.content[language].summary,
        href: `/products/${product.slug}`,
        website: product.website,
        status: product.status,
        price: product.price,
        tags: product.technologies.slice(0, 3),
        gradient: projectGradients[index] ?? projectGradients[0]
    }));

    const TESTIMONIALS = t.testimonials.names.map((name, index) => ({
        name,
        role: t.testimonials.roles[index],
        content: t.testimonials.content[index],
        rating: 5,
    }));

    return (
        <div className={`landing-page ${dir === 'ltr' ? 'ltr-layout' : ''}`} ref={sectionRef} dir={dir}>
            {/* ===== NAVBAR ===== */}
            <nav className={`landing-navbar ${isScrolled ? 'scrolled' : ''}`} id="landing-navbar">
                <div className="navbar-container">
                    <a href="#hero" className="navbar-logo" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
                        <img src="/images/desktop_icon_256.png" alt="YamkSoft Logo" />
                        <div className="navbar-logo-text">
                            <span className="logo-ar">يــــمـــك ســـوفــــت</span>
                            <span className="logo-en">YamkSoft</span>
                        </div>
                    </a>

                    <ul className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}>
                        {mobileMenuOpen && (
                            <button className="mobile-close-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Close">
                                <X size={24} />
                            </button>
                        )}
                        <li><a href="#technologies" onClick={(e) => { e.preventDefault(); scrollToSection('technologies'); }}>{t.nav.technologies}</a></li>
                        <li><a href="#solutions" onClick={(e) => { e.preventDefault(); scrollToSection('solutions'); }}>{t.nav.solutions}</a></li>
                        <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>{t.nav.services}</a></li>
                        <li><a href="#workflow" onClick={(e) => { e.preventDefault(); scrollToSection('workflow'); }}>{t.nav.workflow}</a></li>
                        <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>{t.nav.projects}</a></li>
                        <li><a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection('testimonials'); }}>{t.nav.testimonials}</a></li>
                        <li><a href="#partners" onClick={(e) => { e.preventDefault(); scrollToSection('partners'); }}>{t.nav.partners}</a></li>
                        <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>{t.nav.contact}</a></li>
                        
                        <div className="navbar-controls">
                            <button className="btn-icon" onClick={toggleTheme} aria-label="Toggle Theme">
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <button className="btn-icon lang-btn" onClick={toggleLanguage} aria-label="Toggle Language">
                                {language === 'ar' ? 'EN' : 'عربي'}
                            </button>
                            <Link to="/login" className="navbar-cta">{t.nav.login}</Link>
                        </div>
                    </ul>

                    <div className="mobile-controls-wrapper">
                        <button className="btn-icon mobile-only" onClick={toggleTheme} aria-label="Toggle Theme">
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button className="btn-icon lang-btn mobile-only" onClick={toggleLanguage} aria-label="Toggle Language">
                            {language === 'ar' ? 'EN' : 'عربي'}
                        </button>
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Menu"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)} />
            )}

            {/* ===== HERO SECTION ===== */}
            <section className="hero-section" id="hero">
                <div className="hero-mesh" />
                <div className="hero-orb hero-orb-1" />
                <div className="hero-orb hero-orb-2" />
                <div className="hero-orb hero-orb-3" />

                <div className="hero-content">
                    <div className="hero-brand-animated">
                        <span className="brand-text-ar">يــــمـــك ســـوفــــت</span>
                        <span className="brand-text-en">YamkSoft</span>
                    </div>

                    <div className="hero-badge">
                        <span className="hero-badge-dot" />
                        <span>{t.hero.badge}</span>
                    </div>

                    <h1 className="hero-title">
                        {t.hero.titleStart}{' '}
                        <span className="hero-title-brand">{t.hero.titleGold}</span>
                        <br />
                        {t.hero.titleEnd}
                    </h1>

                    <p className="hero-description">
                        {t.hero.description}
                    </p>

                    <div className="hero-actions">
                        <button className="btn-primary" onClick={() => scrollToSection('contact')}>
                            <Send size={18} className={dir === 'ltr' ? 'icon-ltr' : ''} />
                            {t.hero.contactBtn}
                        </button>
                        <button className="btn-outline-primary" onClick={() => scrollToSection('services')}>
                            {t.hero.exploreBtn}
                            <ChevronLeft size={18} className={dir === 'ltr' ? 'icon-ltr' : ''} />
                        </button>
                    </div>

                    <div className="hero-stats">
                        <div className="hero-stat">
                            <div className="hero-stat-number">+150</div>
                            <div className="hero-stat-label">{t.hero.stats.projects}</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-number">+50</div>
                            <div className="hero-stat-label">{t.hero.stats.clients}</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-number">+8</div>
                            <div className="hero-stat-label">{t.hero.stats.experience}</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-number">24/7</div>
                            <div className="hero-stat-label">{t.hero.stats.support}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== TECHNOLOGIES SECTION ===== */}
            <section className="landing-section tech-section" id="technologies">
                <div className="section-container">
                    <div className="section-header animate-on-scroll">
                        <div className="section-label">{t.tech.label}</div>
                        <h2 className="section-title">{t.tech.title}</h2>
                    </div>

                    <div className="tech-marquee-wrapper">
                        <div className="tech-marquee">
                            <div className="tech-marquee-track">
                                {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, index) => (
                                    <div key={index} className="tech-item">
                                        <TechLogo name={tech.name} color={tech.color} />
                                        <span className="tech-name">{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="tech-marquee tech-marquee-reverse">
                            <div className="tech-marquee-track">
                                {[...TECHNOLOGIES, ...TECHNOLOGIES].reverse().map((tech, index) => (
                                    <div key={`rev-${index}`} className="tech-item">
                                        <TechLogo name={tech.name} color={tech.color} />
                                        <span className="tech-name">{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="tech-marquee">
                            <div className="tech-marquee-track" style={{ animationDuration: '45s' }}>
                                {[...FRAMEWORKS, ...FRAMEWORKS].map((tech, index) => (
                                    <div key={`fw-${index}`} className="tech-item">
                                        <TechLogo name={tech.name} color={tech.color} />
                                        <span className="tech-name">{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== SERVICES SECTION ===== */}
            <section className="landing-section services-section" id="services">
                <div className="section-container">
                    <div className="section-header animate-on-scroll">
                        <div className="section-label">{t.services.label}</div>
                        <h2 className="section-title">{t.services.title}</h2>
                        <p className="section-subtitle">
                            {t.services.subtitle}
                        </p>
                    </div>

                    <div className="services-grid">
                        {SERVICES.map((service, index) => (
                            <div
                                key={index}
                                className={`service-card animate-on-scroll animate-delay-${index + 1}`}
                            >
                                <div className="service-icon">{service.icon}</div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-description">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== SOLUTIONS SECTION ===== */}
            <section className="landing-section solutions-section" id="solutions">
                <div className="section-container">
                    <div className="section-header animate-on-scroll">
                        <div className="section-label">{t.solutions.label}</div>
                        <h2 className="section-title">{t.solutions.title}</h2>
                        <p className="section-subtitle">
                            {t.solutions.subtitle}
                        </p>
                    </div>

                    <div className="solutions-grid">
                        {SOLUTIONS.map((solution, index) => (
                            <div key={index} className={`solution-card animate-on-scroll animate-delay-${index + 1}`}>
                                <div className="solution-card-inner" style={{ background: solution.gradient }}>
                                    <div className="solution-icon-wrapper">
                                        {solution.icon}
                                    </div>
                                    <h3 className="solution-title">{solution.title}</h3>
                                    <p className="solution-description">{solution.description}</p>
                                    
                                    <ul className="solution-features">
                                        {solution.features.map((feature, i) => (
                                            <li key={i}>
                                                <CheckCircle2 size={18} className="feature-check" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== ABOUT SECTION ===== */}
            <section className="landing-section about-section" id="about">
                <div className="section-container">
                    <div className="about-grid">
                        <div className="about-content animate-on-scroll">
                            <div className="section-label">{t.about.label}</div>
                            <h3>
                                {t.about.titleStart}
                                <span className="hero-title-brand">{t.about.titleGold1}</span>
                                {t.about.titleAnd}
                                <span className="hero-title-brand">{t.about.titleGold2}</span>
                            </h3>
                            <p>
                                {t.about.description}
                            </p>

                            <div className="about-features">
                                <div className="about-feature">
                                    <div className="about-feature-icon"><Zap size={16} /></div>
                                    <span>{t.about.features[0]}</span>
                                </div>
                                <div className="about-feature">
                                    <div className="about-feature-icon"><Shield size={16} /></div>
                                    <span>{t.about.features[1]}</span>
                                </div>
                                <div className="about-feature">
                                    <div className="about-feature-icon"><Star size={16} /></div>
                                    <span>{t.about.features[2]}</span>
                                </div>
                                <div className="about-feature">
                                    <div className="about-feature-icon"><Users size={16} /></div>
                                    <span>{t.about.features[3]}</span>
                                </div>
                                <div className="about-feature">
                                    <div className="about-feature-icon"><Monitor size={16} /></div>
                                    <span>{t.about.features[4]}</span>
                                </div>
                                <div className="about-feature">
                                    <div className="about-feature-icon"><Settings size={16} /></div>
                                    <span>{t.about.features[5]}</span>
                                </div>
                            </div>
                        </div>

                        <div className="about-visual animate-on-scroll animate-delay-2">
                            <div className="about-visual-card">
                                <div className="about-stat-grid">
                                    <div className="about-stat-item">
                                        <div className="about-stat-number">+150</div>
                                        <div className="about-stat-text">{t.about.stats.projects}</div>
                                    </div>
                                    <div className="about-stat-item">
                                        <div className="about-stat-number">98%</div>
                                        <div className="about-stat-text">{t.about.stats.satisfaction}</div>
                                    </div>
                                    <div className="about-stat-item">
                                        <div className="about-stat-number">+25</div>
                                        <div className="about-stat-text">{t.about.stats.developers}</div>
                                    </div>
                                    <div className="about-stat-item">
                                        <div className="about-stat-number">+8</div>
                                        <div className="about-stat-text">{t.about.stats.experience}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== WORKFLOW SECTION ===== */}
            <section className="landing-section workflow-section" id="workflow">
                <div className="section-container">
                    <div className="section-header animate-on-scroll">
                        <div className="section-label">{t.workflow.label}</div>
                        <h2 className="section-title">{t.workflow.title}</h2>
                        <p className="section-subtitle">
                            {t.workflow.subtitle}
                        </p>
                    </div>

                    <div className="workflow-timeline">
                        {WORKFLOW_STEPS.map((step, index) => (
                            <div key={index} className={`workflow-step animate-on-scroll animate-delay-${index + 1}`}>
                                <div className="workflow-step-icon">
                                    {step.icon}
                                    <div className="workflow-step-number">{index + 1}</div>
                                </div>
                                <div className="workflow-step-content">
                                    <h3 className="workflow-step-title">{step.title}</h3>
                                    <p className="workflow-step-description">{step.description}</p>
                                </div>
                                {index < WORKFLOW_STEPS.length - 1 && <div className="workflow-connector" />}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PROJECTS SECTION ===== */}
            <section className="landing-section projects-section" id="projects">
                <div className="section-container">
                    <div className="section-header animate-on-scroll">
                        <div className="section-label">{t.projects.label}</div>
                        <h2 className="section-title">{t.projects.title}</h2>
                        <p className="section-subtitle">
                            {t.projects.subtitle}
                        </p>
                    </div>

                    <div className="projects-grid">
                        {PROJECTS.map((project, index) => (
                            <article
                                key={index}
                                className={`project-card animate-on-scroll animate-delay-${index + 1}`}
                            >
                                <div className="project-image-wrapper">
                                    <div
                                        className="project-image"
                                        style={{
                                            background: project.gradient,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {index === 0 && <BarChart3 size={64} color="rgba(0, 114, 255,0.2)" />}
                                        {index === 1 && <Smartphone size={64} color="rgba(0, 114, 255,0.2)" />}
                                        {index === 2 && <Monitor size={64} color="rgba(0, 114, 255,0.2)" />}
                                        {index === 3 && <Award size={64} color="rgba(0, 114, 255,0.2)" />}
                                    </div>
                                    <div className="project-overlay" />
                                </div>
                                <div className="project-content">
                                    <div className="project-tags">
                                        {project.tags.map((tag, i) => (
                                            <span key={i} className="project-tag">{tag}</span>
                                        ))}
                                    </div>
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-description">{project.description}</p>
                                    <div className="project-meta">
                                        <span>{project.status}</span>
                                        <span>{project.price}</span>
                                    </div>
                                    <div className="project-actions">
                                        <Link className="project-link-text" to={project.href}>
                                            {language === 'ar' ? 'عرض التفاصيل والتوثيق' : 'View details and docs'}
                                            <ChevronLeft size={16} className={dir === 'ltr' ? 'icon-ltr' : ''} />
                                        </Link>
                                        {project.website && (
                                            <a className="project-visit-link" href={project.website} target="_blank" rel="noreferrer">
                                                {language === 'ar' ? 'زيارة صفحة التطبيق' : 'Visit app page'}
                                                <ExternalLink size={16} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIALS SECTION ===== */}
            <section className="landing-section testimonials-section" id="testimonials">
                <div className="section-container">
                    <div className="section-header animate-on-scroll">
                        <div className="section-label">{t.testimonials.label}</div>
                        <h2 className="section-title">{t.testimonials.title}</h2>
                        <p className="section-subtitle">
                            {t.testimonials.subtitle}
                        </p>
                    </div>

                    <div className="testimonials-grid">
                        {TESTIMONIALS.map((testimonial, index) => (
                            <div key={index} className={`testimonial-card animate-on-scroll animate-delay-${index + 1}`}>
                                <div className="testimonial-rating">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={18} className="star-icon filled" />
                                    ))}
                                </div>
                                <p className="testimonial-content">"{testimonial.content}"</p>
                                <div className="testimonial-author">
                                    <div className="author-avatar">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div className="author-info">
                                        <h4 className="author-name">{testimonial.name}</h4>
                                        <span className="author-role">{testimonial.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PARTNERS SECTION ===== */}
            <section className="landing-section partners-section" id="partners">
                <div className="section-container">
                    <div className="section-header animate-on-scroll">
                        <div className="section-label">{t.partners.label}</div>
                        <h2 className="section-title">{t.partners.title}</h2>
                        <p className="section-subtitle">
                            {t.partners.subtitle}
                        </p>
                    </div>
                </div>

                <div className="partners-track">
                    {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((partner, index) => (
                        <div key={index} className="partner-item">
                            <TechLogo name={partner.name} color={partner.color} />
                            <span className="partner-name">{partner.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== CONTACT SECTION ===== */}
            <section className="landing-section contact-section" id="contact">
                <div className="section-container">
                    <div className="section-header animate-on-scroll">
                        <div className="section-label">{t.contact.label}</div>
                        <h2 className="section-title">{t.contact.title}</h2>
                        <p className="section-subtitle">
                            {t.contact.subtitle}
                        </p>
                    </div>

                    <div className="contact-grid">
                        <div className="contact-info animate-on-scroll">
                            <h3>
                                {t.contact.infoTitlePart1} <span className="hero-title-brand">{t.contact.infoTitleGold}</span>
                            </h3>
                            <p>
                                {t.contact.infoDesc}
                            </p>

                            <div className="contact-methods">
                                <div className="contact-method">
                                    <div className="contact-method-icon">
                                        <Mail size={20} />
                                    </div>
                                    <div className="contact-method-text">
                                        <strong>{t.contact.email}</strong>
                                        <div className="contact-method-values">
                                            {CONTACT_EMAILS.map((email) => (
                                                <a key={email} href={`mailto:${email}`} dir="ltr">{email}</a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="contact-method">
                                    <div className="contact-method-icon">
                                        <MessageCircle size={20} />
                                    </div>
                                    <div className="contact-method-text">
                                        <strong>{t.contact.whatsapp}</strong>
                                        <div className="contact-method-values">
                                            {WHATSAPP_NUMBERS.map((number) => (
                                                <a key={number.href} href={number.href} target="_blank" rel="noreferrer" dir="ltr">{number.label}</a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="contact-method">
                                    <div className="contact-method-icon">
                                        <Phone size={20} />
                                    </div>
                                    <div className="contact-method-text">
                                        <strong>{t.contact.phone}</strong>
                                        <div className="contact-method-values">
                                            {PHONE_NUMBERS.map((number) => (
                                                <a key={number.href} href={number.href} dir="ltr">{number.label}</a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="contact-method">
                                    <div className="contact-method-icon">
                                        <MapPin size={20} />
                                    </div>
                                    <div className="contact-method-text">
                                        <strong>{t.contact.branches}</strong>
                                        <div className="contact-method-values">
                                            {t.contact.branchLocations.map((location) => (
                                                <span key={location}>{location}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-wrapper animate-on-scroll animate-delay-2">
                            <form className="contact-form" onSubmit={handleFormSubmit}>
                                <div className="contact-form-row">
                                    <div className="form-field">
                                        <label htmlFor="contact-name">{t.contact.form.name}</label>
                                        <input type="text" id="contact-name" placeholder={t.contact.form.namePh} />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="contact-email">{t.contact.form.email}</label>
                                        <input type="email" id="contact-email" placeholder={t.contact.form.emailPh} dir="ltr" />
                                    </div>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="contact-subject">{t.contact.form.subject}</label>
                                    <input type="text" id="contact-subject" placeholder={t.contact.form.subjectPh} />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="contact-message">{t.contact.form.message}</label>
                                    <textarea id="contact-message" placeholder={t.contact.form.messagePh} />
                                </div>
                                <button type="submit" className="contact-submit">
                                    <Send size={18} className={dir === 'ltr' ? 'icon-ltr' : ''} style={{ display: 'inline', margin: '0 8px', verticalAlign: 'middle' }} />
                                    {t.contact.form.submit}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="cta-section">
                <div className="cta-container animate-on-scroll">
                    <Rocket size={48} color="#0072ff" style={{ marginBottom: '1rem', opacity: 0.8 }} />
                    <h2 className="cta-title">
                        {t.cta.titleStart} <span className="hero-title-brand">{t.cta.titleGold}</span>{t.cta.titleEnd}
                    </h2>
                    <p className="cta-description">
                        {t.cta.description}
                    </p>
                    <div className="cta-actions">
                        <button className="btn-primary" onClick={() => scrollToSection('contact')}>
                            <Send size={18} className={dir === 'ltr' ? 'icon-ltr' : ''} />
                            {t.cta.btnPrimary}
                        </button>
                        <Link to="/login" className="btn-outline-primary">
                            {t.cta.btnSecondary}
                            <ChevronLeft size={18} className={dir === 'ltr' ? 'icon-ltr' : ''} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="landing-footer">
                <div className="footer-container">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <a href="#hero" className="footer-logo" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
                                <img src="/images/desktop_icon_256.png" alt="YamkSoft" />
                                <span className="footer-logo-text">YamkSoft</span>
                            </a>
                            <p>
                                {t.footer.description}
                            </p>
                            <div className="footer-socials">
                                {SOCIAL_LINKS.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className="footer-social-link"
                                        aria-label={link.label}
                                        title={link.label}
                                        target={link.isExternal === false ? undefined : '_blank'}
                                        rel={link.isExternal === false ? undefined : 'noreferrer'}
                                    >
                                        {link.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="footer-section">
                            <h4>{t.footer.sections.services}</h4>
                            <ul className="footer-links">
                                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>{t.solutions.web.title}</a></li>
                                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>{t.solutions.mobile.title}</a></li>
                                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>{t.services.items[2].title}</a></li>
                                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>{t.services.items[3].title}</a></li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h4>{t.footer.sections.company}</h4>
                            <ul className="footer-links">
                                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>{t.about.label}</a></li>
                                <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>{t.projects.label}</a></li>
                                <li><a href="#partners" onClick={(e) => { e.preventDefault(); scrollToSection('partners'); }}>{t.partners.label}</a></li>
                                <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>{t.contact.label}</a></li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h4>{t.footer.sections.contact}</h4>
                            <ul className="footer-links footer-contact-links">
                                {CONTACT_EMAILS.map((email) => (
                                    <li key={email}>
                                        <a href={`mailto:${email}`} className="footer-contact-link">
                                            <span className="footer-contact-label">{t.contact.email}</span>
                                            <span className="footer-contact-value" dir="ltr">{email}</span>
                                        </a>
                                    </li>
                                ))}
                                {WHATSAPP_NUMBERS.map((number) => (
                                    <li key={number.href}>
                                        <a href={number.href} className="footer-contact-link" target="_blank" rel="noreferrer">
                                            <span className="footer-contact-label">{t.contact.whatsapp}</span>
                                            <span className="footer-contact-value" dir="ltr">{number.label}</span>
                                        </a>
                                    </li>
                                ))}
                                {PHONE_NUMBERS.map((number) => (
                                    <li key={number.href}>
                                        <a href={number.href} className="footer-contact-link">
                                            <span className="footer-contact-label">{t.contact.phone}</span>
                                            <span className="footer-contact-value" dir="ltr">{number.label}</span>
                                        </a>
                                    </li>
                                ))}
                                <li>
                                    <a href="#contact" className="footer-contact-link">
                                        <span className="footer-contact-label">{t.contact.branches}</span>
                                        <span className="footer-contact-value">{t.contact.branchLocations.join(' - ')}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p className="footer-copyright">
                            © {new Date().getFullYear()} <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>YamkSoft</a>. {t.footer.copyright}
                        </p>
                        <div className="footer-bottom-links">
                            <a href="#">{t.footer.privacy}</a>
                            <a href="#">{t.footer.terms}</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
