import mongoose from 'mongoose';
import Product from '.././models/product.model.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export const get = async (req, res) => {
	try { 
		const products = await Product.find({});
		return sendSuccess(res, 200, "Products fetched", { data: products });
	} catch (error) {
		console.error('Products get Error;', error.message);
		return sendError(res, 500, "Server error");
	}
};

export const update = async (req, res) => {
	const {id} = req.params;
	const product = req.body;

	if (! mongoose.Types.ObjectId.isValid(id)) {
		return sendError(res, 404, "product not found");
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
		return sendSuccess(res, 200, "Product updated", { data: updatedProduct });
	} catch(error) {
		console.error(`Products put Error; ${error.message}`);
		return sendError(res, 500, "Server error");
	}
};

export const create = async (req, res) => {
	const product = req.body;

	if (!product.name || !product.price || !product.image) {
		return sendError(res, 400, 'Please provide all details');
	}

	const newProduct = new Product(product);

	try {
		await newProduct.save();
		return sendSuccess(res, 201, "Product created", { data: newProduct });
	} catch(error) {
		console.error(`Products Post Error; ${error.message}`);
		return sendError(res, 500, "Server error");
	}
};

export const destroy = async(req, res) => {
	const {id} = req.params;

	try {
		await Product.findByIdAndDelete(id);
		return sendSuccess(res, 200, "Product deleted.");
	} catch(error) {
		console.error(`Products Delete Error; ${error.message}`);
		return sendError(res, 404, "product not found");
	}
};
