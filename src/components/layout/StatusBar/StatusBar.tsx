import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Clock, Building2, Calendar } from 'lucide-react';
import './StatusBar.css';

export function StatusBar() {
    const { user } = useAuth();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Intl.DateTimeFormat('ar-SA', options).format(date);
    };

    const formatHijriDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            calendar: 'islamic-umalqura'
        };
        return new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', options).format(date);
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    return (
        <footer className="status-bar">
            {/* User section removed as requested */}

            <div className="status-section time-info">
                <div className="status-item">
                    <Clock size={14} />
                    <span>{formatTime(currentTime)}</span>
                </div>
                <span className="divider">|</span>
                <div className="status-item">
                    <Calendar size={14} />
                    <span>{formatDate(currentTime)}</span>
                </div>
                <span className="divider">|</span>
                <div className="status-item">
                    <Calendar size={14} />
                    <span>{formatHijriDate(currentTime)}</span>
                </div>
            </div>

            <div className="status-section system-info">
                <div className="status-item">
                    <Building2 size={14} />
                    <span className="text-truncate">{user?.branchName || 'الفرع الرئيسي'}</span>
                </div>
                <span className="divider">|</span>
                <div className="status-item">
                    <span>السنة الحالية: {currentTime.getFullYear()}</span>
                </div>
                <span className="divider">|</span>
                <div className="status-item">
                    <span>حقوق الطبع والنشر © 2026 YamkSoft. جميع الحقوق محفوظة.</span>
                </div>
            </div>
        </footer>
    );
}
