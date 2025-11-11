import InternalJob from '../models/internalJob.js';
import Application from '../models/application.js';

// @desc    Get all internal jobs (Students only)
// @route   GET /api/jobs/internal
// @access  Private (Student)
export const getAllInternalJobs = async (req, res) => {
  try {
    const { category, department, search } = req.query;
    
    const filter = { isActive: true };
    
    if (category) {
      filter.category = category;
    }
    
    if (department) {
      filter.department = department;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    const internalJobs = await InternalJob.find(filter)
      .populate('postedBy', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: internalJobs.length,
      data: internalJobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching internal jobs',
      error: error.message
    });
  }
};

// @desc    Get internal job by ID
// @route   GET /api/jobs/internal/:id
// @access  Private (Student)
export const getInternalJobById = async (req, res) => {
  try {
    const internalJob = await InternalJob.findById(req.params.id)
      .populate('postedBy', 'firstName lastName email');

    if (!internalJob) {
      return res.status(404).json({
        success: false,
        message: 'Internal job not found'
      });
    }

    res.status(200).json({
      success: true,
      data: internalJob
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching internal job',
      error: error.message
    });
  }
};

// @desc    Apply for internal job
// @route   POST /api/jobs/internal/:id/apply
// @access  Private (Student)
export const applyForInternalJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { coverLetter } = req.body;

    // Check if job exists
    const internalJob = await InternalJob.findById(id);
    if (!internalJob) {
      return res.status(404).json({
        success: false,
        message: 'Internal job not found'
      });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      student: req.user._id,
      internalJob: id
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this internal job'
      });
    }

    // Create application
    const application = await Application.create({
      student: req.user._id,
      internalJob: id,
      applicationType: 'internal',
      coverLetter,
      resumeUrl: req.user.resumeUrl,
      statusHistory: [{
        status: 'Applied',
        date: Date.now(),
        notes: 'Application submitted for internal job'
      }]
    });

    // Increment application count
    internalJob.totalApplications += 1;
    await internalJob.save();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error applying for internal job',
      error: error.message
    });
  }
};

// @desc    Get applications for internal job (Admin only)
// @route   GET /api/jobs/internal/:id/applications
// @access  Private (Admin)
export const getInternalJobApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      internalJob: req.params.id
    })
      .populate('student', 'firstName lastName email usn branch semester cgpa skills resumeUrl')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching applications',
      error: error.message
    });
  }
};
