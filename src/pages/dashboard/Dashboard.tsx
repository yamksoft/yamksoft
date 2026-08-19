import { useDashboard } from './hooks/useDashboard';
import { StatCard } from './components/StatCard';
import { PageHeader } from '../../components/common/PageHeader/PageHeader';
import { Loading } from '../../components/common/Loading';
import {
    Users,
    AlertCircle,
    Shield,
    Bell,
    LayoutTemplate,
    Activity,
    KeyRound,
    History,
    CheckCircle2
} from 'lucide-react';
import './Dashboard.css';

export function Dashboard() {
    const { stats, isLoading, error } = useDashboard();

    if (isLoading) {
        return <Loading message="جاري تحميل لوحة المعلومات..." />;
    }

    if (error) {
        return (
            <div className="error-container">
                <AlertCircle size={48} />
                <p>حدث خطأ في تحميل البيانات</p>
                <button onClick={() => window.location.reload()}>
                    إعادة المحاولة
                </button>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <PageHeader
                title="لوحة المعلومات"
                subtitle="نظرة تشغيلية عامة على منصة YamkSoft"
            />

            <div className="dashboard-grid-container">
                <div className="main-stats-column">
                    <div className="stats-grid">
                        <StatCard
                            title="إجمالي المستخدمين"
                            value={stats?.totalUsers || 0}
                            icon={<Users size={24} />}
                            format="number"
                        />
                        <StatCard
                            title="المستخدمون النشطون"
                            value={stats?.activeUsers || 0}
                            icon={<CheckCircle2 size={24} />}
                            variant="success"
                            format="number"
                        />
                        <StatCard
                            title="الأدوار"
                            value={stats?.totalRoles || 0}
                            icon={<Shield size={24} />}
                            format="number"
                        />
                        <StatCard
                            title="مجموعات الصلاحيات"
                            value={stats?.totalPermissionGroups || 0}
                            icon={<KeyRound size={24} />}
                            format="number"
                        />
                        <StatCard
                            title="إشعارات غير مقروءة"
                            value={stats?.unreadNotifications || 0}
                            icon={<Bell size={24} />}
                            variant="warning"
                            format="number"
                        />
                        <StatCard
                            title="قوالب الإشعارات"
                            value={stats?.notificationTemplates || 0}
                            icon={<LayoutTemplate size={24} />}
                            format="number"
                        />
                        <StatCard
                            title="أحداث التدقيق اليوم"
                            value={stats?.auditEventsToday || 0}
                            icon={<History size={24} />}
                            format="number"
                        />
                        <StatCard
                            title="حالة النظام"
                            value={stats?.systemHealthPercentage || 0}
                            icon={<Activity size={24} />}
                            variant="success"
                            format="percentage"
                        />
                    </div>

                    <div className="dashboard-info-panel">
                        <div className="dashboard-info-panel__icon">
                            <Activity size={24} />
                        </div>
                        <div>
                            <h3>YamkSoft</h3>
                            <p>
                                هذه الصفحة مخصصة لمتابعة عناصر الإدارة العامة للمنصة وحالة الوصول والإشعارات
                                وسجل التدقيق.
                            </p>
                        </div>
                    </div>

                    <div className="dashboard-shortcuts">
                        <a href="/settings/users">إدارة المستخدمين</a>
                        <a href="/settings/roles">إدارة الأدوار</a>
                        <a href="/settings/permissions">الصلاحيات</a>
                        <a href="/settings/notifications/logs">سجل الإشعارات</a>
                        <a href="/settings/audit-logs">سجل التدقيق</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
