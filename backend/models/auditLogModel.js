import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String },
    action: { type: String, required: true }, // e.g., 'ADD_PRODUCT'
    targetId: { type: String }, // e.g., productID, orderID
    description: { type: String }, // e.g., 'Added product Nike Air Max'
    timestamp: { type: Number, default: Date.now }
});

const auditLogModel = mongoose.models.auditLog || mongoose.model('auditLog', auditLogSchema);

export default auditLogModel;
