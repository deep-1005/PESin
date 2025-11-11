import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    maxlength: 2000
  },
  
  // Job Details
  type: {
    type: String,
    enum: ['Full-time', 'Internship', 'Contract', 'Part-time'],
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  workMode: {
    type: String,
    enum: ['On-site', 'Remote', 'Hybrid'],
    default: 'On-site'
  },
  
  // Requirements
  requiredSkills: [{
    type: String,
    trim: true
  }],
  preferredSkills: [{
    type: String,
    trim: true
  }],
  minCGPA: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  minExperience: {
    type: Number,
    default: 0,
    min: 0
  },
  eligibleBranches: [{
    type: String,
    enum: ['CSE', 'ECE', 'EEE', 'ME', 'CE', 'ISE', 'ETE', 'BT', 'All']
  }],
  eligibleSemesters: [{
    type: Number,
    min: 1,
    max: 8
  }],
  
  // Compensation
  salary: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  
  // Responsibilities
  responsibilities: [{
    type: String
  }],
  
  // Benefits
  benefits: [{
    type: String
  }],
  
  // Application Details
  applicationDeadline: {
    type: Date,
    required: true
  },
  openings: {
    type: Number,
    default: 1,
    min: 1
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Tracking
  totalApplications: {
    type: Number,
    default: 0
  },
  
  // Posted by admin
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for search and filtering
jobSchema.index({ title: 'text', description: 'text' });
jobSchema.index({ company: 1, isActive: 1 });
jobSchema.index({ applicationDeadline: 1 });

const Job = mongoose.model('Job', jobSchema);

export default Job;
