import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  // Common fields for all users
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['student', 'alumni', 'admin', 'company'],
    required: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  
  // Personal Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  profilePicture: {
    type: String,
    default: null
  },
  
  // Student/Alumni specific fields
  usn: {
    type: String,
    sparse: true,
    uppercase: true,
    trim: true
  },
  branch: {
    type: String,
    enum: ['CSE', 'ECE', 'EEE', 'ME', 'CE', 'ISE', 'ETE', 'BT'],
    trim: true
  },
  semester: {
    type: Number,
    min: 1,
    max: 8
  },
  cgpa: {
    type: Number,
    min: 0,
    max: 10
  },
  batch: {
    type: String,
    trim: true
  },
  
  // Student Portfolio fields
  bio: {
    type: String,
    maxlength: 500
  },
  skills: [{
    type: String,
    trim: true
  }],
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    link: String,
    startDate: Date,
    endDate: Date
  }],
  certifications: [{
    name: String,
    issuer: String,
    issueDate: Date,
    credentialId: String,
    link: String
  }],
  achievements: [{
    title: String,
    description: String,
    date: Date
  }],
  resumeUrl: {
    type: String
  },
  
  // Social Links
  linkedIn: {
    type: String,
    trim: true
  },
  github: {
    type: String,
    trim: true
  },
  portfolio: {
    type: String,
    trim: true
  },
  
  // Alumni specific fields
  currentCompany: {
    type: String,
    trim: true
  },
  designation: {
    type: String,
    trim: true
  },
  yearsOfExperience: {
    type: Number,
    min: 0
  },
  expertise: [{
    type: String,
    trim: true
  }],
  willingToMentor: {
    type: Boolean,
    default: true
  },
  
  // Admin specific fields
  adminLevel: {
    type: String,
    enum: ['super', 'placement_officer', 'moderator'],
    default: 'moderator'
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get public profile
userSchema.methods.getPublicProfile = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtuals are included in JSON
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

const User = mongoose.model('User', userSchema);

export default User;
