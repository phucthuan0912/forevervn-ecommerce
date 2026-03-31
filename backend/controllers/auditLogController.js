import auditLogModel from '../models/auditLogModel.js';

const getAuditLogs = async (req, res) => {
    try {
        const logs = await auditLogModel.find({}).sort({ timestamp: -1 }).limit(100);
        res.json({ success: true, logs });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const clearAuditLogs = async (req, res) => {
    try {
        await auditLogModel.deleteMany({});
        res.json({ success: true, message: 'Logs Cleared' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { getAuditLogs, clearAuditLogs };
