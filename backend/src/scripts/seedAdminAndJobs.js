import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import InternalJob from '../models/internalJob.js';

dotenv.config();

const seedAdminAndJobs = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pesin');
    console.log('MongoDB connected for seeding...');

    // Create Admin User (store plaintext here so model's pre-save will hash it)
    const adminPlainPassword = 'admin123';

    const adminUser = {
      firstName: 'Admin',
      lastName: 'Portal',
      email: 'admin@pesin.edu',
      password: adminPlainPassword,
      role: 'admin',
      isApproved: true,
      contactNumber: '+91-9876543210',
      department: 'Administration'
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@pesin.edu' });
    let adminId;

    if (!existingAdmin) {
      const newAdmin = await User.create(adminUser);
      adminId = newAdmin._id;
      console.log('✅ Admin user created successfully');
      console.log('   Email: admin@pesin.edu');
      console.log('   Password: admin123');
    } else {
      // Update password for existing admin to ensure it's correctly hashed (avoid double-hash issues)
      existingAdmin.password = adminPlainPassword;
      await existingAdmin.save();
      adminId = existingAdmin._id;
      console.log('ℹ️  Admin user already exists; password reset to admin123');
    }

    // Create Internal Job Postings
    const internalJobs = [
      // TA Positions for DSA
      {
        title: 'Teaching Assistant - Data Structures & Algorithms (1st Sem)',
        category: 'Teaching Assistant',
        description: 'Assist professors in conducting DSA lab sessions, help students with programming assignments, grade assignments, and conduct doubt clearing sessions for 1st semester CSE students.',
        department: 'CSE',
        responsibilities: [
          'Conduct weekly lab sessions and assist students with DSA concepts',
          'Grade programming assignments and lab reports',
          'Hold office hours for student doubt clarification',
          'Prepare lab materials and example code',
          'Monitor student progress and provide feedback'
        ],
        eligibilityCriteria: {
          minCGPA: 8.0,
          eligibleSemesters: [3, 5, 7],
          eligibleBranches: ['CSE', 'ISE'],
          requiredSkills: ['Data Structures', 'Algorithms', 'C++', 'Java', 'Problem Solving'],
          preferredSkills: ['Teaching Experience', 'Competitive Programming', 'Python']
        },
        duration: '1 semester',
        hoursPerWeek: 8,
        stipend: {
          amount: 5000,
          currency: 'INR',
          frequency: 'Monthly'
        },
        benefits: [
          'Certificate of Teaching Assistantship',
          'Letter of Recommendation',
          'Teaching experience for resume',
          'Direct interaction with faculty'
        ],
        openings: 3,
        applicationDeadline: new Date('2025-12-01'),
        startDate: new Date('2026-01-05'),
        contactPerson: {
          name: 'Dr. Ramesh Kumar',
          email: 'ramesh.kumar@pesin.edu',
          phone: '+91-9876543211'
        },
        isActive: true,
        postedBy: adminId
      },
      {
        title: 'Teaching Assistant - Data Structures & Algorithms (3rd Sem)',
        category: 'Teaching Assistant',
        description: 'Assist in advanced DSA topics including trees, graphs, dynamic programming, and algorithm optimization for 3rd semester students.',
        department: 'CSE',
        responsibilities: [
          'Assist in teaching advanced DSA topics',
          'Prepare problem sets and test cases',
          'Conduct competitive programming practice sessions',
          'Evaluate assignments and projects',
          'Mentor students for coding competitions'
        ],
        eligibilityCriteria: {
          minCGPA: 8.5,
          eligibleSemesters: [5, 7],
          eligibleBranches: ['CSE', 'ISE'],
          requiredSkills: ['Advanced Data Structures', 'Graph Algorithms', 'Dynamic Programming', 'C++', 'Java'],
          preferredSkills: ['Competitive Programming', 'CodeChef/Codeforces Rating', 'Leetcode']
        },
        duration: '1 semester',
        hoursPerWeek: 10,
        stipend: {
          amount: 6000,
          currency: 'INR',
          frequency: 'Monthly'
        },
        benefits: [
          'Certificate of Teaching Assistantship',
          'Letter of Recommendation',
          'Priority for Research Opportunities',
          'Free access to online coding platforms'
        ],
        openings: 2,
        applicationDeadline: new Date('2025-12-01'),
        startDate: new Date('2026-01-05'),
        contactPerson: {
          name: 'Dr. Priya Sharma',
          email: 'priya.sharma@pesin.edu',
          phone: '+91-9876543212'
        },
        isActive: true,
        postedBy: adminId
      },
      {
        title: 'Teaching Assistant - Advanced Algorithms (5th Sem)',
        category: 'Teaching Assistant',
        description: 'Support faculty in teaching advanced algorithm design, analysis, and optimization techniques for 5th semester CSE students.',
        department: 'CSE',
        responsibilities: [
          'Assist in lectures on advanced algorithmic paradigms',
          'Guide students in research-oriented algorithm projects',
          'Evaluate complex algorithm implementations',
          'Prepare study materials and reference guides',
          'Organize algorithm design workshops'
        ],
        eligibilityCriteria: {
          minCGPA: 9.0,
          eligibleSemesters: [7],
          eligibleBranches: ['CSE', 'ISE'],
          requiredSkills: ['Algorithm Design', 'Complexity Analysis', 'Advanced Data Structures', 'Research Skills'],
          preferredSkills: ['Published Papers', 'Research Experience', 'ACM ICPC Participation']
        },
        duration: '1 semester',
        hoursPerWeek: 12,
        stipend: {
          amount: 7000,
          currency: 'INR',
          frequency: 'Monthly'
        },
        benefits: [
          'Certificate of Teaching Assistantship',
          'Strong Letter of Recommendation',
          'Research collaboration opportunities',
          'Conference attendance support'
        ],
        openings: 2,
        applicationDeadline: new Date('2025-12-01'),
        startDate: new Date('2026-01-05'),
        contactPerson: {
          name: 'Dr. Anil Verma',
          email: 'anil.verma@pesin.edu',
          phone: '+91-9876543213'
        },
        isActive: true,
        postedBy: adminId
      },
      // JOEL Lab Internship
      {
        title: 'Research Intern - JOEL Lab (Joy of Engineering Lab)',
        category: 'Research Assistant',
        description: 'Immediate opening for motivated students to work on cutting-edge open-source projects in AI/ML, IoT, and Web Technologies at JOEL Lab (Joy of Engineering Lab). This is a hands-on research internship with real-world project exposure.',
        department: 'CSE',
        responsibilities: [
          'Contribute to ongoing open-source research projects',
          'Develop and test AI/ML models and applications',
          'Work on IoT sensor integration and data collection',
          'Build web applications for research data visualization',
          'Document research findings and write technical reports',
          'Collaborate with PhD students and faculty researchers',
          'Present findings at weekly lab meetings'
        ],
        eligibilityCriteria: {
          minCGPA: 7.5,
          eligibleSemesters: [3, 5, 7],
          eligibleBranches: ['CSE', 'ISE', 'ECE', 'ETE'],
          requiredSkills: ['Python', 'Git/GitHub', 'Linux', 'Programming Fundamentals'],
          preferredSkills: [
            'Machine Learning',
            'Deep Learning',
            'TensorFlow/PyTorch',
            'React/Node.js',
            'IoT/Raspberry Pi',
            'Docker',
            'Previous research experience'
          ]
        },
        duration: '6 months (extendable)',
        hoursPerWeek: 15,
        stipend: {
          amount: 8000,
          currency: 'INR',
          frequency: 'Monthly'
        },
        benefits: [
          'Work on published research papers',
          'Co-authorship opportunities on publications',
          'Certificate of Research Internship',
          'Strong Letter of Recommendation',
          'Access to high-performance computing resources',
          'Conference presentation opportunities',
          'Networking with industry partners',
          'Priority for MS/PhD recommendations'
        ],
        openings: 5,
        applicationDeadline: new Date('2025-11-25'),
        startDate: new Date('2025-11-28'),
        contactPerson: {
          name: 'Dr. Joel Sebastian',
          email: 'joel.sebastian@pesin.edu',
          phone: '+91-9876543214'
        },
        isActive: true,
        postedBy: adminId,
        additionalInfo: 'Interview and technical test required. Please prepare a project portfolio showcasing your work in AI/ML or IoT.'
      }
    ];

    // Clear existing internal jobs (optional - comment out if you want to keep existing)
    await InternalJob.deleteMany({});
    console.log('🗑️  Cleared existing internal jobs');

    // Insert new jobs
    const createdJobs = await InternalJob.insertMany(internalJobs);
    console.log(`✅ Created ${createdJobs.length} internal job postings:`);
    createdJobs.forEach((job, index) => {
      console.log(`   ${index + 1}. ${job.title} (${job.category})`);
    });

    console.log('\n📊 Database Seeding Summary:');
    console.log('================================');
    console.log('✅ Admin User: admin@pesin.edu (password: admin123)');
    console.log('✅ TA Positions: 3 (DSA 1st, 3rd, 5th semester)');
    console.log('✅ JOEL Lab Internship: 1 (Recruiting NOW - Deadline: Nov 25, 2025)');
    console.log('================================');
    
    mongoose.connection.close();
    console.log('\n✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedAdminAndJobs();
