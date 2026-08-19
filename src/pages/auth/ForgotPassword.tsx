import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authService } from '../../api/services/auth.service';
import { toast } from 'react-hot-toast';
import './Login.css'; // Reusing login styles

const forgotPasswordSchema = z.object({
    email: z.string().email('البريد الإلكتروني غير صالح'),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export function ForgotPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordForm>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordForm) => {
        try {
            await authService.forgotPassword(data);
            toast.success('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');
        } catch (error) {
            console.error(error);
            toast.error('حدث خطأ أثناء إرسال الطلب');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>استعادة كلمة المرور</h1>
                    <p>أدخل بريدك الإلكتروني لاستلام رابط إعادة التعيين</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                    <div className="form-group">
                        <label>البريد الإلكتروني</label>
                        <input
                            type="email"
                            {...register('email')}
                            placeholder="example@company.com"
                            dir="ltr"
                        />
                        {errors.email && <span className="error">{errors.email.message}</span>}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرابط'}
                    </button>
                </form>

                <div className="login-footer">
                    <Link to="/login" className="forgot-password">
                        العودة لتسجيل الدخول
                    </Link>
                </div>
            </div>
        </div>
    );
}
