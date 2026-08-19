import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { TabsProvider } from './context/TabsContext';
import { LanguageProvider } from './context/LanguageContext';
import { AppRoutes } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <LanguageProvider>
            <TabsProvider>
              <AuthProvider>
                <AppRoutes />
                <Toaster
                  position="top-left"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: 'var(--bg-elevated)',
                      color: 'var(--text-primary)',
                      boxShadow: 'var(--shadow-md)',
                      border: '1px solid var(--border-primary)',
                    },
                  }}
                />
              </AuthProvider>
            </TabsProvider>
          </LanguageProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
