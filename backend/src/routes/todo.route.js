import express from 'express';
import {
    createTodoController,
    deleteTodoController,
    getTodosController,
    updateTodoController,
} from '../controllers/todo.controller.js';
import protectAuth from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protectAuth);

router.post('/', createTodoController);

router.get('/', getTodosController);

router.patch('/:id', updateTodoController);

router.delete('/:id', deleteTodoController);

export default router;
