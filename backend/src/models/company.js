import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    unique: true
  },
  logo: {
    type: String,
    default: null
  },
  description: {
    type: String,
    required: [true, 'Company description is required'],
    maxlength: 1000
  },
  industry: {
    type: String,
    required: true,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  
  // Contact Information
  contactEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  contactPhone: {
    type: String,
    trim: true
  },
  contactPerson: {
    name: String,
    designation: String,
    email: String,
    phone: String
  },
  
  // Location
  headquarters: {
    type: String,
    trim: true
  },
  locations: [{
    type: String,
    trim: true
  }],
  
  // Company Details
  companySize: {
    type: String,
    enum: ['1-50', '51-200', '201-500', '501-1000', '1000+'],
    default: '51-200'
  },
  foundedYear: {
    type: Number
  },
  
  // Job Requirements
  jobRoles: [{
    title: String,
    description: String,
    type: {
      type: String,
      enum: ['Full-time', 'Internship', 'Contract', 'Part-time']
    },
    location: String,
    requiredSkills: [String],
    preferredSkills: [String],
    minCGPA: {
      type: Number,
      default: 0
    },
    minExperience: {
      type: Number,
      default: 0
    },
    eligibleBranches: [{
      type: String,
      enum: ['CSE', 'ECE', 'EEE', 'ME', 'CE', 'ISE', 'ETE', 'BT', 'All']
    }],
    salary: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'INR'
      }
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  
  // Required Skills for the company
  requiredSkills: [{
    type: String,
    trim: true
  }],
  
  // Company Culture & Benefits
  benefits: [{
    type: String
  }],
  culture: {
    type: String,
    maxlength: 500
  },
  
  // Statistics
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  totalApplications: {
    type: Number,
    default: 0
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Partnership details
  partnershipStartDate: {
    type: Date,
    default: Date.now
  },
  
  // Added by admin
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for search
companySchema.index({ name: 'text', description: 'text', industry: 'text' });

const Company = mongoose.model('Company', companySchema);

export default Company;
