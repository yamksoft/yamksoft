import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { LandingPage } from '../pages/landing/LandingPage';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { ForgotPassword } from '../pages/auth/ForgotPassword';
import { ResetPassword } from '../pages/auth/ResetPassword';
import { VerifyEmail } from '../pages/auth/VerifyEmail';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { UserList } from '../pages/settings/users/UserList';
import { RoleManagement } from '../pages/settings/users/RoleManagement';
import { AuditLogList } from '../pages/settings/security/AuditLogList';
import { GeneralSettingsView } from '../pages/settings/views/GeneralSettingsView';
import { NotificationSettingsView } from '../pages/settings/views/NotificationSettingsView';
import { NotificationLogView } from '../pages/settings/views/NotificationLogView';
import { TemplateManagementView } from '../pages/settings/views/TemplateManagementView';
import { PermissionsView } from '../pages/settings/views/PermissionsView';
import { QaydYamkPage } from '../pages/products/qaydyamk/QaydYamkPage';
import { YamkCoderPage } from '../pages/products/yamkcoder/YamkCoderPage';
import { YamkEyeCarePage } from '../pages/products/yamkeyecare/YamkEyeCarePage';
import { YamkTranslatorPage } from '../pages/products/yamktranslator/YamkTranslatorPage';

export function AppRoutes() {
    return (
        <Routes>
            {/* الصفحة الرئيسية العامة */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/products/qaydyamk" element={<QaydYamkPage />} />
            <Route path="/products/yamkcoder" element={<YamkCoderPage />} />
            <Route path="/products/yamkeyecare" element={<YamkEyeCarePage />} />
            <Route path="/products/yamktranslator" element={<YamkTranslatorPage />} />

            {/* المسارات العامة (تسجيل الدخول، كلمة المرور) */}
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
            </Route>

            {/* المسارات المحمية (النظام) */}
            <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/settings/general" element={<GeneralSettingsView />} />
                <Route path="/settings/roles" element={<RoleManagement />} />
                <Route path="/settings/users" element={<UserList />} />
                <Route path="/settings/permissions" element={<PermissionsView />} />
                <Route path="/settings/notifications/logs" element={<NotificationLogView />} />
                <Route path="/settings/notifications/templates" element={<TemplateManagementView />} />
                <Route path="/settings/notifications/settings" element={<NotificationSettingsView />} />
                <Route path="/settings/audit-logs" element={<AuditLogList />} />
                <Route path="/settings" element={<Navigate to="/settings/general" replace />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
