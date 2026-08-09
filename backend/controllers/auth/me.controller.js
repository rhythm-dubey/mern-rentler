import { sendSuccess, sendError } from '../../utils/apiResponse.js';

const me = async (req, res) => {
    try {
        return sendSuccess(res, 200, 'User fetched successfully', {
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role
            }
        });
    } catch (error) {
        return sendError(res, 500, error.message);
    }
};

export default me;
