import AuthService from '@/services/AuthService';
import TodoService from '@/services/TodoService';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/useAuthContext';
import { useTodoContext } from '../context/useTodoContext';

export const useAuthHandler = () => {
    const navigate = useNavigate();

    const { pathname } = useLocation();

    const { dispatch: dispatchAuth } = useAuthContext();
    const { dispatch: dispatchTodo } = useTodoContext();

    useEffect(() => {
        dispatchAuth({ type: 'SET_ERROR', payload: null });
    }, [dispatchAuth, pathname]);

    const requestAuth = async (e, request) => {
        e.preventDefault();

        dispatchAuth({ type: 'SET_LOADING', payload: true });

        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries());

        const responseAuth = await request(user);

        if (!responseAuth.data) {
            dispatchAuth({ type: 'SET_ERROR', payload: responseAuth.message });
            dispatchAuth({ type: 'SET_LOADING', payload: false });
            return;
        }

        dispatchAuth({ type: 'SET_DATA', payload: responseAuth.data });

        const responseTodos = await TodoService.getTodos();

        dispatchTodo({ type: 'SET_DATA', payload: responseTodos.data });

        dispatchAuth({ type: 'SET_ERROR', payload: null });
        dispatchAuth({ type: 'SET_LOADING', payload: false });

        navigate('/');
    };

    const handleRegister = (e) => {
        return requestAuth(e, (user) => AuthService.register(user));
    };

    const handleLogin = (e) => {
        return requestAuth(e, (user) => AuthService.login(user));
    };

    const handleLogout = async () => {
        await AuthService.logout();

        dispatchAuth({ type: 'SET_DATA', payload: null });
        dispatchTodo({ type: 'SET_DATA', payload: [] });
    };

    return {
        handleRegister,
        handleLogin,
        handleLogout,
    };
};
