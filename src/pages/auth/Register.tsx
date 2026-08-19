import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { toast } from 'react-hot-toast';
import {
    ArrowLeft,
    BriefcaseBusiness,
    Building2,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    Phone,
    ShieldCheck,
    Sparkles,
    User,
    Users,
} from 'lucide-react';
import './Login.css';

const createRegisterSchema = (messages: {
    nameRequired: string;
    emailInvalid: string;
    phoneInvalid: string;
    passwordMin: string;
    passwordsMismatch: string;
    termsRequired: string;
}) => z.object({
    fullName: z.string().trim().min(3, messages.nameRequired),
    email: z.string().email(messages.emailInvalid),
    phone: z.string().trim().min(7, messages.phoneInvalid).optional().or(z.literal('')),
    password: z.string().min(6, messages.passwordMin),
    confirmPassword: z.string().min(6, messages.passwordMin),
    companyName: z.string().trim().optional(),
    jobTitle: z.string().trim().optional(),
    businessType: z.string().trim().optional(),
    teamSize: z.string().optional(),
    agreeToTerms: z.boolean().refine((value) => value, messages.termsRequired),
}).refine((data) => data.password === data.confirmPassword, {
    message: messages.passwordsMismatch,
    path: ["confirmPassword"],
});

type RegisterForm = {
    fullName: string;
    email: string;
    phone?: string;
    password: string;
    confirmPassword: string;
    companyName?: string;
    jobTitle?: string;
    businessType?: string;
    teamSize?: string;
    agreeToTerms: boolean;
};

type ApiError = {
    response?: {
        data?: { message?: string };
    };
};

