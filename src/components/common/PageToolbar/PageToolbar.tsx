import {
    Search as SearchIcon,
    Plus as PlusIcon,
    Pencil as EditIcon,
    Trash2 as TrashIcon,
    Download as DownloadIcon,
    Printer as PrintIcon,
    RefreshCw as RefreshIcon,
    Eye as ViewIcon,
    Check as CheckIcon,
    Star as StarIcon,
    Package as BoxIcon,
} from 'lucide-react';
import './PageToolbar.css';

type IconType = 'plus' | 'edit' | 'trash' | 'download' | 'print' | 'refresh' | 'view' | 'check' | 'star' | 'box';

interface ToolbarAction {
    label: string;
    icon: IconType;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger' | 'success';
    disabled?: boolean;
}

interface PageToolbarProps {
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;
    actions: ToolbarAction[];
    children?: React.ReactNode;
}

const iconMap = {
    plus: PlusIcon,
    edit: EditIcon,
    trash: TrashIcon,
    download: DownloadIcon,
    print: PrintIcon,
    refresh: RefreshIcon,
    view: ViewIcon,
    check: CheckIcon,
    star: StarIcon,
    box: BoxIcon,
};

export function PageToolbar({
    searchValue,
    onSearchChange,
    searchPlaceholder = 'بحث...',
    actions,
    children,
}: PageToolbarProps) {
    return (
        <div className="page-toolbar">
            {onSearchChange && (
                <div className="toolbar-search">
                    <SearchIcon className="search-icon" size={18} />
                    <input
                        type="text"
                        value={searchValue || ''}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={searchPlaceholder}
                        className="search-input"
                    />
                </div>
            )}

            {children}

            <div className="toolbar-actions">
                {actions.map((action, index) => {
                    const Icon = iconMap[action.icon];
                    return (
                        <button
                            key={index}
                            className={`toolbar-btn toolbar-btn--${action.variant || 'secondary'}`}
                            onClick={action.onClick}
                            disabled={action.disabled}
                            title={action.label}
                        >
                            {Icon && <Icon size={16} />}
                            <span>{action.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
