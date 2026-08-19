export interface GeneralSettingsDto {
    companyNameAr: string;
    companyNameEn: string;
    companyAddressAr: string;
    companyAddressEn: string;
    companyPhone: string;
    companyMobile: string;
    companyFax: string;
    companyEmail: string;
    website: string;
    commercialRegister: string;
    companyLogo: string;
    companyLogoPath: string;
    language: string;
    calendarType: string;
}

export interface ThemeSettingsDto {
    theme: 'Light' | 'Dark';
    primaryColor: string;
    secondaryColor: string;
    navigationStyle: 'Ribbon' | 'Sidebar';
    backgroundImagePath?: string;
    hasBackgroundImage: boolean;
}

export interface EmailSettings {
    isEnabled: boolean;
    smtpHost: string;
    smtpPort: number;
    useSsl: boolean;
    username: string;
    password?: string;
    fromAddress: string;
    fromName: string;
}

export interface SmsSettings {
    isEnabled: boolean;
    defaultProvider: string;
    twilio?: {
        accountSid: string;
        authToken: string;
        fromNumber: string;
    };
    unifonic?: {
        appSid: string;
        senderId: string;
    };
}

export interface WhatsAppSettings {
    isEnabled: boolean;
    defaultProvider: string;
    metaCloud?: {
        accessToken: string;
        phoneNumberId: string;
        wabaId?: string;
        apiVersion?: string;
    };
    twilio?: {
        fromNumber: string;
        useSharedCredentials: boolean;
    };
}

export interface NotificationTemplateDto {
    id: number;
    templateKey: string;
    channel: 'Email' | 'Sms' | 'WhatsApp';
    language: string;
    subject?: string;
    bodyTemplate: string;
    isActive: boolean;
}

export interface NotificationLogDto {
    id: number;
    recipientType: string;
    recipientAddress: string;
    channel: string;
    subject?: string;
    body: string;
    status: string;
    sentAt: string;
    readAt?: string;
    lastError?: string;
}

export interface NotificationSettingsDto {
    emailEnabled: boolean;
    smsEnabled: boolean;
    whatsappEnabled: boolean;

    // SMTP
    smtpHost?: string;
    smtpPort?: number;
    smtpUsername?: string;
    smtpPassword?: string;
    fromAddress?: string;
    fromName?: string;
    useSsl: boolean;

    // SMS
    smsProvider?: string;
    twilioAccountSid?: string;
    twilioAuthToken?: string;
    twilioFromNumber?: string;

    // WhatsApp
    whatsappProvider?: string;
    metaAccessToken?: string;
    metaPhoneNumberId?: string;
    whatsappNumber?: string;

    // Toast & alerts
    toastNotificationsEnabled: boolean;
    notificationStyle: 'YamkSoft' | 'Windows';
    maintenanceAlertsEnabled: boolean;
    alertCheckIntervalMinutes: number;
}

export interface AuditLogDto {
    id: number;
    changedAt: string;
    changedByName: string;
    tableName: string;
    recordId: string;
    actionAr: string;
    actionEn: string;
    oldValues: string;
    newValues: string;
}

export interface BackupSettingsDto {
    localBackupPath: string;
    isGoogleDriveLinked: boolean;
    isScheduleEnabled: boolean;
    backupTime: string;
    isCloudBackupEnabled: boolean;
    nextBackupTimeDisplay?: string;
}

export interface SystemUpdateDto {
    currentVersion: string;
    newVersion: string;
    releaseNotes: string;
    isUpdateAvailable: boolean;
    isUpdateReady: boolean;
    fileSize?: string;
}

export interface DatabaseHealthDto {
    isOnline: boolean;
    serverName: string;
    databaseName: string;
    storageUsed: string;
    storageLimit: string;
    lastBackupAt?: string;
}

export interface PermissionDto {
    key: string;
    displayName: string;
    module: string;
    description: string;
    isSelected: boolean;
}

export interface PermissionGroupDto {
    key: string;
    displayName: string;
    permissions: PermissionDto[];
}
