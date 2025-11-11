import mongoose from 'mongoose';

// Model for college-specific internal job postings
const internalJobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  category: {
    type: String,
    enum: [
      'Teaching Assistant',
      'Research Assistant',
      'Lab Assistant',
      'Event Volunteer',
      'Department Assistant',
      'Library Assistant',
      'Technical Support',
      'Peer Tutor',
      'Student Mentor',
      'Campus Ambassador',
      'Other'
    ],
    required: true
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    maxlength: 2000
  },
  
  // Department Information
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: ['CSE', 'ECE', 'EEE', 'ME', 'CE', 'ISE', 'ETE', 'BT', 'Library', 'Administration', 'Student Affairs', 'Other']
  },
  
  // Responsibilities
  responsibilities: [{
    type: String
  }],
  
  // Requirements
  eligibilityCriteria: {
    minCGPA: {
      type: Number,
      default: 0,
      min: 0,
      max: 10
    },
    eligibleSemesters: [{
      type: Number,
      min: 1,
      max: 8
    }],
    eligibleBranches: [{
      type: String,
      enum: ['CSE', 'ECE', 'EEE', 'ME', 'CE', 'ISE', 'ETE', 'BT', 'All']
    }],
    requiredSkills: [{
      type: String,
      trim: true
    }],
    preferredSkills: [{
      type: String,
      trim: true
    }]
  },
  
  // Duration and Commitment
  duration: {
    type: String,
    required: true,
    trim: true // e.g., "1 semester", "3 months", "1 year"
  },
  hoursPerWeek: {
    type: Number,
    required: true,
    min: 1
  },
  
  // Compensation/Benefits
  stipend: {
    amount: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'INR'
    },
    frequency: {
      type: String,
      enum: ['Monthly', 'One-time', 'Per Hour', 'None'],
      default: 'Monthly'
    }
  },
  benefits: [{
    type: String // e.g., "Letter of Recommendation", "Certificate", "Experience in Teaching"
  }],
  
  // Application Details
  applicationDeadline: {
    type: Date,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  openings: {
    type: Number,
    default: 1,
    min: 1
  },
  
  // Contact Information
  contactPerson: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: String,
    designation: String
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Visibility - Only students can see internal jobs
  visibleTo: {
    type: String,
    enum: ['students'],
    default: 'students'
  },
  
  // Tracking
  totalApplications: {
    type: Number,
    default: 0
  },
  
  // Posted by admin
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Additional Information
  additionalInfo: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

// Index for search and filtering
internalJobSchema.index({ title: 'text', description: 'text', category: 'text' });
internalJobSchema.index({ department: 1, isActive: 1 });
internalJobSchema.index({ applicationDeadline: 1 });
internalJobSchema.index({ category: 1, isActive: 1 });

const InternalJob = mongoose.model('InternalJob', internalJobSchema);

export default InternalJob;
