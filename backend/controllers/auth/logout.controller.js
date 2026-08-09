import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import TokenBlacklist from '../../models/tokenBlacklist.model.js';
import { sendSuccess, sendError } from '../../utils/apiResponse.js';

const logout = async (req, res) => {
    try {
        const token = req.token;
        const decoded = jwt.decode(token);

        if (!decoded?.exp) {
            return sendError(res, 401, 'Not authorized, token failed');
        }

        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        const expiresAt = new Date(decoded.exp * 1000);

        await TokenBlacklist.findOneAndUpdate(
            { tokenHash },
            { tokenHash, expiresAt },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return sendSuccess(res, 200, 'Logged out successfully');
    } catch (error) {
        return sendError(res, 500, error.message);
    }
};

export default logout;
