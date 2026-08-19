import axiosInstance from '../axiosInstance';
import { API_ENDPOINTS } from '../endpoints';
import type {
    GeneralSettingsDto,
    ThemeSettingsDto,
    EmailSettings,
    SmsSettings,
    WhatsAppSettings,
    NotificationTemplateDto,
    NotificationLogDto,
    NotificationSettingsDto,
    AuditLogDto
} from '../../types/settings.types';

export const settingsService = {
    // General
    getGeneral: () => axiosInstance.get<GeneralSettingsDto>(API_ENDPOINTS.SETTINGS.COMPANY).then(res => res.data),
    updateGeneral: (data: GeneralSettingsDto) => axiosInstance.put(API_ENDPOINTS.SETTINGS.COMPANY, data),

    // Theme / Appearance
    getTheme: () => axiosInstance.get<ThemeSettingsDto>(API_ENDPOINTS.SETTINGS.SYSTEM).then(res => res.data),
    updateTheme: (data: ThemeSettingsDto) => axiosInstance.put(API_ENDPOINTS.SETTINGS.SYSTEM, data),

    // Notifications
    getNotificationSettings: () => axiosInstance.get<NotificationSettingsDto>('/api/settings/notifications').then(res => res.data),
    updateNotificationSettings: (data: NotificationSettingsDto) => axiosInstance.put('/api/settings/notifications', data),

    getNotificationLogs: () => axiosInstance.get<NotificationLogDto[]>('/api/auditlogs/notifications').then(res => res.data),

    getNotificationTemplates: () => axiosInstance.get<NotificationTemplateDto[]>('/api/notificationtemplates').then(res => res.data),
    updateTemplate: (id: number, data: Partial<NotificationTemplateDto>) => axiosInstance.put<NotificationTemplateDto>(`/api/notificationtemplates/${id}`, data).then(res => res.data),
    previewTemplate: (id: number, sampleData: Record<string, string>) => axiosInstance.post<{ subject?: string; body: string }>(`/api/notificationtemplates/${id}/preview`, sampleData).then(res => res.data),

    // Channel-specific settings
    getEmail: () => axiosInstance.get<EmailSettings>('/api/settings/email').then(res => res.data),
    getSms: () => axiosInstance.get<SmsSettings>('/api/settings/sms').then(res => res.data),
    getWhatsApp: () => axiosInstance.get<WhatsAppSettings>('/api/settings/whatsapp').then(res => res.data),
    getByKey: (key: string) => axiosInstance.get<string>(`/api/settings/${key}`).then(res => res.data),
    saveByKey: (key: string, value: string) => axiosInstance.put(`/api/settings/${key}`, value, {
        headers: { 'Content-Type': 'application/json' }
    }),

    getAuditLogs: (page: number = 1, pageSize: number = 20) => axiosInstance.get<AuditLogDto[]>('/api/auditlogs', { params: { page, pageSize } }).then(res => res.data),
};
