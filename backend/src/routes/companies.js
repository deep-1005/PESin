import express from 'express';
import {
  getAllCompanies,
  getCompanyById,
  getAllJobs,
  getJobById,
  getCompaniesByIndustry,
  getAllIndustries
} from '../controllers/companyController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/', getAllCompanies);
router.get('/industries/list', getAllIndustries);
router.get('/industry/:industry', getCompaniesByIndustry);
router.get('/jobs/all', getAllJobs);
router.get('/jobs/:jobId', getJobById);
router.get('/:id', getCompanyById);

export default router;
