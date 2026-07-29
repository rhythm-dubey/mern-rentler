import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

const PORT = process.env.APP_PORT || 7000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port: ${PORT}`);
});