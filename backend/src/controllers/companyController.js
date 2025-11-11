import Company from '../models/company.js';
import Job from '../models/job.js';

// @desc    Get all companies
// @route   GET /api/companies
// @access  Private
export const getAllCompanies = async (req, res) => {
  try {
    const { industry, search, isActive } = req.query;
    
    const filter = {};
    
    if (industry) {
      filter.industry = industry;
    }
    
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { industry: { $regex: search, $options: 'i' } }
      ];
    }

    const companies = await Company.find(filter)
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: companies.length,
      data: companies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching companies',
      error: error.message
    });
  }
};

// @desc    Get single company
// @route   GET /api/companies/:id
// @access  Private
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    // Get jobs for this company
    const jobs = await Job.find({ company: req.params.id, isActive: true })
      .select('title type location salary applicationDeadline');

    res.status(200).json({
      success: true,
      data: {
        company,
        jobs
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching company',
      error: error.message
    });
  }
};

// @desc    Get all jobs from all companies
// @route   GET /api/companies/jobs/all
// @access  Private
export const getAllJobs = async (req, res) => {
  try {
    const { type, location, minSalary, skills, branch } = req.query;
    
    const filter = { isActive: true };
    
    if (type) {
      filter.type = type;
    }
    
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    
    if (minSalary) {
      filter['salary.min'] = { $gte: parseInt(minSalary) };
    }
    
    if (skills) {
      const skillArray = skills.split(',').map(s => s.trim());
      filter.requiredSkills = { $in: skillArray };
    }
    
    if (branch && branch !== 'All') {
      filter.$or = [
        { eligibleBranches: branch },
        { eligibleBranches: 'All' }
      ];
    }

    const jobs = await Job.find(filter)
      .populate('company', 'name logo industry website')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs',
      error: error.message
    });
  }
};

// @desc    Get job by ID
// @route   GET /api/companies/jobs/:jobId
// @access  Private
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId)
      .populate('company', 'name logo industry website headquarters contactEmail');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching job',
      error: error.message
    });
  }
};

// @desc    Get companies by industry
// @route   GET /api/companies/industry/:industry
// @access  Private
export const getCompaniesByIndustry = async (req, res) => {
  try {
    const { industry } = req.params;

    const companies = await Company.find({
      industry: { $regex: industry, $options: 'i' },
      isActive: true
    }).sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: companies.length,
      data: companies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching companies by industry',
      error: error.message
    });
  }
};

// @desc    Get all unique industries
// @route   GET /api/companies/industries/list
// @access  Private
export const getAllIndustries = async (req, res) => {
  try {
    const industries = await Company.distinct('industry');

    res.status(200).json({
      success: true,
      count: industries.length,
      data: industries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching industries',
      error: error.message
    });
  }
};
