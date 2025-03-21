import request from './Request';

class TodoService {
    static createTodo({ title }) {
        return request({
            url: 'todos',
            method: 'POST',
            body: { title },
        });
    }

    static getTodos() {
        return request({
            url: 'todos',
            method: 'GET',
        });
    }

    static updateTodo({ id, credentials }) {
        return request({
            url: `todos/${id}`,
            method: 'PATCH',
            body: { ...credentials },
        });
    }

    static deleteTodo({ id }) {
        return request({
            url: `todos/${id}`,
            method: 'DELETE',
        });
    }
}

export default TodoService;
