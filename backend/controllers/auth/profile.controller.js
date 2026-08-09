import User from '../../models/user.model.js';
import { sendSuccess, sendError } from '../../utils/apiResponse.js';

const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return sendError(res, 401, 'Not authorized, user not found');
        }

        if (email !== undefined && email.toLowerCase().trim() !== user.email) {
            const existingUser = await User.findOne({
                email,
                _id: { $ne: user._id }
            });

            if (existingUser) {
                return sendError(res, 409, 'Email already registered');
            }

            user.email = email;
        }

        if (name !== undefined) {
            user.name = name;
        }

        await user.save();

        return sendSuccess(res, 200, 'Profile updated successfully', {
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

export default updateProfile;
