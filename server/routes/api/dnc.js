import express from 'express';
import callController from '../../controllers/callController.js';
import authMiddleware from '../../middleware/authMiddleware.js'; 

const router = express.Router();

// Use the authMiddleware in the /dnc route
router.post('/dnc', authMiddleware, callController.addNumberToDNC);

// Use the authMiddleware in the /dnc/:phoneNumber route
router.get('/dnc/:phoneNumber', authMiddleware, callController.checkNumberInDNC);

export default router;