import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: false
  },
  internalJob: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InternalJob',
    required: false
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: false
  },
  
  // Application Type
  applicationType: {
    type: String,
    enum: ['external', 'internal'],
    required: true
  },
  
  // Application Details
  coverLetter: {
    type: String,
    maxlength: 2000
  },
  resumeUrl: {
    type: String
  },
  
  // Status
  status: {
    type: String,
    enum: ['Applied', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Selected', 'Rejected', 'Withdrawn'],
    default: 'Applied'
  },
  
  // Interview Details
  interviewDetails: {
    date: Date,
    time: String,
    mode: {
      type: String,
      enum: ['Online', 'Offline', 'Phone']
    },
    location: String,
    meetingLink: String,
    notes: String
  },
  
  // Feedback
  feedback: {
    type: String,
    maxlength: 1000
  },
  
  // Timeline
  statusHistory: [{
    status: String,
    date: {
      type: Date,
      default: Date.now
    },
    notes: String,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  
  // Offer Details (if selected)
  offerDetails: {
    package: Number,
    joiningDate: Date,
    location: String,
    offerLetterUrl: String
  }
}, {
  timestamps: true
});

// Compound index for unique applications
applicationSchema.index({ student: 1, job: 1 }, { unique: true, sparse: true });
applicationSchema.index({ student: 1, internalJob: 1 }, { unique: true, sparse: true });

// Index for querying
applicationSchema.index({ student: 1, status: 1 });
applicationSchema.index({ job: 1, status: 1 });
applicationSchema.index({ internalJob: 1, status: 1 });

const Application = mongoose.model('Application', applicationSchema);

export default Application;
