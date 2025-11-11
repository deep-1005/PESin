import express from 'express';
import {
  getAllInternalJobs,
  getInternalJobById,
  applyForInternalJob,
  getInternalJobApplications
} from '../controllers/jobController.js';
import { protect } from '../middleware/auth.js';
import { isStudent, isAdmin, isStudentOrAlumni } from '../middleware/roles.js';

const router = express.Router();

// Student routes for internal jobs
router.get('/internal', protect, isStudentOrAlumni, getAllInternalJobs);
router.get('/internal/:id', protect, isStudentOrAlumni, getInternalJobById);
router.post('/internal/:id/apply', protect, isStudentOrAlumni, applyForInternalJob);

// Admin routes for internal job applications
router.get('/internal/:id/applications', protect, isAdmin, getInternalJobApplications);

export default router;
