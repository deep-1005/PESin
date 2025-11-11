import User from '../models/user.js';
import Company from '../models/company.js';

// @desc    Get all alumni
// @route   GET /api/alumni
// @access  Private (Student, Alumni)
export const getAllAlumni = async (req, res) => {
  try {
    const { company, branch, batch, search } = req.query;
    
    const filter = { role: 'alumni', isApproved: true };
    
    if (company) {
      filter.currentCompany = { $regex: company, $options: 'i' };
    }
    
    if (branch) {
      filter.branch = branch;
    }
    
    if (batch) {
      filter.batch = batch;
    }
    
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { currentCompany: { $regex: search, $options: 'i' } },
        { designation: { $regex: search, $options: 'i' } }
      ];
    }

    const alumni = await User.find(filter)
      .select('firstName lastName email phone currentCompany designation branch batch yearsOfExperience expertise willingToMentor linkedIn profilePicture')
      .sort({ batch: -1, lastName: 1 });

    res.status(200).json({
      success: true,
      count: alumni.length,
      data: alumni
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching alumni',
      error: error.message
    });
  }
};

// @desc    Get alumni by company
// @route   GET /api/alumni/by-company/:companyName
// @access  Private (Student, Alumni)
export const getAlumniByCompany = async (req, res) => {
  try {
    const { companyName } = req.params;

    const alumni = await User.find({
      role: 'alumni',
      isApproved: true,
      currentCompany: { $regex: companyName, $options: 'i' }
    })
      .select('firstName lastName email currentCompany designation branch batch linkedIn willingToMentor')
      .sort({ yearsOfExperience: -1 });

    res.status(200).json({
      success: true,
      count: alumni.length,
      data: alumni
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching alumni by company',
      error: error.message
    });
  }
};

// @desc    Get alumni profile
// @route   GET /api/alumni/:id
// @access  Private (Student, Alumni)
export const getAlumniProfile = async (req, res) => {
  try {
    const alumni = await User.findOne({
      _id: req.params.id,
      role: 'alumni',
      isApproved: true
    }).select('-password');

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: 'Alumni not found'
      });
    }

    res.status(200).json({
      success: true,
      data: alumni
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching alumni profile',
      error: error.message
    });
  }
};

// @desc    Update alumni profile
// @route   PUT /api/alumni/profile
// @access  Private (Alumni)
export const updateAlumniProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      currentCompany,
      designation,
      yearsOfExperience,
      expertise,
      willingToMentor,
      bio,
      linkedIn,
      github,
      portfolio
    } = req.body;

    const alumni = await User.findById(req.user._id);

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: 'Alumni not found'
      });
    }

    // Update fields
    if (firstName) alumni.firstName = firstName;
    if (lastName) alumni.lastName = lastName;
    if (phone) alumni.phone = phone;
    if (currentCompany) alumni.currentCompany = currentCompany;
    if (designation) alumni.designation = designation;
    if (yearsOfExperience !== undefined) alumni.yearsOfExperience = yearsOfExperience;
    if (expertise) alumni.expertise = expertise;
    if (willingToMentor !== undefined) alumni.willingToMentor = willingToMentor;
    if (bio) alumni.bio = bio;
    if (linkedIn) alumni.linkedIn = linkedIn;
    if (github) alumni.github = github;
    if (portfolio) alumni.portfolio = portfolio;

    await alumni.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: alumni.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
};

// @desc    Get companies where alumni work
// @route   GET /api/alumni/companies
// @access  Private (Student, Alumni)
export const getAlumniCompanies = async (req, res) => {
  try {
    // Get unique companies with alumni count
    const companies = await User.aggregate([
      {
        $match: {
          role: 'alumni',
          isApproved: true,
          currentCompany: { $exists: true, $ne: null, $ne: '' }
        }
      },
      {
        $group: {
          _id: '$currentCompany',
          count: { $sum: 1 },
          alumni: {
            $push: {
              id: '$_id',
              name: { $concat: ['$firstName', ' ', '$lastName'] },
              designation: '$designation',
              branch: '$branch',
              batch: '$batch'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          company: '$_id',
          alumniCount: '$count',
          alumni: { $slice: ['$alumni', 5] } // Show first 5 alumni
        }
      },
      {
        $sort: { alumniCount: -1 }
      }
    ]);

    res.status(200).json({
      success: true,
      count: companies.length,
      data: companies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching alumni companies',
      error: error.message
    });
  }
};
