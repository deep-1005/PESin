import User from '../models/user.js';
import Company from '../models/company.js';
import Application from '../models/application.js';
import { getRecommendedCompanies, checkJobEligibility, getSuggestedSkills } from '../utils/matchingAlgorithm.js';

// @desc    Get all students (for directory)
// @route   GET /api/students
// @access  Private (Student/Alumni)
export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: { $in: ['student', 'alumni'] } })
      .select('-password')
      .sort({ firstName: 1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: error.message
    });
  }
};

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
      topSkill,
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

    // Update fields (use !== undefined to allow empty strings and 0 values)
    if (firstName !== undefined) student.firstName = firstName;
    if (lastName !== undefined) student.lastName = lastName;
    if (phone !== undefined) student.phone = phone;
    if (branch !== undefined) student.branch = branch;
    if (semester !== undefined) student.semester = semester;
    if (cgpa !== undefined) student.cgpa = cgpa;
    if (bio !== undefined) student.bio = bio;
    if (skills !== undefined) student.skills = skills;
    if (topSkill !== undefined) student.topSkill = topSkill;
    if (projects !== undefined) student.projects = projects;
    if (certifications !== undefined) student.certifications = certifications;
    if (achievements !== undefined) student.achievements = achievements;
    if (linkedIn !== undefined) student.linkedIn = linkedIn;
    if (github !== undefined) student.github = github;
    if (portfolio !== undefined) student.portfolio = portfolio;

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

    if (!student.topSkill) {
      return res.status(400).json({
        success: false,
        message: 'Please select your top skill in your profile to get company recommendations'
      });
    }

    // Hardcoded company mapping based on top skill
    const companyMapping = {
      'JavaScript': 'Google',
      'HTML and CSS': 'Airbnb',
      'Backend': 'Amazon',
      'Data Science': 'Netflix',
      'Node': 'PayPal',
      'Communication-Soft Skill': null // No specific company for communication
    };

    const recommendedCompanyName = companyMapping[student.topSkill];

    if (!recommendedCompanyName) {
      return res.status(200).json({
        success: true,
        message: 'No specific company recommendation for this skill',
        data: []
      });
    }

    // Find the recommended company
    const company = await Company.findOne({ 
      name: { $regex: new RegExp(recommendedCompanyName, 'i') } 
    });

    if (!company) {
      return res.status(200).json({
        success: true,
        message: `${recommendedCompanyName} not found in database. Please add it.`,
        data: []
      });
    }

    // Format the response
    const recommendation = {
      company: {
        _id: company._id,
        name: company.name,
        industry: company.industry,
        location: company.location,
        description: company.description,
        website: company.website,
        contactEmail: company.contactEmail,
        contactPhone: company.contactPhone
      },
      matchPercentage: 100, // Perfect match since it's based on top skill
      matchedSkills: [student.topSkill],
      missingSkills: [],
      reason: `Perfect match for your top skill: ${student.topSkill}`
    };

    res.status(200).json({
      success: true,
      count: 1,
      data: [recommendation]
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
