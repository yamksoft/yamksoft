import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authService } from '../../api/services/auth.service';
import { toast } from 'react-hot-toast';
import './Login.css';

const resetPasswordSchema = z.object({
    email: z.string().email('البريد الإلكتروني غير صالح'),
    newPassword: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
    confirmPassword: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "كلمة المرور غير متطابقة",
    path: ["confirmPassword"],
});

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token') || '';
    const email = searchParams.get('email') || '';

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordForm>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { email },
    });

    const onSubmit = async (data: ResetPasswordForm) => {
        try {
            await authService.resetPassword({ ...data, token });
            toast.success('تم تغيير كلمة المرور بنجاح');
            navigate('/login');
        } catch (error) {
            console.error(error);
            toast.error('فشل تغيير كلمة المرور');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>تعيين كلمة المرور الجديدة</h1>
                    <p>أدخل كلمة المرور الجديدة</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                    <div className="form-group">
                        <label>البريد الإلكتروني</label>
                        <input
                            type="email"
                            {...register('email')}
                            readOnly
                            dir="ltr"
                        />
                    </div>

                    <div className="form-group">
                        <label>كلمة المرور الجديدة</label>
                        <input
                            type="password"
                            {...register('newPassword')}
                            placeholder="••••••••"
                            dir="ltr"
                        />
                        {errors.newPassword && <span className="error">{errors.newPassword.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>تأكيد كلمة المرور</label>
                        <input
                            type="password"
                            {...register('confirmPassword')}
                            placeholder="••••••••"
                            dir="ltr"
                        />
                        {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'جاري الحفظ...' : 'حفظ كلمة المرور'}
                    </button>
                </form>
            </div>
        </div>
    );
}
