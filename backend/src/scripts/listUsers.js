import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.js';

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/pesin');
    const users = await User.find({}).select('email role isApproved createdAt');
    if (!users || users.length === 0) {
      console.log('No users found');
    } else {
      console.log(`Found ${users.length} users:`);
      users.forEach(u => {
        console.log(`- ${u.email} | role: ${u.role} | approved: ${u.isApproved} | created: ${u.createdAt.toISOString()}`);
      });
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

run();
