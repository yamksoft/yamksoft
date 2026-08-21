# YamkSoft
واجهة YamkSoft لإدارة منصة الشركة الأم، مبنية باستخدام React وTypeScript لضمان السرعة وتجربة مستخدم مستقرة.

## التقنيات المستخدمة

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## هيكلية المشروع

```bash
src/
├── api/            # التعامل مع الـ API (Axios instance, services)
├── components/     # مكونات واجهة المستخدم (Buttons, Inputs, Cards...)
│   └── ui/         #    المكونات الأساسية القابلة لإعادة الاستخدام
├── context/        # سياق التطبيق (AuthContext, ThemeContext...)
├── hooks/          # Custom Hooks
├── layouts/        # تخطيط الصفحات (MainLayout, AuthLayout...)
├── lib/            # دوال مساعدة وأدوات (Utils, Helpers)
├── pages/          # صفحات التطبيق
│   ├── auth/       #    صفحات المصادقة (Login, Register, VerifyEmail...)
│   ├── dashboard/  #    لوحة التحكم
│   └── ...
├── routes/         # تعريف المسارات (AppRoutes, ProtectedRoute...)
└── types/          # تعريفات الأنواع (Interfaces, Types)
```
npm install && npm run build && npm run dev
---

## التشغيل

### المتطلبات
- **Node.js**: إصدار 18 أو أحدث.
- **Backend**: يجب تشغيل الـ API ليعمل التطبيق بشكل كامل (أو تعديل `.env` للربط بسيرفر خارجي).

### التثبيت
```bash
# تثبيت المكتبات
npm install
```

### التشغيل (وضع التطوير)
```bash
npm run dev
```
سيعمل التطبيق عادةً على الرابط: `http://localhost:5173`

### ⚙️ إعداد متغيرات البيئة (Local Dev)

لربط الفرونت بالباك اند في وضع التطوير المحلي بدون Docker:

```env
VITE_API_URL=http://localhost:57624
```

> إذا كان تشغيل الباك على HTTPS استخدم: `https://localhost:57623`

### بناء النسخة النهائية (Production Build)
```bash
npm run build
```
سيتم إنشاء الملفات الجاهزة للنشر في مجلد `dist/`.

---

## المصادقة (Authentication)
يعتمد النظام على **JWT Authentication**. يتم تخزين الـ Access Token والبيانات الأساسية للمستخدم في حالة التطبيق (State) ويتم تحديثها تلقائياً باستخدام Refresh Token.

- **التسجيل**: يتطلب تفعيل البريد الإلكتروني.
- **الدخول**: يتم التحقق من التفعيل قبل السماح بالدخول.

---

## Docker Support

يمكن تشغيل التطبيق داخل حاوية Docker بسهولة:

### وضع التطوير:
يتم تحديده في `docker-compose.yml` الرئيسي للمشروع، ويعتمد على `npm run dev`.

### وضع الإنتاج:
يستخدم `Dockerfile.frontend` الذي يقوم بالبناء (`npm run build`) ثم يضع الملفات في خادم **Nginx** خفيف وسريع.

```bash
# بناء وتشغيل حاوية الإنتاج بشكل منفصل (للتجربة)
docker build -t yamksoft-frontend -f ../docker/Dockerfile.frontend .
docker run -p 80:80 yamksoft-frontend
```

https://www.yamksoft.com/