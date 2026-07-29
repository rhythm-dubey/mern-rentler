import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.APP_PORT || 7000;

const __dirname = path.resolve();

app.use("/api/products", productRoutes);

if (process.env.APP_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("/{*splat}", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port: ${PORT}`);
});