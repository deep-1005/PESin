import express from 'express';
import {
  getAllAlumni,
  getAlumniByCompany,
  getAlumniProfile,
  updateAlumniProfile,
  getAlumniCompanies
} from '../controllers/alumniController.js';
import { protect } from '../middleware/auth.js';
import { isAlumni, isStudentOrAlumni } from '../middleware/roles.js';

const router = express.Router();

// Routes accessible by both students and alumni
router.get('/', protect, isStudentOrAlumni, getAllAlumni);
router.get('/companies', protect, isStudentOrAlumni, getAlumniCompanies);
router.get('/by-company/:companyName', protect, isStudentOrAlumni, getAlumniByCompany);
router.get('/:id', protect, isStudentOrAlumni, getAlumniProfile);

// Routes only for alumni
router.put('/profile', protect, isAlumni, updateAlumniProfile);

export default router;
