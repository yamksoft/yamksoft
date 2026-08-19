import React, { useState } from 'react';
import {
    Mail, Smartphone, MessageSquare, BellRing,
    Save, Send, Star, Monitor
} from 'lucide-react';
import type { NotificationSettingsDto } from '../../../types/settings.types';

export const NotificationSettingsView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'email' | 'sms' | 'whatsapp' | 'alerts'>('email');
    const [settings, setSettings] = useState<NotificationSettingsDto>({
        emailEnabled: true,
        smsEnabled: false,
        whatsappEnabled: false,
        useSsl: true,
        toastNotificationsEnabled: true,
        notificationStyle: 'YamkSoft',
        maintenanceAlertsEnabled: true,
        alertCheckIntervalMinutes: 15
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setSettings(prev => ({ ...prev, [name]: finalValue }));
    };

    return (
        <div className="page-container animate-fade-in">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-primary/10">
                <div className="p-2 bg-tertiary text-primary rounded-lg">
                    <BellRing className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-primary">إعدادات الإشعارات</h2>
                    <p className="text-sm text-secondary">تكوين قنوات الاتصال وتنبيهات النظام</p>
                </div>
            </div>

            <div className="flex bg-tertiary/20 rounded-2xl border border-primary/5 overflow-hidden min-h-[550px] shadow-sm">
                {/* Navigation Rail (Matching Premium Look) */}
                <aside className="w-20 md:w-56 bg-tertiary/50 border-l border-primary/10 flex flex-col p-2 space-y-1">
                    <button
                        onClick={() => setActiveTab('email')}
                        className={`flex flex-col md:flex-row items-center gap-3 p-4 md:px-5 py-4 rounded-xl transition-all ${activeTab === 'email' ? 'bg-primary text-inverse shadow-md' : 'text-secondary hover:bg-primary/5 hover:text-primary'}`}
                    >
                        <Mail className="w-5 h-5" />
                        <span className="hidden md:block font-black text-sm">SMTP / البريد</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('sms')}
                        className={`flex flex-col md:flex-row items-center gap-3 p-4 md:px-5 py-4 rounded-xl transition-all ${activeTab === 'sms' ? 'bg-primary text-inverse shadow-md' : 'text-secondary hover:bg-primary/5 hover:text-primary'}`}
                    >
                        <Smartphone className="w-5 h-5" />
                        <span className="hidden md:block font-black text-sm">رسائل SMS</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('whatsapp')}
                        className={`flex flex-col md:flex-row items-center gap-3 p-4 md:px-5 py-4 rounded-xl transition-all ${activeTab === 'whatsapp' ? 'bg-primary text-inverse shadow-md' : 'text-secondary hover:bg-primary/5 hover:text-primary'}`}
                    >
                        <MessageSquare className="w-5 h-5" />
                        <span className="hidden md:block font-black text-sm">WhatsApp API</span>
                    </button>
                    <div className="my-2 border-t border-primary/5 mx-2" />
                    <button
                        onClick={() => setActiveTab('alerts')}
                        className={`flex flex-col md:flex-row items-center gap-3 p-4 md:px-5 py-4 rounded-xl transition-all ${activeTab === 'alerts' ? 'bg-primary text-inverse shadow-md' : 'text-secondary hover:bg-primary/5 hover:text-primary'}`}
                    >
                        <BellRing className="w-5 h-5" />
                        <span className="hidden md:block font-black text-sm">تنبيهات النظام</span>
                    </button>
                </aside>

                {/* Tab Content Area */}
                <main className="flex-1 p-8 bg-surface overflow-y-auto">
                    {/* Email Settings */}
                    {activeTab === 'email' && (
                        <div className="space-y-8 animate-slide-up">
                            <div className="flex items-center justify-between p-6 bg-tertiary/30 rounded-2xl border border-primary/5">
                                <div className="space-y-1">
                                    <h3 className="font-black text-lg text-primary">إعدادات البريد الإلكتروني</h3>
                                    <p className="text-xs text-secondary font-bold">تفعيل تواصل SMTP لإرسال رسائل النظام والتقارير</p>
                                </div>
                                <input
                                    type="checkbox"
                                    className="w-12 h-6 rounded-full appearance-none cursor-pointer transition-colors relative bg-secondary before:content-[''] before:absolute before:top-1 before:right-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-transform checked:bg-primary checked:before:-translate-x-6"
                                    name="emailEnabled"
                                    checked={settings.emailEnabled}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all ${settings.emailEnabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                                <div className="form-group">
                                    <label className="form-label font-black mb-2">خادم SMTP (Host)</label>
                                    <input type="text" name="smtpHost" value={settings.smtpHost} onChange={handleChange} className="form-input" placeholder="smtp.example.com" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label font-black mb-2">المنفذ (Port)</label>
                                    <input type="number" name="smtpPort" value={settings.smtpPort} onChange={handleChange} className="form-input text-center font-mono" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label font-black mb-2">اسم المستخدم</label>
                                    <input type="text" name="smtpUsername" value={settings.smtpUsername} onChange={handleChange} className="form-input" dir="ltr" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label font-black mb-2">كلمة المرور</label>
                                    <input type="password" name="smtpPassword" value={settings.smtpPassword} onChange={handleChange} className="form-input" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label font-black mb-2">إيميل المرسل</label>
                                    <input type="email" name="fromAddress" value={settings.fromAddress} onChange={handleChange} className="form-input" dir="ltr" />
                                </div>
                                <div className="flex items-center gap-4 mt-8">
                                    <input type="checkbox" name="useSsl" checked={settings.useSsl} onChange={handleChange} className="w-5 h-5 rounded border-primary/30 text-primary focus:ring-primary" />
                                    <label className="text-sm font-black text-primary cursor-pointer">استخدام تشفير SSL/TLS (موصى به)</label>
                                </div>
                            </div>

                            <button className="btn btn-secondary gap-2 mt-4" disabled={!settings.emailEnabled}>
                                <Send className="w-4 h-4" />
                                إرسال بريد تجريبي
                            </button>
                        </div>
                    )}

                    {/* SMS Settings */}
                    {activeTab === 'sms' && (
                        <div className="space-y-6 animate-slide-up">
                            <div className="flex items-center justify-between p-6 bg-tertiary/30 rounded-2xl border border-primary/5">
                                <h3 className="font-black text-lg text-primary">إعدادات رسائل SMS</h3>
                                <input type="checkbox" className="w-12 h-6 rounded-full appearance-none cursor-pointer transition-colors relative bg-secondary before:content-[''] before:absolute before:top-1 before:right-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-transform checked:bg-primary checked:before:-translate-x-6" name="smsEnabled" checked={settings.smsEnabled} onChange={handleChange} />
                            </div>

                            <div className={`space-y-6 ${settings.smsEnabled ? '' : 'opacity-40 pointer-events-none'}`}>
                                <div className="form-group">
                                    <label className="form-label font-black mb-2">مزود الخدمة</label>
                                    <select name="smsProvider" value={settings.smsProvider} onChange={handleChange} className="form-select font-bold">
                                        <option value="Twilio">Twilio</option>
                                        <option value="Unifonic">Unifonic</option>
                                        <option value="MobilyWS">MobilyWS</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label font-black mb-2">Account SID / API Key</label>
                                    <input type="text" name="twilioAccountSid" value={settings.twilioAccountSid} onChange={handleChange} className="form-input font-mono" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label font-black mb-2">Auth Token / Secret</label>
                                    <input type="password" name="twilioAuthToken" value={settings.twilioAuthToken} onChange={handleChange} className="form-input" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* WhatsApp Settings */}
                    {activeTab === 'whatsapp' && (
                        <div className="space-y-6 animate-slide-up">
                            <div className="flex items-center justify-between p-6 bg-tertiary/30 rounded-2xl border border-primary/5">
                                <h3 className="font-black text-lg text-primary">إعدادات WhatsApp API</h3>
                                <input type="checkbox" className="w-12 h-6 rounded-full appearance-none cursor-pointer transition-colors relative bg-secondary before:content-[''] before:absolute before:top-1 before:right-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-transform checked:bg-primary checked:before:-translate-x-6" name="whatsappEnabled" checked={settings.whatsappEnabled} onChange={handleChange} />
                            </div>

                            <div className={`space-y-6 ${settings.whatsappEnabled ? '' : 'opacity-40 pointer-events-none'}`}>
                                <div className="form-group">
                                    <label className="form-label font-black mb-2">مزود الخدمة</label>
                                    <select name="whatsappProvider" value={settings.whatsappProvider} onChange={handleChange} className="form-select font-bold">
                                        <option value="Meta">Meta Cloud API (Official)</option>
                                        <option value="Twilio">Twilio WhatsApp</option>
                                        <option value="UltraMsg">UltraMsg</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label font-black mb-2">Access Token</label>
                                    <input type="text" name="metaAccessToken" value={settings.metaAccessToken} onChange={handleChange} className="form-input font-mono" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* System Alerts */}
                    {activeTab === 'alerts' && (
                        <div className="space-y-10 animate-slide-up">
                            <section>
                                <h3 className="font-black text-lg text-primary mb-6 border-b border-primary/10 pb-3">التنبيهات المباشرة</h3>
                                <div className="space-y-4">
                                    <label className="flex items-center gap-4 cursor-pointer p-5 bg-tertiary/30 rounded-2xl border border-transparent hover:border-primary/20 transition-all">
                                        <input type="checkbox" name="maintenanceAlertsEnabled" checked={settings.maintenanceAlertsEnabled} onChange={handleChange} className="w-5 h-5 rounded border-primary/30 text-primary" />
                                        <div>
                                            <span className="font-black text-primary block">تنبيهات المنصة والمهام</span>
                                            <span className="text-[11px] text-secondary font-bold">تذكير بالمهام الحرجة وأحداث النظام المهمة</span>
                                        </div>
                                    </label>
                                </div>
                            </section>

                            <section>
                                <h3 className="font-black text-lg text-primary mb-6 border-b border-primary/10 pb-3">نمط إشعارات النظام (Toast)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Style Selection - Premium Look */}
                                    <div
                                        onClick={() => setSettings(p => ({ ...p, notificationStyle: 'YamkSoft' }))}
                                        className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${settings.notificationStyle === 'YamkSoft' ? 'border-primary bg-primary/5 shadow-sm' : 'border-primary/5 hover:border-primary/20 bg-tertiary/20'}`}
                                    >
                                        <div className="p-3 bg-primary/10 text-primary rounded-xl">
                                            <Star className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-black text-sm mb-1">نمط YamkSoft</h4>
                                            <p className="text-[10px] text-secondary font-bold leading-relaxed">تصميم يتماشى مع هوية الشركة وتنبيهات النظام الداخلية</p>
                                        </div>
                                        <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${settings.notificationStyle === 'YamkSoft' ? 'border-primary bg-primary' : 'border-tertiary'}`}>
                                            {settings.notificationStyle === 'YamkSoft' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => setSettings(p => ({ ...p, notificationStyle: 'Windows' }))}
                                        className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${settings.notificationStyle === 'Windows' ? 'border-primary bg-primary/5 shadow-sm' : 'border-primary/5 hover:border-primary/20 bg-tertiary/20'}`}
                                    >
                                        <div className="p-3 bg-secondary text-primary rounded-xl">
                                            <Monitor className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-black text-sm mb-1">نمط الويندوز</h4>
                                            <p className="text-[10px] text-secondary font-bold leading-relaxed">استخدام إشعارات متصفح النظام القياسية بالنمط البسيط</p>
                                        </div>
                                        <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${settings.notificationStyle === 'Windows' ? 'border-primary bg-primary' : 'border-tertiary'}`}>
                                            {settings.notificationStyle === 'Windows' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}
                </main>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-primary/10">
                <button className="btn btn-secondary px-8">إلغاء</button>
                <button className="btn btn-primary px-10 gap-2">
                    <Save className="w-4 h-4" />
                    حفظ جميع الإعدادات
                </button>
            </div>
        </div>
    );
};
