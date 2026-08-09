import User from '../../models/user.model.js';
import { sendSuccess, sendError } from '../../utils/apiResponse.js';

const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return sendError(res, 401, 'Not authorized, user not found');
        }

        const isMatch = await user.matchPassword(currentPassword);

        if (!isMatch) {
            return sendError(res, 401, 'Current password is incorrect');
        }

        user.password = newPassword;
        await user.save();

        return sendSuccess(res, 200, 'Password updated successfully');
    } catch (error) {
        return sendError(res, 500, error.message);
    }
};

export default changePassword;
