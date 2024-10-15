import express from 'express';
import dncRoutes from './api/dnc.js';
import callHistoryRoutes from './api/callHistory.js';

const router = express.Router();

// Use the imported routes
router.use('/api', dncRoutes);
router.use('/api', callHistoryRoutes);

export default router;