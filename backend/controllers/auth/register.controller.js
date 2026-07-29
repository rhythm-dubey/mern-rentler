import mongoose from 'mongoose';
import User from '../.././models/user.model.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                    success: false,
                    message: "Email already registered"
                });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export default register;