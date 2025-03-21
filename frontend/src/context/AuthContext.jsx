import AuthService from '@/services/AuthService';
import { createContext, useEffect, useReducer } from 'react';

const AuthContext = createContext(null);

const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                data: action.payload,
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload,
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        data: null,
        loading: false,
        error: null,
    });

    useEffect(() => {
        (async () => {
            const response = await AuthService.getUser();

            if (response.data !== null) {
                dispatch({ type: 'SET_DATA', payload: response.data });
            }
        })();
    }, []);

    return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
