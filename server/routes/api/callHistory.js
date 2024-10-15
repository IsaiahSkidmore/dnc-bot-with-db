import express from 'express';
import callController from '../../controllers/callController.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

// Use the authMiddleware in the /callHistory routes
router.post('/callHistory', authMiddleware, callController.addNumberToCallHistory);
router.get('/callHistory', authMiddleware, callController.getCallHistory);

export default router;