import auditLogModel from '../models/auditLogModel.js';

const logAction = async (userId, userName, action, description, targetId = null) => {
    try {
        const log = new auditLogModel({
            userId,
            userName,
            action,
            description,
            targetId,
            timestamp: Date.now()
        });
        await log.save();
    } catch (error) {
        console.error('Failed to save audit log:', error);
    }
};

export default logAction;
