import mongoose from 'mongoose';
import User from '../.././models/user.model.js';
import jwt from 'jsonwebtoken';
import {sendSuccess, sendError} from '../.././utils/apiResponse.js';

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return sendError(res, 409, `User not found`);
        }

        const isPasswordCorrect = await existingUser.matchPassword(password);

        if (isPasswordCorrect) {
        
            const token = jwt.sign(
                {id: existingUser._id},
                process.env.JWT_SECRET,
                {expiresIn: process.env.JWT_EXPIRES_IN}
            );

            return sendSuccess(res, 200, "User authenticated successfully", {
                token,
                user: {
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email,
                    role: existingUser.role
                }
            });
            
        } else {
            return sendError(res, 201, `Password doesnt match`);
        }

    } catch (error) {
        return sendError(res, 500, error.message);
    }
}

export default login;