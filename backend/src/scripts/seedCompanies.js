import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Company from '../models/company.js';

dotenv.config();

const companies = [
  {
    name: 'Google',
    industry: 'Technology',
    location: 'Bangalore, India',
    website: 'https://www.google.com/careers',
    description: 'Google is a leading technology company specializing in internet services and products, including search, cloud computing, software, and hardware.',
    hiringSkills: ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Machine Learning', 'Cloud Computing'],
    contactEmail: 'careers@google.com',
    contactPhone: '+91-80-12345678',
    isActive: true
  },
  {
    name: 'Airbnb',
    industry: 'Technology & Hospitality',
    location: 'Bangalore, India',
    website: 'https://careers.airbnb.com',
    description: 'Airbnb is a global platform connecting hosts and travelers. We build innovative web and mobile experiences for millions of users worldwide.',
    hiringSkills: ['HTML and CSS', 'JavaScript', 'React', 'UI/UX Design', 'Frontend Development', 'TypeScript'],
    contactEmail: 'careers@airbnb.com',
    contactPhone: '+91-80-23456789',
    isActive: true
  },
  {
    name: 'Amazon',
    industry: 'E-Commerce & Cloud Computing',
    location: 'Bangalore, India',
    website: 'https://www.amazon.jobs',
    description: 'Amazon is the world\'s largest online retailer and cloud services provider (AWS). We innovate in e-commerce, cloud infrastructure, AI, and logistics.',
    hiringSkills: ['Backend', 'Java', 'Python', 'AWS', 'Distributed Systems', 'Microservices', 'Node.js'],
    contactEmail: 'careers@amazon.com',
    contactPhone: '+91-80-34567890',
    isActive: true
  },
  {
    name: 'Netflix',
    industry: 'Entertainment & Streaming',
    location: 'Bangalore, India',
    website: 'https://jobs.netflix.com',
    description: 'Netflix is the world\'s leading streaming entertainment service. We use data science and machine learning to personalize content for 200M+ subscribers.',
    hiringSkills: ['Data Science', 'Machine Learning', 'Python', 'R', 'Big Data', 'Analytics', 'AI', 'TensorFlow'],
    contactEmail: 'careers@netflix.com',
    contactPhone: '+91-80-45678901',
    isActive: true
  },
  {
    name: 'PayPal',
    industry: 'Fintech & Payments',
    location: 'Bangalore, India',
    website: 'https://www.paypal.com/careers',
    description: 'PayPal is a global leader in digital payments. We build secure, scalable backend systems to process billions of transactions worldwide.',
    hiringSkills: ['Node', 'Node.js', 'Backend Development', 'JavaScript', 'Express', 'MongoDB', 'REST API', 'Microservices'],
    contactEmail: 'careers@paypal.com',
    contactPhone: '+91-80-56789012',
    isActive: true
  }
];

const seedCompanies = async () => {
  try {
    console.log('🌱 Starting company seeding...\n');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pesin');
    console.log('✅ Connected to MongoDB\n');

    // Delete existing companies with these names
    console.log('🗑️  Removing existing companies...');
    await Company.deleteMany({ 
      name: { $in: ['Google', 'Airbnb', 'Amazon', 'Netflix', 'PayPal'] } 
    });
    console.log('✅ Existing companies removed\n');

    // Insert new companies
    console.log('🏢 Creating companies...');
    const createdCompanies = await Company.insertMany(companies);
    console.log(`✅ Created ${createdCompanies.length} companies\n`);

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✨ Company seeding completed successfully! ✨');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('📊 Companies Added:');
    createdCompanies.forEach((company, index) => {
      console.log(`   ${index + 1}. ${company.name} (${company.industry})`);
      console.log(`      Skills: ${company.hiringSkills ? company.hiringSkills.join(', ') : 'N/A'}`);
      console.log(`      Location: ${company.location || 'N/A'}\n`);
    });

    console.log('🎯 Top Skill to Company Mapping:');
    console.log('   JavaScript → Google');
    console.log('   HTML and CSS → Airbnb');
    console.log('   Backend → Amazon');
    console.log('   Data Science → Netflix');
    console.log('   Node → PayPal\n');

    mongoose.connection.close();
    console.log('✅ Database connection closed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding companies:', error);
    process.exit(1);
  }
};

seedCompanies();
