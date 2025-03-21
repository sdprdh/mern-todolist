import TodoService from '@/services/TodoService';
import { useSearchParams } from 'react-router-dom';
import { useTodoContext } from '../context/useTodoContext';

export const useTodoHandler = () => {
    const { form, dispatch } = useTodoContext();
    const [_, setSearchParams] = useSearchParams();

    const requestTodo = async (e, request, callback) => {
        e.preventDefault();

        dispatch({ type: 'SET_LOADING', payload: true });

        const formData = new FormData(e.target);
        const todo = Object.fromEntries(formData.entries());

        const response = await request(todo);

        if (!response.data) {
            dispatch({ type: 'SET_ERROR', payload: response.message });
            dispatch({ type: 'SET_LOADING', payload: false });
            return;
        }

        callback(response.data);

        dispatch({ type: 'SET_ERROR', payload: null });

        dispatch({ type: 'SET_LOADING', payload: false });

        dispatch({ type: 'SET_TYPE', payload: 'add' });

        dispatch({ type: 'SET_FORM', payload: null });

        dispatch({ type: 'SET_OPEN', payload: false });
    };

    const handleAddTodo = (e) => {
        return requestTodo(
            e,
            (todo) => TodoService.createTodo(todo),
            (response) => {
                dispatch({ type: 'CREATE_DATA', payload: response });
            }
        );
    };

    const handleUpdateTodo = (e) => {
        return requestTodo(
            e,
            (todo) => TodoService.updateTodo({ id: form?._id, credentials: todo }),
            (response) => {
                dispatch({
                    type: 'UPDATE_DATA',
                    payload: {
                        _id: form?._id,
                        ...response,
                    },
                });
            }
        );
    };

    const handleUpdateIsComplete = async (todo) => {
        await TodoService.updateTodo({
            id: todo._id,
            credentials: { isComplete: !todo.isComplete },
        });
    };

    const handleDeleteTodo = async (id) => {
        await TodoService.deleteTodo({ id });

        dispatch({ type: 'DELETE_DATA', payload: { _id: id } });
    };

    const handleSearchTodo = async (e) => {
        const value = e.target.value.toLowerCase();

        if (value.length > 0) {
            setSearchParams({ search: value });

            dispatch({ type: 'FILTER_DATA', payload: value });
        } else {
            const response = await TodoService.getTodos();

            dispatch({ type: 'SET_DATA', payload: response.data });

            setSearchParams({});
        }
    };

    const handleSortTodo = async (type) => {
        const response = await TodoService.getTodos();

        switch (type) {
            case 'ALL':
                dispatch({ type: 'SET_FILTER_DATA', payload: [] });
                break;

            case 'Complete':
                dispatch({
                    type: 'SET_FILTER_DATA',
                    payload: response.data.filter((todo) => todo.isComplete),
                });
                break;

            case 'Incomplete':
                dispatch({
                    type: 'SET_FILTER_DATA',
                    payload: response.data.filter((todo) => !todo.isComplete),
                });
                break;

            default:
                dispatch({
                    type: 'SET_FILTER_DATA',
                    payload: null,
                });
                return;
        }
    };

    return {
        handleAddTodo,
        handleUpdateTodo,
        handleUpdateIsComplete,
        handleDeleteTodo,
        handleSearchTodo,
        handleSortTodo,
    };
};
