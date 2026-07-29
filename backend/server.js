import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.APP_PORT || 7000;

app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
})
