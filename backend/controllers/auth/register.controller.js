import mongoose from 'mongoose';
import User from '../.././models/user.model.js';
import jwt from 'jsonwebtoken';
import {sendSuccess, sendError} from '../.././utils/apiResponse.js';

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return sendError(res, 409, `Email already registered`);
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

        return sendSuccess(res, 200, "User registered successfully", {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        return sendError(res, 500, error.message);
    }
};

export default register;