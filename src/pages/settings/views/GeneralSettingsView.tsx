/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import {
    Building2, MapPin, Phone, Globe,
    Save, Search
} from 'lucide-react';
import type { GeneralSettingsDto } from '../../../types/settings.types';

interface GeneralSettingsViewProps {
    data?: GeneralSettingsDto;
    onSave?: (settings: GeneralSettingsDto) => void;
}

export const GeneralSettingsView: React.FC<GeneralSettingsViewProps> = ({ data, onSave }) => {
    const [formData, setFormData] = useState<GeneralSettingsDto>({
        companyNameAr: '',
        companyNameEn: '',
        companyAddressAr: '',
        companyAddressEn: '',
        companyPhone: '',
        companyMobile: '',
        companyFax: '',
        companyEmail: '',
        website: '',
        commercialRegister: '',
        companyLogo: '',
        companyLogoPath: '',
        language: 'ar-SA',
        calendarType: 'Gregorian'
    });

    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (onSave) {
            onSave(formData);
        }
    };

    return (
        <div className="view-container animate-fade-in">
            {/* Header Section */}
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <Building2 className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-foreground">معلومات الشركة | Company Information</h2>
                    <p className="text-sm text-muted-foreground">إدارة البيانات الأساسية والهوية البصرية للمنشأة</p>
                </div>
            </div>

            <div className="space-y-10">
                {/* 1. Basic Info Section */}
                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-group">
                            <label className="form-label">اسم الشركة (عربي) *</label>
                            <input
                                type="text"
                                name="companyNameAr"
                                value={formData.companyNameAr}
                                onChange={handleChange}
                                placeholder="أدخل اسم الشركة بالعربية"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Company Name (English)</label>
                            <input
                                type="text"
                                name="companyNameEn"
                                value={formData.companyNameEn}
                                onChange={handleChange}
                                placeholder="Enter company name in English"
                                dir="ltr"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">السجل التجاري | Commercial Register</label>
                            <input
                                type="text"
                                name="commercialRegister"
                                value={formData.commercialRegister}
                                onChange={handleChange}
                                placeholder="أدخل رقم السجل التجاري"
                            />
                        </div>

                        <div className="form-group md:col-span-2">
                            <label className="form-label">شعار الشركة | Company Logo</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="companyLogoPath"
                                    value={formData.companyLogoPath}
                                    readOnly
                                    placeholder="مسار الشعار المختار"
                                    className="cursor-not-allowed"
                                />
                                <button className="btn btn-secondary">
                                    <Search className="w-4 h-4" />
                                    استعراض
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Address Section */}
                <section>
                    <div className="flex items-center gap-2 mb-4 text-primary">
                        <MapPin className="w-5 h-5" />
                        <h3 className="font-bold text-lg">العناوين | Addresses</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-group">
                            <label className="form-label">العنوان التفصيلي (عربي)</label>
                            <textarea
                                name="companyAddressAr"
                                value={formData.companyAddressAr}
                                onChange={handleChange}
                                className="h-24"
                                placeholder="أدخل العنوان التفصيلي بالعربية"
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Detailed Address (English)</label>
                            <textarea
                                name="companyAddressEn"
                                value={formData.companyAddressEn}
                                onChange={handleChange}
                                className="h-24 text-left"
                                dir="ltr"
                                placeholder="Enter detailed address in English"
                            ></textarea>
                        </div>
                    </div>
                </section>

                {/* 3. Contact Section */}
                <section>
                    <div className="flex items-center gap-2 mb-4 text-primary">
                        <Phone className="w-5 h-5" />
                        <h3 className="font-bold text-lg">أرقام الاتصال | Contact Numbers</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="form-group">
                            <label className="form-label">هاتف الشركة</label>
                            <input
                                type="text"
                                name="companyPhone"
                                value={formData.companyPhone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">الجوال</label>
                            <input
                                type="text"
                                name="companyMobile"
                                value={formData.companyMobile}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">الفاكس</label>
                            <input
                                type="text"
                                name="companyFax"
                                value={formData.companyFax}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </section>

                {/* 4. Connectivity Section */}
                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-group">
                            <label className="form-label">البريد الإلكتروني</label>
                            <input
                                type="email"
                                name="companyEmail"
                                value={formData.companyEmail}
                                onChange={handleChange}
                                className="text-left"
                                dir="ltr"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">الموقع الإلكتروني</label>
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                className="text-left"
                                dir="ltr"
                            />
                        </div>
                    </div>
                </section>

                {/* 5. Regional Section */}
                <section className="card p-6">
                    <div className="flex items-center gap-2 mb-6 text-primary">
                        <Globe className="w-5 h-5" />
                        <h3 className="font-bold text-lg">الإعدادات الإقليمية</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-group">
                            <label className="form-label">لغة التطبيق</label>
                            <select
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                            >
                                <option value="ar-SA">العربية (Arabic)</option>
                                <option value="en-US">الإنجليزية (English)</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">نوع التقويم</label>
                            <select
                                name="calendarType"
                                value={formData.calendarType}
                                onChange={handleChange}
                                className="font-semibold"
                            >
                                <option value="Gregorian">ميلادي (Gregorian)</option>
                                <option value="Hijri">هجري (Hijri)</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t border-border">
                    <button type="button" className="btn btn-secondary px-8">إلغاء</button>
                    <button
                        onClick={handleSave}
                        className="btn btn-primary px-10 gap-2 shadow-lg shadow-primary/20"
                    >
                        <Save className="w-4 h-4" />
                        حفظ التغييرات
                    </button>
                </div>
            </div>
        </div>
    );
};
