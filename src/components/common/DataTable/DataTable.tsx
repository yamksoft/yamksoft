import { type ReactNode } from 'react';
import { Loading } from '../Loading';
import './DataTable.css';

export interface Column<T> {
    key: keyof T | string;
    header: string;
    width?: number;
    format?: 'text' | 'currency' | 'number' | 'date' | 'boolean';
    render?: (value: unknown, row: T) => ReactNode;
}

interface PaginationProps {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    isLoading?: boolean;
    selectedRow?: T | null;
    onRowSelect?: (row: T) => void;
    onRowDoubleClick?: (row: T) => void;
    pagination?: PaginationProps;
    emptyMessage?: string;
    rowKey?: keyof T;
}

function formatValue(value: unknown, format?: string): string {
    if (value === null || value === undefined) return '-';

    switch (format) {
        case 'currency':
            return new Intl.NumberFormat('ar-SA', {
                style: 'currency',
                currency: 'SAR',
            }).format(Number(value));
        case 'number':
            return new Intl.NumberFormat('ar-SA').format(Number(value));
        case 'date':
            return new Date(value as string).toLocaleDateString('ar-SA');
        case 'boolean':
            return value ? 'نعم' : 'لا';
        default:
            return String(value);
    }
}

function getNestedValue<T>(obj: T, path: string): unknown {
    return path.split('.').reduce((acc: unknown, part) => {
        if (acc && typeof acc === 'object' && part in acc) {
            return (acc as Record<string, unknown>)[part];
        }
        return undefined;
    }, obj);
}

export function DataTable<T extends { id?: number | string }>({
    columns,
    data,
    isLoading = false,
    selectedRow,
    onRowSelect,
    onRowDoubleClick,
    pagination,
    emptyMessage = 'لا توجد بيانات',
    rowKey = 'id' as keyof T,
}: DataTableProps<T>) {
    const totalPages = pagination
        ? Math.ceil(pagination.total / pagination.pageSize)
        : 0;

    return (
        <div className="data-table-container">
            <div className="data-table-wrapper">
                <table className="data-table">
                    <thead>
                        <tr>
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    style={col.width ? { width: col.width } : undefined}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={columns.length}>
                                    <Loading message="جاري تحميل البيانات..." />
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="empty-message">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((row) => {
                                const key = row[rowKey] as string | number;
                                const isSelected = selectedRow && selectedRow[rowKey] === row[rowKey];

                                return (
                                    <tr
                                        key={key}
                                        className={isSelected ? 'selected' : ''}
                                        onClick={() => onRowSelect?.(row)}
                                        onDoubleClick={() => onRowDoubleClick?.(row)}
                                    >
                                        {columns.map((col, colIndex) => {
                                            const value = getNestedValue(row, col.key as string);
                                            return (
                                                <td key={colIndex}>
                                                    {col.render
                                                        ? col.render(value, row)
                                                        : formatValue(value, col.format)
                                                    }
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {pagination && totalPages > 1 && (
                <div className="data-table-pagination">
                    <span className="pagination-info">
                        عرض {((pagination.page - 1) * pagination.pageSize) + 1} - {Math.min(pagination.page * pagination.pageSize, pagination.total)} من {pagination.total}
                    </span>
                    <div className="pagination-controls">
                        <button
                            onClick={() => pagination.onPageChange(1)}
                            disabled={pagination.page === 1}
                            className="pagination-btn"
                        >
                            الأولى
                        </button>
                        <button
                            onClick={() => pagination.onPageChange(pagination.page - 1)}
                            disabled={pagination.page === 1}
                            className="pagination-btn"
                        >
                            السابق
                        </button>
                        <span className="pagination-current">
                            {pagination.page} / {totalPages}
                        </span>
                        <button
                            onClick={() => pagination.onPageChange(pagination.page + 1)}
                            disabled={pagination.page >= totalPages}
                            className="pagination-btn"
                        >
                            التالي
                        </button>
                        <button
                            onClick={() => pagination.onPageChange(totalPages)}
                            disabled={pagination.page >= totalPages}
                            className="pagination-btn"
                        >
                            الأخيرة
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
