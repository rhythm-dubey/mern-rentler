import mongoose from 'mongoose';
import User from '../.././models/user.model.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(409).json({
                    success: false,
                    message: "User not found"
                });
        }

        const isPasswordCorrect = await existingUser.matchPassword(password);

        if (isPasswordCorrect) {
        
            const token = jwt.sign(
                {id: existingUser._id},
                process.env.JWT_SECRET,
                {expiresIn: process.env.JWT_EXPIRES_IN}
            );

            res.status(201).json({
                success: true,
                message: "User authenticated successfully",
                token,
                user: {
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email,
                    role: existingUser.role
                }
            });
            
        } else {
            res.status(201).json({
                success: false,
                message: "Password doesnt match"
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export default login;