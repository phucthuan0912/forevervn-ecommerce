import express from 'express';
import authUser from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';
import {
    placeOrder,
    allOrders,
    userOrders,
    updateStatus,
    cancelOrder,
    confirmReceived,
    deleteOrder
} from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);
orderRouter.post('/delete', adminAuth, deleteOrder);
orderRouter.post('/userorders', authUser, userOrders);
orderRouter.post('/cancel', authUser, cancelOrder);
orderRouter.post('/confirm-received', authUser, confirmReceived);

export default orderRouter;
