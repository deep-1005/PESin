import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.js';

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/pesin');
    const user = await User.findOne({ email: 'admin@pesin.edu' }).select('+password');
    if (!user) {
      console.log('Admin not found');
    } else {
      console.log('Admin record:');
      console.log('email:', user.email);
      console.log('password (hash):', user.password);
      console.log('isApproved:', user.isApproved);
      console.log('role:', user.role);
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

run();
