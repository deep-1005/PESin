import express from 'express';
import {
  getAllStudents,
  getStudentProfile,
  updateStudentProfile,
  uploadResume,
  getCompanyRecommendations,
  getMyApplications,
  applyForJob,
  getSkillSuggestions
} from '../controllers/studentController.js';
import { protect } from '../middleware/auth.js';
import { isStudent } from '../middleware/roles.js';
import { upload, handleMulterError } from '../utils/fileUpload.js';

const router = express.Router();

// Get all students - accessible to all authenticated students/alumni
router.get('/', protect, getAllStudents);

// All other routes are protected and student-only
router.use(protect, isStudent);

router.get('/profile', getStudentProfile);
router.put('/profile', updateStudentProfile);
router.post('/resume', upload.single('resume'), handleMulterError, uploadResume);
router.get('/recommendations', getCompanyRecommendations);
router.get('/applications', getMyApplications);
router.post('/apply/:jobId', applyForJob);
router.get('/skill-suggestions', getSkillSuggestions);

export default router;
