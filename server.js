import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import notesRouter from './routes/note.routes.js';
import errorMiddleware from './middleware/error.middleware.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/notes', notesRouter);

app.use(errorMiddleware)


app.get('/', (req, res) => {
    res.send('Notes App Backend is running');
});

app.listen(PORT, async() => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    await connectToDatabase()
});

export default app;