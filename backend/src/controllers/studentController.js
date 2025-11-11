import User from '../models/user.js';
import Company from '../models/company.js';
import Application from '../models/application.js';
import { getRecommendedCompanies, checkJobEligibility, getSuggestedSkills } from '../utils/matchingAlgorithm.js';

// @desc    Get student profile
// @route   GET /api/students/profile
// @access  Private (Student)
export const getStudentProfile = async (req, res) => {
  try {
    const student = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      data: student.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
};

// @desc    Update student profile/portfolio
// @route   PUT /api/students/profile
// @access  Private (Student)
export const updateStudentProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      branch,
      semester,
      cgpa,
      bio,
      skills,
      projects,
      certifications,
      achievements,
      linkedIn,
      github,
      portfolio
    } = req.body;

    const student = await User.findById(req.user._id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Update fields
    if (firstName) student.firstName = firstName;
    if (lastName) student.lastName = lastName;
    if (phone) student.phone = phone;
    if (branch) student.branch = branch;
    if (semester) student.semester = semester;
    if (cgpa !== undefined) student.cgpa = cgpa;
    if (bio) student.bio = bio;
    if (skills) student.skills = skills;
    if (projects) student.projects = projects;
    if (certifications) student.certifications = certifications;
    if (achievements) student.achievements = achievements;
    if (linkedIn) student.linkedIn = linkedIn;
    if (github) student.github = github;
    if (portfolio) student.portfolio = portfolio;

    await student.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: student.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
};

// @desc    Upload resume
// @route   POST /api/students/resume
// @access  Private (Student)
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a resume file'
      });
    }

    const student = await User.findById(req.user._id);
    student.resumeUrl = `/uploads/${req.file.filename}`;
    await student.save();

    res.status(200).json({
      success: true,
      message: 'Resume uploaded successfully',
      data: {
        resumeUrl: student.resumeUrl
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading resume',
      error: error.message
    });
  }
};

// @desc    Get recommended companies based on skills
// @route   GET /api/students/recommendations
// @access  Private (Student)
export const getCompanyRecommendations = async (req, res) => {
  try {
    const student = await User.findById(req.user._id);

    if (!student.skills || student.skills.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please add skills to your profile to get recommendations'
      });
    }

    // Get all active companies
    const companies = await Company.find({ isActive: true });

    // Get recommendations
    const recommendations = getRecommendedCompanies(student.skills, companies);

    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: recommendations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching recommendations',
      error: error.message
    });
  }
};

// @desc    Get all applications of student
// @route   GET /api/students/applications
// @access  Private (Student)
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user._id })
      .populate('job', 'title type location salary applicationDeadline')
      .populate('internalJob', 'title category department applicationDeadline')
      .populate('company', 'name logo industry')
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

// @desc    Apply for a job
// @route   POST /api/students/apply/:jobId
// @access  Private (Student)
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { coverLetter, applicationType, internalJobId } = req.body;

    const student = await User.findById(req.user._id);

    // Check if resume is uploaded
    if (!student.resumeUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please upload your resume before applying'
      });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      student: req.user._id,
      ...(applicationType === 'internal' ? { internalJob: internalJobId } : { job: jobId })
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job'
      });
    }

    // Create application
    const applicationData = {
      student: req.user._id,
      coverLetter,
      resumeUrl: student.resumeUrl,
      applicationType: applicationType || 'external',
      statusHistory: [{
        status: 'Applied',
        date: Date.now(),
        notes: 'Application submitted'
      }]
    };

    if (applicationType === 'internal') {
      applicationData.internalJob = internalJobId;
    } else {
      const Job = (await import('../models/job.js')).default;
      const job = await Job.findById(jobId).populate('company');
      
      if (!job) {
        return res.status(404).json({
          success: false,
          message: 'Job not found'
        });
      }

      applicationData.job = jobId;
      applicationData.company = job.company._id;

      // Increment application count
      job.totalApplications += 1;
      await job.save();
    }

    const application = await Application.create(applicationData);

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting application',
      error: error.message
    });
  }
};

// @desc    Get skill suggestions
// @route   GET /api/students/skill-suggestions
// @access  Private (Student)
export const getSkillSuggestions = async (req, res) => {
  try {
    const student = await User.findById(req.user._id);
    const suggestions = getSuggestedSkills(student.branch);

    res.status(200).json({
      success: true,
      data: suggestions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching skill suggestions',
      error: error.message
    });
  }
};
