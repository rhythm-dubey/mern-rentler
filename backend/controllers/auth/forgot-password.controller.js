import crypto from 'crypto';
import User from '../../models/user.model.js';
import sendEmail from '../../utils/sendEmail.js';
import { sendSuccess, sendError } from '../../utils/apiResponse.js';

const SUCCESS_MESSAGE = 'If that email exists, a reset link has been sent';

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return sendSuccess(res, 200, SUCCESS_MESSAGE);
        }

        const rawToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(rawToken).digest('hex');
        user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${rawToken}`;

        try {
            await sendEmail({
                to: user.email,
                subject: 'Password reset',
                text: `You requested a password reset. Click the link below to reset your password (valid for 10 minutes):\n\n${resetUrl}\n\nIf you did not request this, you can ignore this email.`
            });
        } catch (error) {
            return sendError(res, 500, error.message);
        }

        return sendSuccess(res, 200, SUCCESS_MESSAGE);
    } catch (error) {
        return sendError(res, 500, error.message);
    }
};

export default forgotPassword;
