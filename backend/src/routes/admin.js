import express from 'express';
import {
  getPendingUsers,
  approveUser,
  deleteUser,
  getAllUsers,
  createInternalJob,
  updateInternalJob,
  deleteInternalJob,
  getAllInternalJobs,
  getDashboardStats,
  updateApplicationStatus,
  addCompany,
  updateCompany,
  deleteCompany
} from '../controllers/adminController.js';
import { protect } from '../middleware/auth.js';
import { isAdmin } from '../middleware/roles.js';

const router = express.Router();

// All routes are protected and admin-only
router.use(protect, isAdmin);

// User management
router.get('/pending-users', getPendingUsers);
router.put('/approve-user/:userId', approveUser);
router.delete('/users/:userId', deleteUser);
router.get('/users', getAllUsers);

// Internal job management
router.post('/internal-jobs', createInternalJob);
router.put('/internal-jobs/:id', updateInternalJob);
router.delete('/internal-jobs/:id', deleteInternalJob);
router.get('/internal-jobs', getAllInternalJobs);

// Company management
router.post('/companies', addCompany);
router.put('/companies/:id', updateCompany);
router.delete('/companies/:id', deleteCompany);

// Application management
router.put('/applications/:applicationId/status', updateApplicationStatus);

// Dashboard stats
router.get('/stats', getDashboardStats);

export default router;
