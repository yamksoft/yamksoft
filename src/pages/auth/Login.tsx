import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { toast } from 'react-hot-toast';
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import './Login.css';

const createLoginSchema = (messages: { emailInvalid: string; passwordMin: string }) => z.object({
    email: z.string().email(messages.emailInvalid),
    password: z.string().min(6, messages.passwordMin),
    rememberMe: z.boolean().optional(),
});

type LoginForm = {
    email: string;
    password: string;
    rememberMe?: boolean;
};

export function Login() {
    const { login, isAuthenticated } = useAuth();
    const { t, dir } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const from = location.state?.from?.pathname || '/dashboard';
    const loginSchema = createLoginSchema(t.auth.common);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    const onSubmit = async (data: LoginForm) => {
        try {
            await login(data);
            toast.success(t.auth.login.success);
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            toast.error(t.auth.login.error);
        }
    };

    return (
        <div className={`auth-page ${dir === 'ltr' ? 'auth-ltr' : ''}`} dir={dir}>
            <div className="auth-shell auth-shell-login">
                <aside className="auth-aside" aria-label="YamkSoft">
                    <Link to="/" className="auth-brand">
                        <img src="/images/desktop_icon_256.png" alt="YamkSoft" />
                        <span>{t.auth.common.brand}</span>
                    </Link>
                    <div className="auth-aside-content">
                        <div className="auth-kicker">
                            <Sparkles size={16} />
                            {t.auth.login.kicker}
                        </div>
                        <h1>{t.auth.login.asideTitle}</h1>
                        <p>
                            {t.auth.login.asideDescription}
                        </p>
                        <ul className="auth-benefits">
                            {t.auth.login.benefits.map((benefit) => (
                                <li key={benefit}><ShieldCheck size={18} /> {benefit}</li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <main className="auth-panel">
                    <div className="login-card">
                        <div className="login-header">
                            <span className="auth-eyebrow">{t.auth.login.eyebrow}</span>
                            <h1>{t.auth.login.title}</h1>
                            <p>{t.auth.login.subtitle}</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                            <div className="form-group">
                                <label htmlFor="login-email">{t.auth.login.email}</label>
                                <div className="auth-input-wrap">
                                    <Mail size={18} />
                                    <input
                                        id="login-email"
                                        type="email"
                                        {...register('email')}
                                        placeholder={t.auth.login.emailPlaceholder}
                                        autoComplete="email"
                                        dir="ltr"
                                    />
                                </div>
                                {errors.email && <span className="error">{errors.email.message}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="login-password">{t.auth.login.password}</label>
                                <div className="auth-input-wrap">
                                    <LockKeyhole size={18} />
                                    <input
                                        id="login-password"
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('password')}
                                        placeholder="••••••••"
                                        autoComplete="current-password"
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

                            <div className="auth-form-row auth-form-meta">
                                <label className="checkbox-label">
                                    <input type="checkbox" {...register('rememberMe')} />
                                    <span>{t.auth.login.rememberMe}</span>
                                </label>
                                <Link to="/forgot-password" className="forgot-password">
                                    {t.auth.login.forgotPassword}
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-block auth-submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? t.auth.login.submitting : t.auth.login.submit}
                                <ArrowLeft size={18} />
                            </button>
                        </form>

                        <div className="login-footer">
                            <span>{t.auth.login.noAccount}</span>
                            <Link to="/register">{t.auth.login.createAccount}</Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
