import { type ReactNode, useEffect } from 'react';
import { X as CloseIcon } from 'lucide-react';
import './Modal.css';

type ModalSize = 'small' | 'medium' | 'large' | 'full';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    size?: ModalSize;
    children: ReactNode;
    footer?: ReactNode;
    closeOnOverlay?: boolean;
    closeOnEscape?: boolean;
}

export function Modal({
    isOpen,
    onClose,
    title,
    size = 'medium',
    children,
    footer,
    closeOnOverlay = true,
    closeOnEscape = true,
}: ModalProps) {
    // Handle escape key
    useEffect(() => {
        if (!isOpen || !closeOnEscape) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose, closeOnEscape]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={closeOnOverlay ? onClose : undefined}>
            <div
                className={`modal-container modal-container--${size}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button
                        className="modal-close-btn"
                        onClick={onClose}
                        type="button"
                        aria-label="إغلاق"
                    >
                        <CloseIcon size={20} />
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                {footer && (
                    <div className="modal-footer">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

// Helper component for modal actions
interface ModalActionsProps {
    children: ReactNode;
}

export function ModalActions({ children }: ModalActionsProps) {
    return <div className="modal-actions">{children}</div>;
}
