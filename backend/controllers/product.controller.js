import mongoose from 'mongoose';
import Product from '.././models/product.model.js';

export const get = async (req, res) => {
	try { 
		const products = await Product.find({});
		res.status(200)
			.json({
				success: true,
				data: products
			});
	} catch (error) {
		console.error('Products get Error;', error.message);
		res.status(500)
			.json({
				success: false,
				message: "Server error"
			});
	}
};

export const update = async (req, res) => {
	const {id} = req.params;
	const product = req.body;

	if (! mongoose.Types.ObjectId.isValid(id)) {
		res.status(404)
			.json({
				success: false,
				message: "product not found"
			});
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
		res.status(200)
			.json({
				success: true,
				data: updatedProduct
			});
	} catch(error) {
		console.error(`Products put Error; ${error.message}`);
		res.status(500)
			.json({
				success: false,
				message: "Server error"
			});
	}
};

export const create = async (req, res) => {
	console.log(req.body);
	const product = req.body;

	if (!product.name || !product.price || !product.image) {
		return res.status(400)
			.json({
				success: false,
				message: 'Please provide all details'
			})
	}

	const newProduct = new Product(product);

	try {
		await newProduct.save();
		res.status(201)
			.json({
				success: true,
				data: newProduct
			});
	} catch(error) {
		console.error(`Products Post Error; ${error.message}`);
		res.status(500)
			.json({
				success: false,
				message: "Server error"
			});
	}
};

export const destroy = async(req, res) => {
	const {id} = req.params;

	try {
		await Product.findByIdAndDelete(id);
		res.status(200)
			.json({
				success: true,
				message: "Product deleted."
			});
	} catch(error) {
		console.error(`Products Delete Error; ${error.message}`);
		res.status(404)
			.json({
				success: false,
				message: "product not found"
			});
	}
};