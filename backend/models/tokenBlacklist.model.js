import mongoose from 'mongoose';

const tokenBlacklistSchema = new mongoose.Schema({
    tokenHash: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

tokenBlacklistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const TokenBlacklist = mongoose.model('TokenBlacklist', tokenBlacklistSchema);

export default TokenBlacklist;
