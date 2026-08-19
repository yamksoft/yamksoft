import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MainLayout } from '../components/layout/MainLayout';
import { checkUserPermission } from '../hooks/usePermissions';

interface PrivateRouteProps {
    requiredPermission?: string;
}

export function PrivateRoute({ requiredPermission }: PrivateRouteProps) {
    const { isAuthenticated, isLoading, user } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="loading" style={{ height: '100vh' }}>
                جاري التحميل...
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requiredPermission && !checkUserPermission(user, requiredPermission)) {
        return <div className="page-container"><h1>ليس لديك صلاحية للوصول لهذه الصفحة</h1></div>;
    }

    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
}
