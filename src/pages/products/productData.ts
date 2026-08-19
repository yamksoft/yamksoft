export type ProductSlug = 'qaydyamk' | 'yamkcoder' | 'yamkeyecare' | 'yamktranslator';

export type ProductInfo = {
    slug: ProductSlug;
    name: string;
    shortName: string;
    category: string;
    price: string;
    status: string;
    accent: string;
    website?: string;
    downloadPath: string;
    technologies: string[];
    content: {
        ar: ProductCopy;
        en: ProductCopy;
    };
};

export type ProductCopy = {
    headline: string;
    summary: string;
    description: string;
    highlights: string[];
    useCases: string[];
    usageSteps: string[];
    documentation: Array<{
        title: string;
        body: string;
    }>;
    downloadNote: string;
};

export const PRODUCTS: ProductInfo[] = [
    {
        slug: 'qaydyamk',
        name: 'QaydYamk',
        shortName: 'قيد يمك',
        category: 'ERP Accounting',
        price: 'Free trial',
        status: 'Cloud + Desktop',
        accent: '#00c6ff',
        website: 'https://qaydyamk.vercel.app/',
        downloadPath: '/downloads/qaydyamk',
        technologies: ['Flutter', 'ERP', 'Cloud', 'Google Drive Sync', 'Windows'],
        content: {
            ar: {
                headline: 'نظام محاسبي ERP سحابي متعدد المنصات',
                summary: 'قيد يمك هو أحد أبرز منتجات يمك سوفت: نظام محاسبي متكامل يعمل على الويب والجوال والديسكتوب، مع نسخة Windows أوفلاين قابلة للمزامنة مع Google Drive.',
                description: 'صمم QaydYamk للشركات والمتاجر والفرق التي تحتاج نظامًا محاسبيًا واضحًا وقابلًا للتوسع. يعتمد على Flutter لتقديم تجربة موحدة عبر أنظمة التشغيل، مع خطة اشتراك تجريبية مجانية للبدء بسرعة.',
                highlights: [
                    'إدارة الحسابات والعمليات المالية ضمن نظام ERP متكامل.',
                    'تجربة سحابية متعددة المنصات تعمل على مختلف أنظمة التشغيل.',
                    'نسخة Windows Desktop تعمل أوفلاين وتزامن البيانات مع Google Drive.',
                    'خطة مجانية تجريبية لاختبار النظام قبل الاشتراك.',
                ],
                useCases: ['المحاسبة اليومية', 'إدارة المؤسسات', 'نقاط البيع والمخزون', 'فرق العمل متعددة الفروع'],
                usageSteps: [
                    'افتح رابط النظام السحابي وأنشئ حسابًا تجريبيًا.',
                    'أدخل بيانات المؤسسة الأساسية والفروع والمستخدمين.',
                    'ابدأ بإضافة الحسابات والقيود والعمليات اليومية.',
                    'لنسخة Windows، ثبّت التطبيق وفعل مزامنة Google Drive للعمل أوفلاين.',
                ],
                documentation: [
                    { title: 'الإعداد الأولي', body: 'ابدأ بضبط بيانات الشركة، العملة، السنة المالية، الفروع، وصلاحيات المستخدمين.' },
                    { title: 'المزامنة والعمل أوفلاين', body: 'نسخة Windows مخصصة للعمل بدون إنترنت، ثم مزامنة النسخ الاحتياطية والبيانات عبر Google Drive عند توفر الاتصال.' },
                    { title: 'الاشتراك التجريبي', body: 'يمكن تجربة النظام مجانًا من النسخة السحابية قبل الانتقال إلى خطة مدفوعة أو نسخة ديسكتوب حسب الاحتياج.' },
                ],
                downloadNote: 'النسخة السحابية متاحة من رابط المنتج، ومسار تحميل نسخة Windows موثق هنا لحين نشر ملف التثبيت النهائي.',
            },
            en: {
                headline: 'Multi-platform cloud ERP accounting system',
                summary: 'QaydYamk is one of YamkSoft’s flagship products: a complete accounting ERP for web, mobile, and desktop, with an offline Windows edition that syncs through Google Drive.',
                description: 'QaydYamk is built for companies, shops, and teams that need a clear and scalable accounting workflow. It uses Flutter to deliver a consistent experience across operating systems, with a free trial plan to get started.',
                highlights: [
                    'Manage accounting and financial operations inside an integrated ERP.',
                    'Cloud experience across multiple operating systems and devices.',
                    'Offline Windows Desktop edition with Google Drive synchronization.',
                    'Free trial plan before choosing a subscription.',
                ],
                useCases: ['Daily accounting', 'Enterprise management', 'POS and inventory', 'Multi-branch teams'],
                usageSteps: [
                    'Open the cloud system link and create a trial account.',
                    'Add company basics, branches, and users.',
                    'Start recording accounts, entries, and daily operations.',
                    'For Windows, install the desktop edition and enable Google Drive sync for offline work.',
                ],
                documentation: [
                    { title: 'Initial setup', body: 'Configure company information, currency, fiscal year, branches, and user permissions.' },
                    { title: 'Offline and sync', body: 'The Windows edition works offline, then synchronizes backups and data through Google Drive when connection is available.' },
                    { title: 'Trial plan', body: 'Try the cloud version for free before moving to a paid plan or desktop edition.' },
                ],
                downloadNote: 'The cloud version is available from the product website. The Windows download path is documented here until the final installer is published.',
            },
        },
    },
    {
        slug: 'yamkcoder',
        name: 'YamkCoder',
        shortName: 'مبرمج يمك',
        category: 'VS Code Extension',
        price: 'Free',
        status: 'Developer Tool',
        accent: '#7c3aed',
        website: 'https://yamkcoder.vercel.app/',
        downloadPath: '/downloads/yamkcoder/yamkcoder.vsix',
        technologies: ['VS Code', 'AI Providers', 'Local Models', 'Cloud AI'],
        content: {
            ar: {
                headline: 'ملحق VS Code يربطك بمزودات الذكاء الاصطناعي',
                summary: 'YamkCoder مساعد برمجي داخل VS Code يتيح للمطورين العمل مع مزودات ذكاء اصطناعي سحابية ومحلية من مكان واحد.',
                description: 'يوفر YamkCoder تجربة مركزة للكتابة والتحليل والمراجعة داخل بيئة التطوير، مع قابلية ربط النماذج المحلية أو الخدمات السحابية حسب سياسة الفريق واحتياجات المشروع.',
                highlights: [
                    'يدعم الربط مع مزودات ذكاء اصطناعي متعددة.',
                    'مناسب للنماذج السحابية والمحلية.',
                    'مصمم للعمل داخل VS Code بدون مغادرة المحرر.',
                    'مجاني للمطورين والفرق الصغيرة.',
                ],
                useCases: ['شرح الكود', 'اقتراح تحسينات', 'مراجعة الملفات', 'توليد اختبارات أولية'],
                usageSteps: [
                    'حمّل ملف الملحق VSIX من مسار التحميل.',
                    'ثبّت الملحق داخل VS Code من خيار Install from VSIX.',
                    'أضف مفاتيح المزود السحابي أو إعدادات النموذج المحلي.',
                    'ابدأ استخدام الأوامر من Command Palette داخل VS Code.',
                ],
                documentation: [
                    { title: 'إعداد المزودات', body: 'يمكن تعريف أكثر من مزود واختيار المزود المناسب لكل مهمة برمجية.' },
                    { title: 'النماذج المحلية', body: 'يدعم العمل مع نماذج محلية عند توفر خادم inference محلي أو endpoint متوافق.' },
                    { title: 'الاستخدام داخل المشروع', body: 'يفضل ضبط إعدادات المشروع والفريق في ملف workspace لتوحيد التجربة بين المطورين.' },
                ],
                downloadNote: 'المنتج مجاني، وسيتم نشر ملف VSIX في مسار التحميل المحدد عند تجهيز حزمة الإصدار.',
            },
            en: {
                headline: 'VS Code extension for cloud and local AI providers',
                summary: 'YamkCoder is a coding assistant inside VS Code that lets developers work with cloud and local AI providers from one place.',
                description: 'YamkCoder focuses on writing, analysis, and review inside the editor, with support for local models or cloud services depending on team policy and project needs.',
                highlights: [
                    'Connect multiple AI providers.',
                    'Supports cloud services and local models.',
                    'Works inside VS Code without leaving the editor.',
                    'Free for developers and small teams.',
                ],
                useCases: ['Code explanation', 'Improvement suggestions', 'File review', 'Test scaffolding'],
                usageSteps: [
                    'Download the VSIX extension from the download path.',
                    'Install it in VS Code using Install from VSIX.',
                    'Add cloud provider keys or local model settings.',
                    'Start from the VS Code Command Palette.',
                ],
                documentation: [
                    { title: 'Provider setup', body: 'Define multiple providers and choose the right provider for each coding task.' },
                    { title: 'Local models', body: 'Use local models when a local inference server or compatible endpoint is available.' },
                    { title: 'Project usage', body: 'Workspace settings are recommended to keep a consistent team experience.' },
                ],
                downloadNote: 'The product is free. The VSIX package will be published at the documented path when the release bundle is ready.',
            },
        },
    },
    {
        slug: 'yamkeyecare',
        name: 'YamkEyeCare',
        shortName: 'واقي العين يمك',
        category: 'Wellness App',
        price: 'Free',
        status: 'Multi-platform',
        accent: '#22c55e',
        website: 'https://yamkeyecare.vercel.app/',
        downloadPath: '/downloads/yamkeyecare',
        technologies: ['Flutter', 'Desktop', 'Mobile', 'Health Reminders'],
        content: {
            ar: {
                headline: 'حماية العين وتنبيهات الراحة وشرب الماء',
                summary: 'YamkEyeCare تطبيق يساعدك على تقليل إجهاد العين من أشعة الشاشات، وينبهك لأخذ فترات راحة وشرب الماء خلال العمل.',
                description: 'صمم التطبيق للأشخاص الذين يعملون لساعات طويلة أمام الحاسوب أو الهاتف. يقدم تذكيرات هادئة ومنظمة، ويعمل على جميع المنصات لتبقى عاداتك الصحية قريبة منك.',
                highlights: [
                    'تنبيهات دورية للراحة من الشاشة.',
                    'تذكير بشرب الماء أثناء ساعات العمل.',
                    'تجربة متعددة المنصات للأجهزة المكتبية والمحمولة.',
                    'مجاني ومناسب للاستخدام اليومي.',
                ],
                useCases: ['العمل المكتبي الطويل', 'الدراسة', 'البرمجة', 'إدارة وقت الشاشة'],
                usageSteps: [
                    'حمّل النسخة المناسبة لجهازك من مسار التحميل.',
                    'حدد مدة جلسة العمل ومدة الراحة.',
                    'فعّل تنبيهات شرب الماء حسب جدولك اليومي.',
                    'اترك التطبيق يعمل في الخلفية أثناء العمل.',
                ],
                documentation: [
                    { title: 'إعداد الراحة', body: 'يمكن تخصيص مدة العمل والراحة حسب نمطك اليومي وطبيعة استخدامك للشاشة.' },
                    { title: 'تنبيهات الماء', body: 'اضبط التذكير كل فترة زمنية مناسبة للحفاظ على الترطيب أثناء العمل.' },
                    { title: 'التشغيل على المنصات', body: 'يستهدف التطبيق العمل على سطح المكتب والجوال لتوحيد تجربة العناية بالعين.' },
                ],
                downloadNote: 'المنتج مجاني، وسيتم وضع روابط الحزم لكل منصة داخل هذا المسار.',
            },
            en: {
                headline: 'Eye protection with break and water reminders',
                summary: 'YamkEyeCare helps reduce screen fatigue and reminds you to take breaks and drink water during work.',
                description: 'The app is designed for people who spend long hours in front of computers or phones. It provides calm, structured reminders across platforms.',
                highlights: [
                    'Periodic screen break reminders.',
                    'Water reminders during work hours.',
                    'Multi-platform desktop and mobile experience.',
                    'Free and suitable for daily use.',
                ],
                useCases: ['Long office work', 'Studying', 'Programming', 'Screen time management'],
                usageSteps: [
                    'Download the right package for your device.',
                    'Set work session and break duration.',
                    'Enable water reminders based on your daily schedule.',
                    'Keep the app running in the background while working.',
                ],
                documentation: [
                    { title: 'Break setup', body: 'Customize work and break duration based on your daily rhythm.' },
                    { title: 'Water reminders', body: 'Choose a comfortable interval to stay hydrated during work.' },
                    { title: 'Platform support', body: 'The app targets desktop and mobile platforms for a consistent eye-care habit.' },
                ],
                downloadNote: 'The product is free. Packages for each platform will be listed under this path.',
            },
        },
    },
    {
        slug: 'yamktranslator',
        name: 'YamkTranslator',
        shortName: 'مترجم يمك',
        category: 'Translation Platform',
        price: 'Free',
        status: 'Offline + Cloud',
        accent: '#f59e0b',
        website: 'https://yamktranslator.vercel.app/',
        downloadPath: '/downloads/yamktranslator',
        technologies: ['Docker', 'Offline', 'Cloud', 'Web App'],
        content: {
            ar: {
                headline: 'مترجم يمك يعمل أوفلاين أو على السحابة',
                summary: 'YamkTranslator مترجم مرن يمكن تشغيله أوفلاين عبر Docker أو كخدمة سحابية أو كتطبيق ويب حسب احتياجك.',
                description: 'يوفر YamkTranslator خيارًا عمليًا للفرق التي تحتاج ترجمة داخلية بدون الاعتماد الكامل على الخدمات الخارجية، مع إمكانية تشغيله في بيئات محلية أو سحابية.',
                highlights: [
                    'تشغيل أوفلاين عبر Docker.',
                    'قابل للنشر على السحابة أو كتطبيق ويب.',
                    'مناسب للفرق التي تحتاج خصوصية أعلى في الترجمة.',
                    'مجاني وقابل للتخصيص حسب بيئة العمل.',
                ],
                useCases: ['ترجمة داخلية', 'خدمة ترجمة للشركات', 'تشغيل محلي للخصوصية', 'تكامل مع تطبيقات ويب'],
                usageSteps: [
                    'اختر طريقة التشغيل: Docker، Cloud، أو Web App.',
                    'حمّل الحزمة أو صورة Docker من مسار التحميل.',
                    'اضبط اللغات والنموذج أو خدمة الترجمة المطلوبة.',
                    'شغّل الواجهة واستخدمها مباشرة أو اربطها بتطبيقاتك.',
                ],
                documentation: [
                    { title: 'تشغيل Docker', body: 'المسار مخصص لتوثيق أوامر التشغيل وإعدادات البيئة اللازمة للتشغيل المحلي.' },
                    { title: 'النشر السحابي', body: 'يمكن نشر الخدمة على خادم سحابي حسب احتياج الفريق وسعة الاستخدام.' },
                    { title: 'تكامل الويب', body: 'يمكن استخدام التطبيق كواجهة ويب مستقلة أو دمجه كخدمة داخل أنظمة أخرى.' },
                ],
                downloadNote: 'المنتج مجاني، ومسار التحميل سيضم ملفات Docker والتطبيق حسب طريقة النشر.',
            },
            en: {
                headline: 'Yamk translator for offline, cloud, or web deployment',
                summary: 'YamkTranslator is a flexible translator that can run offline through Docker, as a cloud service, or as a web app depending on your needs.',
                description: 'YamkTranslator is useful for teams that need internal translation without relying fully on external services, with deployment options for local and cloud environments.',
                highlights: [
                    'Offline Docker deployment.',
                    'Can be deployed in the cloud or as a web app.',
                    'Suitable for teams that need more private translation workflows.',
                    'Free and customizable for work environments.',
                ],
                useCases: ['Internal translation', 'Company translation service', 'Private local deployment', 'Web app integration'],
                usageSteps: [
                    'Choose Docker, Cloud, or Web App deployment.',
                    'Download the package or Docker image from the download path.',
                    'Configure languages and translation model or service.',
                    'Run the interface directly or integrate it with your apps.',
                ],
                documentation: [
                    { title: 'Docker setup', body: 'The path documents run commands and environment variables for local deployment.' },
                    { title: 'Cloud deployment', body: 'Deploy the service on a cloud server based on your team needs and usage volume.' },
                    { title: 'Web integration', body: 'Use it as a standalone web interface or integrate it as a service into other systems.' },
                ],
                downloadNote: 'The product is free. The download path will include Docker and app packages based on deployment type.',
            },
        },
    },
];

export function getProductBySlug(slug: ProductSlug) {
    return PRODUCTS.find((product) => product.slug === slug);
}
