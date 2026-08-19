import './Loading.css';

interface LoadingProps {
    message?: string;
    fullScreen?: boolean;
}

export function Loading({ message = 'جاري التحميل...', fullScreen = false }: LoadingProps) {
    return (
        <div className={`loading-container ${fullScreen ? 'fullscreen' : ''}`}>
            <div className="spinner"></div>
            {message && <p className="loading-message">{message}</p>}
        </div>
    );
}
