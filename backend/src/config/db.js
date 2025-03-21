import mongoose from 'mongoose';

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {})
    .catch((error) => {
        console.error(error);
    });
