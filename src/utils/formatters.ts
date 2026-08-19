export const formatCurrency = (value: number | string | null | undefined): string => {
    const num = typeof value === 'string' ? parseFloat(value) : (value ?? 0);
    const safeValue = isNaN(num as number) ? 0 : num;

    return new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: 'SAR',
        minimumFractionDigits: 2,
    }).format(safeValue as number);
};

export const formatNumber = (value: number | string | null | undefined): string => {
    const num = typeof value === 'string' ? parseFloat(value) : (value ?? 0);
    const safeValue = isNaN(num as number) ? 0 : num;
    return new Intl.NumberFormat('ar-SA').format(safeValue as number);
};

export const formatDate = (date: string | Date): string => {
    return new Intl.DateTimeFormat('ar-SA', {
        dateStyle: 'medium',
    }).format(new Date(date));
};

export const formatDateTime = (date: string | Date): string => {
    return new Intl.DateTimeFormat('ar-SA', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(date));
};
