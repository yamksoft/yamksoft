import { useMemo } from 'react';
import { formatNumber } from '../../../utils/formatters';
import './StatCard.css';

interface StatCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    trend?: number;
    variant?: 'default' | 'success' | 'warning' | 'danger';
    format: 'number' | 'percentage';
}

export function StatCard({
    title,
    value,
    icon,
    trend,
    variant = 'default',
    format
}: StatCardProps) {
    const formattedValue = useMemo(() => {
        switch (format) {
            case 'percentage':
                return `${value}%`;
            default:
                return formatNumber(value);
        }
    }, [value, format]);

    return (
        <div className={`stat-card stat-card--${variant}`}>
            <div className="stat-card__icon">
                {icon}
            </div>
            <div className="stat-card__content">
                <span className="stat-card__title">{title}</span>
                <span className="stat-card__value">{formattedValue}</span>
                {trend !== undefined && (
                    <span className={`stat-card__trend ${trend >= 0 ? 'positive' : 'negative'}`}>
                        {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
                    </span>
                )}
            </div>
        </div>
    );
}