export function Register() {
    const { register: registerUser } = useAuth();
    const { t, dir } = useLanguage();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const registerSchema = createRegisterSchema(t.auth.common);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            teamSize: '',
            agreeToTerms: false,
        },
    });

    const onSubmit = async (data: RegisterForm) => {
        try {
            await registerUser({
                fullName: data.fullName,
                email: data.email,
                password: data.password,
                phone: data.phone || undefined,
                companyName: data.companyName || undefined,
            });
            toast.success(t.auth.register.success);
            toast(t.auth.register.verificationSent, { duration: 6000 });
            // Navigate to verify-email page with email parameter
            navigate(`/verify-email?email=${encodeURIComponent(data.email)}`);
        } catch (error: unknown) {
            console.error(error);
            toast.error((error as ApiError).response?.data?.message || t.auth.register.error);
        }
    };

    return (
        <div className={`auth-page ${dir === 'ltr' ? 'auth-ltr' : ''}`} dir={dir}>
            <div className="auth-shell auth-shell-register">
                <aside className="auth-aside" aria-label="YamkSoft">
                    <Link to="/" className="auth-brand">
                        <img src="/images/desktop_icon_256.png" alt="YamkSoft" />
                        <span>{t.auth.common.brand}</span>
                    </Link>
                    <div className="auth-aside-content">
                        <div className="auth-kicker">
                            <Sparkles size={16} />
                            {t.auth.register.kicker}
                        </div>
                        <h1>{t.auth.register.asideTitle}</h1>
                        <p>
                            {t.auth.register.asideDescription}
                        </p>
                        <ul className="auth-benefits">
                            {t.auth.register.benefits.map((benefit) => (
                                <li key={benefit}><ShieldCheck size={18} /> {benefit}</li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <main className="auth-panel">
                    <div className="login-card register-card">
                        <div className="login-header">
                            <span className="auth-eyebrow">{t.auth.register.eyebrow}</span>
                            <h1>{t.auth.register.title}</h1>
                            <p>{t.auth.register.subtitle}</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                            <div className="auth-form-grid">
                                <div className="form-group">
                                    <label htmlFor="register-full-name">{t.auth.register.fullName}</label>
                                    <div className="auth-input-wrap">
                                        <User size={18} />
                                        <input
                                            id="register-full-name"
                                            type="text"
                                            {...register('fullName')}
                                            placeholder={t.auth.register.fullNamePlaceholder}
                                            autoComplete="name"
                                        />
                                    </div>
                                    {errors.fullName && <span className="error">{errors.fullName.message}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="register-email">{t.auth.register.email}</label>
                                    <div className="auth-input-wrap">
                                        <Mail size={18} />
                                        <input
                                            id="register-email"
                                            type="email"
                                            {...register('email')}
                                            placeholder={t.auth.register.emailPlaceholder}
                                            autoComplete="email"
                                            dir="ltr"
                                        />
                                    </div>
                                    {errors.email && <span className="error">{errors.email.message}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="register-phone">{t.auth.register.phone}</label>
                                    <div className="auth-input-wrap">
                                        <Phone size={18} />
                                        <input
                                            id="register-phone"
                                            type="tel"
                                            {...register('phone')}
                                            placeholder={t.auth.register.phonePlaceholder}
                                            autoComplete="tel"
                                            dir="ltr"
                                        />
                                    </div>
                                    {errors.phone && <span className="error">{errors.phone.message}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="register-company">{t.auth.register.companyName}</label>
                                    <div className="auth-input-wrap">
                                        <Building2 size={18} />
                                        <input
                                            id="register-company"
                                            type="text"
                                            {...register('companyName')}
                                            placeholder={t.auth.register.companyPlaceholder}
                                            autoComplete="organization"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="register-job-title">{t.auth.register.jobTitle}</label>
                                    <div className="auth-input-wrap">
                                        <BriefcaseBusiness size={18} />
                                        <input
                                            id="register-job-title"
                                            type="text"
                                            {...register('jobTitle')}
                                            placeholder={t.auth.register.jobTitlePlaceholder}
                                            autoComplete="organization-title"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="register-business-type">{t.auth.register.businessType}</label>
                                    <div className="auth-input-wrap">
                                        <BriefcaseBusiness size={18} />
                                        <select id="register-business-type" {...register('businessType')}>
                                            <option value="">{t.auth.register.businessTypePlaceholder}</option>
                                            {t.auth.register.businessTypes.map((label, index) => (
                                                <option key={label} value={['retail', 'services', 'manufacturing', 'technology', 'other'][index]}>
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="register-team-size">{t.auth.register.teamSize}</label>
                                    <div className="auth-input-wrap">
                                        <Users size={18} />
                                        <select id="register-team-size" {...register('teamSize')}>
                                            <option value="">{t.auth.register.teamSizePlaceholder}</option>
                                            {t.auth.register.teamSizes.map((label, index) => (
                                                <option key={label} value={['1-5', '6-20', '21-50', '51+'][index]}>
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="register-password">{t.auth.register.password}</label>
                                    <div className="auth-input-wrap">
                                        <LockKeyhole size={18} />
                                        <input
                                            id="register-password"
                                            type={showPassword ? 'text' : 'password'}
                                            {...register('password')}
                                            placeholder="••••••••"
                                            autoComplete="new-password"
                                            dir="ltr"
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={() => setShowPassword((value) => !value)}
                                            aria-label={showPassword ? t.auth.common.hidePassword : t.auth.common.showPassword}
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    {errors.password && <span className="error">{errors.password.message}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="register-confirm-password">{t.auth.register.confirmPassword}</label>
                                    <div className="auth-input-wrap">
                                        <LockKeyhole size={18} />
                                        <input
                                            id="register-confirm-password"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            {...register('confirmPassword')}
                                            placeholder="••••••••"
                                            autoComplete="new-password"
                                            dir="ltr"
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={() => setShowConfirmPassword((value) => !value)}
                                            aria-label={showConfirmPassword ? t.auth.common.hidePassword : t.auth.common.showPassword}
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="checkbox-label auth-terms">
                                    <input type="checkbox" {...register('agreeToTerms')} />
                                    <span>{t.auth.register.agreeToTerms}</span>
                                </label>
                                {errors.agreeToTerms && <span className="error">{errors.agreeToTerms.message}</span>}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-block auth-submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? t.auth.register.submitting : t.auth.register.submit}
                                <ArrowLeft size={18} />
                            </button>
                        </form>

                        <div className="login-footer">
                            <span>{t.auth.register.hasAccount}</span>
                            <Link to="/login">{t.auth.register.login}</Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
