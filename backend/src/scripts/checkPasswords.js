import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const emails = ['user1@gmail.com','admin1@gmail.com','user2@gmail.com','admin@pesin.edu'];
const candidates = ['password123','admin123','Password-password123','password1234'];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/pesin');
    for (const email of emails) {
      const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
      if (!user) {
        console.log(`${email}: NOT FOUND`);
        continue;
      }
      console.log(`\n${email}: found (role=${user.role})`);
      for (const p of candidates) {
        const match = await bcrypt.compare(p, user.password);
        console.log(`  test '${p}': ${match}`);
        if (match) {
          console.log(`  ==> Plaintext password is: ${p}`);
          break;
        }
      }
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
