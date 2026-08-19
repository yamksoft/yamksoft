import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import { securityService } from '../../../api/services/security.service';
import { toast } from 'react-hot-toast';
import type { UserDto, CreateUserDto } from '../../../types/security.types';

type ApiError = {
    response?: {
        data?: string | { message?: string };
    };
};

function getApiErrorMessage(error: unknown, fallback: string): string {
    const data = (error as ApiError).response?.data;
    if (typeof data === 'string') return data;
    return data?.message || fallback;
}

interface UserFormProps {
    user?: UserDto;
    onSuccess: () => void;
    onCancel: () => void;
}

export function UserForm({ user, onSuccess, onCancel }: UserFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateUserDto>({
        defaultValues: user ? {
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            isActive: user.isActive
        } : {
            isActive: true,
            role: 'User'
        }
    });

    const { data: roles } = useQuery({
        queryKey: ['roles'],
        queryFn: securityService.getRoles
    });

    const mutation = useMutation({
        mutationFn: (data: CreateUserDto) =>
            user
                ? securityService.updateUser(user.id, data)
                : securityService.createUser(data),
        onSuccess: () => {
            toast.success(user ? 'تم تحديث بيانات المستخدم' : 'تم إضافة المستخدم بنجاح');
            onSuccess();
        },
        onError: (error: unknown) => {
            toast.error(getApiErrorMessage(error, 'فشل حفظ بيانات المستخدم'));
        }
    });

    return (
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="form-container">
            <div className="form-grid">
                <div className="form-group">
                    <label>اسم المستخدم</label>
                    <input
                        {...register('username', { required: 'هذا الحقل مطلوب' })}
                        className="form-input"
                        disabled={!!user}
                    />
                    {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
                </div>

                {!user && (
                    <div className="form-group">
                        <label>كلمة المرور</label>
                        <input
                            type="password"
                            {...register('password', { required: 'كلمة المرور مطلوبة للمستخدمين الجدد' })}
                            className="form-input"
                        />
                        {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                    </div>
                )}

                <div className="form-group">
                    <label>الاسم الكامل</label>
                    <input
                        {...register('fullName', { required: 'هذا الحقل مطلوب' })}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label>البريد الإلكتروني</label>
                    <input type="email" {...register('email')} className="form-input" />
                </div>

                <div className="form-group">
                    <label>رقم الهاتف</label>
                    <input {...register('phone')} className="form-input" />
                </div>

                <div className="form-group">
                    <label>الدور الوظيفي</label>
                    <select {...register('role')} className="form-select">
                        <option value="Admin">مدير نظام</option>
                        <option value="Manager">مشرف منصة</option>
                        <option value="User">مستخدم</option>
                        <option value="Viewer">مشاهد فقط</option>
                        {roles?.filter(r => !['Admin', 'User'].includes(r.name)).map(r => (
                            <option key={r.id} value={r.name}>{r.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="form-actions mt-6">
                <button type="button" onClick={onCancel} className="btn btn-secondary">إلغاء</button>
                <button type="submit" disabled={mutation.isPending} className="btn btn-primary">
                    {mutation.isPending ? 'جاري الحفظ...' : 'حفظ'}
                </button>
            </div>
        </form>
    );
}
