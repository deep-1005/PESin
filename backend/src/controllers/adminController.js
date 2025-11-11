import User from '../models/user.js';
import Company from '../models/company.js';
import Job from '../models/job.js';
import InternalJob from '../models/internalJob.js';
import Application from '../models/application.js';

// @desc    Get all pending users for approval
// @route   GET /api/admin/pending-users
// @access  Private (Admin)
export const getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await User.find({ isApproved: false, role: { $ne: 'admin' } })
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: pendingUsers.length,
      data: pendingUsers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pending users',
      error: error.message
    });
  }
};

// @desc    Approve user
// @route   PUT /api/admin/approve-user/:userId
// @access  Private (Admin)
export const approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isApproved = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User approved successfully',
      data: user.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error approving user',
      error: error.message
    });
  }
};

// @desc    Reject/Delete user
// @route   DELETE /api/admin/users/:userId
// @access  Private (Admin)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
export const getAllUsers = async (req, res) => {
  try {
    const { role, isApproved } = req.query;
    
    const filter = {};
    if (role) filter.role = role;
    if (isApproved !== undefined) filter.isApproved = isApproved === 'true';

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// @desc    Create internal job posting
// @route   POST /api/admin/internal-jobs
// @access  Private (Admin)
export const createInternalJob = async (req, res) => {
  try {
    const internalJob = await InternalJob.create({
      ...req.body,
      postedBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Internal job posted successfully',
      data: internalJob
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating internal job',
      error: error.message
    });
  }
};

// @desc    Update internal job
// @route   PUT /api/admin/internal-jobs/:id
// @access  Private (Admin)
export const updateInternalJob = async (req, res) => {
  try {
    const internalJob = await InternalJob.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!internalJob) {
      return res.status(404).json({
        success: false,
        message: 'Internal job not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Internal job updated successfully',
      data: internalJob
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating internal job',
      error: error.message
    });
  }
};

// @desc    Delete internal job
// @route   DELETE /api/admin/internal-jobs/:id
// @access  Private (Admin)
export const deleteInternalJob = async (req, res) => {
  try {
    const internalJob = await InternalJob.findById(req.params.id);

    if (!internalJob) {
      return res.status(404).json({
        success: false,
        message: 'Internal job not found'
      });
    }

    await internalJob.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Internal job deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting internal job',
      error: error.message
    });
  }
};

// @desc    Get all internal jobs
// @route   GET /api/admin/internal-jobs
// @access  Private (Admin)
export const getAllInternalJobs = async (req, res) => {
  try {
    const internalJobs = await InternalJob.find()
      .populate('postedBy', 'firstName lastName email')
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

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private (Admin)
export const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalAlumni = await User.countDocuments({ role: 'alumni' });
    const totalCompanies = await Company.countDocuments();
    const totalJobs = await Job.countDocuments({ isActive: true });
    const totalInternalJobs = await InternalJob.countDocuments({ isActive: true });
    const totalApplications = await Application.countDocuments();
    const pendingApprovals = await User.countDocuments({ isApproved: false, role: { $ne: 'admin' } });

    // Applications by status
    const applicationsByStatus = await Application.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Recent applications
    const recentApplications = await Application.find()
      .populate('student', 'firstName lastName usn')
      .populate('job', 'title')
      .populate('company', 'name')
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalAlumni,
        totalCompanies,
        totalJobs,
        totalInternalJobs,
        totalApplications,
        pendingApprovals,
        applicationsByStatus,
        recentApplications
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard stats',
      error: error.message
    });
  }
};

// @desc    Update application status
// @route   PUT /api/admin/applications/:applicationId/status
// @access  Private (Admin)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status, notes, interviewDetails, offerDetails } = req.body;

    const application = await Application.findById(req.params.applicationId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    application.status = status;
    
    // Add to status history
    application.statusHistory.push({
      status,
      date: Date.now(),
      notes,
      updatedBy: req.user._id
    });

    if (interviewDetails) {
      application.interviewDetails = interviewDetails;
    }

    if (offerDetails && status === 'Selected') {
      application.offerDetails = offerDetails;
    }

    await application.save();

    res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating application status',
      error: error.message
    });
  }
};

// @desc    Add/Edit company
// @route   POST /api/admin/companies
// @access  Private (Admin)
export const addCompany = async (req, res) => {
  try {
    const company = await Company.create({
      ...req.body,
      addedBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Company added successfully',
      data: company
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding company',
      error: error.message
    });
  }
};

// @desc    Update company
// @route   PUT /api/admin/companies/:id
// @access  Private (Admin)
export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Company updated successfully',
      data: company
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating company',
      error: error.message
    });
  }
};

// @desc    Delete company
// @route   DELETE /api/admin/companies/:id
// @access  Private (Admin)
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    await company.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Company deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting company',
      error: error.message
    });
  }
};
