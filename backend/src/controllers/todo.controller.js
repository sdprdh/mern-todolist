import Todo from '../models/todo.model.js';
import generateResponse from '../utils/generateResponse.js';

export const createTodoController = async (req, res) => {
    const { title } = req.body;
    const { id } = req.user;

    if (!title) {
        return generateResponse({ res, code: 400, message: 'All fields required' });
    }

    try {
        const todoExists = await Todo.findOne({ title });

        if (todoExists) {
            return generateResponse({ res, code: 409, message: 'Todo already exists' });
        }

        const todo = new Todo({ title, userId: id });

        await todo.save();

        return generateResponse({
            res,
            code: 201,
            message: 'Create todo successfully',
            data: todo,
        });
    } catch (error) {
        return generateResponse({ res, code: 500, message: error.message });
    }
};

export const getTodosController = async (req, res) => {
    const { id } = req.user;

    try {
        const todos = await Todo.find({ userId: id }).select('-__v').sort({ createdAt: -1 }).lean();

        return generateResponse({
            res,
            code: 200,
            message: 'get todos successfully',
            data: todos,
        });
    } catch (error) {
        return generateResponse({ res, code: 500, message: error.message });
    }
};

export const updateTodoController = async (req, res) => {
    const userId = req.user.id;
    const todoId = req.params.id;

    try {
        const todo = await Todo.findByIdAndUpdate(
            { _id: todoId, userId },
            { ...req.body },
            { new: true }
        );

        if (!todo) {
            return generateResponse({ res, code: 404, message: 'Todo not found or unauthorized' });
        }

        return generateResponse({
            res,
            code: 200,
            message: 'Update todo successfully',
            data: todo,
        });
    } catch (error) {
        return generateResponse({ res, code: 500, message: error.message });
    }
};

export const deleteTodoController = async (req, res) => {
    const userId = req.user.id;
    const todoId = req.params.id;

    try {
        const todo = await Todo.findByIdAndDelete({ _id: todoId, userId });

        if (!todo) {
            return generateResponse({ res, code: 404, message: 'Todo not found or unauthorized' });
        }

        return generateResponse({
            res,
            code: 200,
            message: 'Delete todo successfully',
            data: todo,
        });
    } catch (error) {
        return generateResponse({ res, code: 500, message: error.message });
    }
};
