import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import TokenBlacklist from '../models/tokenBlacklist.model.js';
import { sendError } from '../utils/apiResponse.js';

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return sendError(res, 401, 'Not authorized, no token');
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return sendError(res, 401, 'Not authorized, no token');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        const blacklisted = await TokenBlacklist.findOne({ tokenHash });

        if (blacklisted) {
            return sendError(res, 401, 'Not authorized, token revoked');
        }

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return sendError(res, 401, 'Not authorized, user not found');
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        return sendError(res, 401, 'Not authorized, token failed');
    }
};
