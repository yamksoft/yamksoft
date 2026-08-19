import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { authService } from '../../api/services/auth.service';
import { CheckCircle, XCircle, Loader, Mail, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import './Login.css';

type ApiError = {
    response?: {
        data?: { message?: string };
    };
};

export function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const email = searchParams.get('email') || '';

    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [status, setStatus] = useState<'input' | 'loading' | 'success' | 'error'>('input');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Cooldown timer for resend button
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    // Focus first input on mount
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleInputChange = (index: number, value: string) => {
        // Only allow numbers
        if (value && !/^\d$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Handle backspace - move to previous input
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (pastedData.length === 6) {
            const newCode = pastedData.split('');
            setCode(newCode);
            inputRefs.current[5]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const fullCode = code.join('');

        if (fullCode.length !== 6) {
            toast.error('يرجى إدخال كود التفعيل كاملاً');
            return;
        }

        setIsSubmitting(true);
        setStatus('loading');

        try {
            await authService.verifyEmail({ email, code: fullCode });
            setStatus('success');
            setMessage('تم تفعيل حسابك بنجاح! يمكنك الآن تسجيل الدخول.');
            toast.success('تم تفعيل الحساب بنجاح');

            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error: unknown) {
            console.error(error);
            setStatus('error');
            const message = (error as ApiError).response?.data?.message;
            setMessage(message || 'فشل التفعيل. يرجى التحقق من الكود.');
            toast.error(message || 'كود التفعيل غير صحيح');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResend = async () => {
        if (resendCooldown > 0) return;

        try {
            await authService.resendVerification(email);
            toast.success('تم إرسال كود جديد إلى بريدك الإلكتروني');
            setResendCooldown(60); // 60 seconds cooldown
            setCode(['', '', '', '', '', '']);
            setStatus('input');
            inputRefs.current[0]?.focus();
        } catch (error: unknown) {
            toast.error((error as ApiError).response?.data?.message || 'فشل إعادة إرسال الكود');
        }
    };

    if (!email) {
        return (
            <div className="login-container">
                <div className="login-card">
                    <XCircle size={64} style={{ color: 'var(--color-error)', margin: '0 auto 20px' }} />
                    <h2 style={{ textAlign: 'center', color: 'var(--color-error)' }}>رابط غير صالح</h2>
                    <p style={{ textAlign: 'center', margin: '20px 0' }}>
                        الرابط غير صالح أو منتهي الصلاحية.
                    </p>
                    <Link to="/register" className="btn btn-primary btn-block">
                        العودة للتسجيل
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="login-container">
            <div className="login-card">
                {status === 'success' ? (
                    <>
                        <CheckCircle size={64} style={{ color: 'var(--color-success)', margin: '0 auto 20px', display: 'block' }} />
                        <h2 style={{ textAlign: 'center', color: 'var(--color-success)' }}>تم التفعيل بنجاح!</h2>
                        <p style={{ textAlign: 'center', margin: '20px 0' }}>{message}</p>
                        <Link to="/login" className="btn btn-primary btn-block">
                            تسجيل الدخول الآن
                        </Link>
                    </>
                ) : (
                    <>
                        <div className="login-header">
                            <Mail size={48} style={{ color: 'var(--brand-primary)', margin: '0 auto 15px', display: 'block' }} />
                            <h1>التحقق من البريد الإلكتروني</h1>
                            <p>أدخل كود التفعيل المرسل إلى</p>
                            <p style={{ color: 'var(--brand-primary)', fontWeight: 'bold', direction: 'ltr' }}>{email}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="otp-container" style={{
                                display: 'flex',
                                gap: '10px',
                                justifyContent: 'center',
                                marginBottom: '20px',
                                direction: 'ltr'
                            }}>
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={el => { inputRefs.current[index] = el; }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={handlePaste}
                                        disabled={isSubmitting}
                                        style={{
                                            width: '50px',
                                            height: '60px',
                                            textAlign: 'center',
                                            fontSize: '24px',
                                            fontWeight: 'bold',
                                            border: '2px solid var(--input-border)',
                                            borderRadius: 'var(--radius-md)',
                                            backgroundColor: 'var(--input-bg)',
                                            color: 'var(--text-primary)',
                                            transition: 'border-color 0.2s, box-shadow 0.2s'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = 'var(--brand-primary)';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'var(--input-border)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                ))}
                            </div>

                            {status === 'error' && (
                                <p style={{ color: 'var(--color-error)', textAlign: 'center', marginBottom: '15px' }}>
                                    {message}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                                disabled={isSubmitting || code.some(d => !d)}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader className="animate-spin" size={20} style={{ marginLeft: '8px' }} />
                                        جاري التحقق...
                                    </>
                                ) : (
                                    'تفعيل الحساب'
                                )}
                            </button>
                        </form>

                        <div className="login-footer" style={{ marginTop: '20px' }}>
                            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                                لم يصلك الكود؟
                            </p>
                            <button
                                onClick={handleResend}
                                disabled={resendCooldown > 0}
                                className="btn btn-outline btn-block"
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                            >
                                <RefreshCw size={18} />
                                {resendCooldown > 0
                                    ? `إعادة الإرسال بعد ${resendCooldown} ثانية`
                                    : 'إعادة إرسال الكود'
                                }
                            </button>

                            <div style={{ textAlign: 'center', marginTop: '15px' }}>
                                <Link to="/login" className="forgot-password">
                                    العودة لتسجيل الدخول
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
