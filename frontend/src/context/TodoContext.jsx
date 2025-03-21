import { createContext, useReducer } from 'react';

const TodoContext = createContext(null);

const todoReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                data: action.payload,
            };

        case 'CREATE_DATA':
            return {
                ...state,
                data: [action.payload, ...state.data],
            };

        case 'UPDATE_DATA':
            return {
                ...state,
                data: state.data.map((todo) =>
                    todo._id === action.payload._id ? { ...todo, ...action.payload } : todo
                ),
            };

        case 'DELETE_DATA':
            return {
                ...state,
                data: state.data.filter((todo) => todo._id !== action.payload._id),
            };

        case 'SET_FILTER_DATA':
            return { ...state, filterData: action.payload };

        case 'FILTER_DATA':
            return {
                ...state,
                data: state.data.filter((todo) =>
                    todo.title.toLowerCase().includes(action.payload.toLowerCase())
                ),
            };

        case 'SET_OPEN':
            return {
                ...state,
                open: action.payload,
            };

        case 'SET_TYPE':
            return {
                ...state,
                type: action.payload,
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

        case 'SET_FORM':
            return {
                ...state,
                form: action.payload,
            };

        case 'SET_SORT':
            return {
                ...state,
                sort: action.payload,
            };
        default:
            return state;
    }
};

const TodoContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, {
        data: [],
        open: false,
        type: 'add',
        loading: false,
        error: null,
        form: null,
        sort: 'ALL',
        filterData: [],
    });

    return <TodoContext.Provider value={{ ...state, dispatch }}>{children}</TodoContext.Provider>;
};

export { TodoContext, TodoContextProvider };
