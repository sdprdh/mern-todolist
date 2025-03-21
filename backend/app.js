import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

// import routes
import todoRoute from './src/routes/todo.route.js';
import userRoute from './src/routes/user.route.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use('/api/auth', userRoute);
app.use('/api/todos', todoRoute);

export default app;
