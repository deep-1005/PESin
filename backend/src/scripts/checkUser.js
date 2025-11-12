import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const emailToCheck = 'Mail-rahul.sharma@pes.edu';
const plainPassword = 'Password-password123';

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/pesin');
    const user = await User.findOne({ email: emailToCheck.toLowerCase() }).select('+password');
    if (!user) {
      console.log('User not found for email:', emailToCheck);
    } else {
      console.log('User found:');
      console.log('  email:', user.email);
      console.log('  role:', user.role);
      console.log('  isApproved:', user.isApproved);
      console.log('  password (hash):', user.password);
      const match = await bcrypt.compare(plainPassword, user.password);
      console.log('Password compare result:', match);
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

run();
