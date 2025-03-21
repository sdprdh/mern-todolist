import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from './components/ui/provider.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { TodoContextProvider } from './context/TodoContext.jsx';
import { router } from './router/router.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider>
            <AuthContextProvider>
                <TodoContextProvider>
                    <RouterProvider router={router} />
                </TodoContextProvider>
            </AuthContextProvider>
        </Provider>
    </StrictMode>
);
