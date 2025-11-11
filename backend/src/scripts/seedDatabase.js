import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import Company from '../models/company.js';
import Job from '../models/job.js';

dotenv.config();

const companies = [
  {
    name: 'Google',
    industry: 'Technology',
    location: 'Bangalore, India',
    website: 'https://www.google.com/careers',
    description: 'Leading technology company specializing in internet services and products',
    hiringSkills: ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Machine Learning'],
    contactEmail: 'careers@google.com',
    contactPhone: '+91-80-12345678'
  },
  {
    name: 'Microsoft',
    industry: 'Technology',
    location: 'Hyderabad, India',
    website: 'https://careers.microsoft.com',
    description: 'Global technology company developing software, hardware, and cloud services',
    hiringSkills: ['C#', 'Azure', 'Python', 'React', 'Machine Learning', 'Cloud Computing'],
    contactEmail: 'careers@microsoft.com',
    contactPhone: '+91-40-98765432'
  },
  {
    name: 'Amazon',
    industry: 'E-Commerce & Cloud',
    location: 'Bangalore, India',
    website: 'https://www.amazon.jobs',
    description: 'E-commerce and cloud computing company',
    hiringSkills: ['Java', 'Python', 'AWS', 'Distributed Systems', 'React', 'Node.js'],
    contactEmail: 'careers@amazon.com',
    contactPhone: '+91-80-23456789'
  },
  {
    name: 'Infosys',
    industry: 'IT Services',
    location: 'Bangalore, India',
    website: 'https://www.infosys.com/careers',
    description: 'Global leader in consulting, technology and outsourcing solutions',
    hiringSkills: ['Java', 'Python', 'SAP', 'Cloud Computing', 'Data Analytics'],
    contactEmail: 'careers@infosys.com',
    contactPhone: '+91-80-34567890'
  },
  {
    name: 'TCS',
    industry: 'IT Services',
    location: 'Mumbai, India',
    website: 'https://www.tcs.com/careers',
    description: 'IT services, consulting and business solutions organization',
    hiringSkills: ['Java', 'Python', 'React', 'Angular', 'Cloud Computing'],
    contactEmail: 'careers@tcs.com',
    contactPhone: '+91-22-45678901'
  },
  {
    name: 'Flipkart',
    industry: 'E-Commerce',
    location: 'Bangalore, India',
    website: 'https://www.flipkartcareers.com',
    description: 'Leading e-commerce marketplace in India',
    hiringSkills: ['Python', 'Java', 'React', 'Node.js', 'MongoDB', 'Microservices'],
    contactEmail: 'careers@flipkart.com',
    contactPhone: '+91-80-56789012'
  },
  {
    name: 'Adobe',
    industry: 'Software',
    location: 'Bangalore, India',
    website: 'https://www.adobe.com/careers',
    description: 'Global leader in digital media and marketing solutions',
    hiringSkills: ['JavaScript', 'React', 'UI/UX Design', 'Python', 'Machine Learning'],
    contactEmail: 'careers@adobe.com',
    contactPhone: '+91-80-67890123'
  },
  {
    name: 'Walmart Labs',
    industry: 'Retail Technology',
    location: 'Bangalore, India',
    website: 'https://careers.walmart.com',
    description: 'Technology arm of Walmart focused on e-commerce innovation',
    hiringSkills: ['Java', 'React', 'Node.js', 'Kubernetes', 'Microservices'],
    contactEmail: 'careers@walmartlabs.com',
    contactPhone: '+91-80-78901234'
  }
];

const students = [
  {
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: 'rahul.sharma@pes.edu',
    password: 'password123',
    role: 'student',
    usn: 'PES1UG21CS001',
    branch: 'CSE',
    semester: 8,
    phone: '+91-9876543210',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'],
    bio: 'Full-stack developer passionate about building scalable web applications',
    currentStatus: 'alumni',
    graduationYear: 2024,
    topSkill: 'JavaScript',
    targetCompany: 'Google'
  },
  {
    firstName: 'Priya',
    lastName: 'Reddy',
    email: 'priya.reddy@pes.edu',
    password: 'password123',
    role: 'student',
    usn: 'PES1UG21CS002',
    branch: 'CSE',
    semester: 6,
    phone: '+91-9876543211',
    skills: ['Python', 'Machine Learning', 'Data Science', 'TensorFlow', 'Pandas'],
    bio: 'AI/ML enthusiast working on computer vision projects',
    currentStatus: 'current',
    graduationYear: 2025,
    topSkill: 'Python',
    targetCompany: 'Microsoft'
  },
  {
    firstName: 'Arjun',
    lastName: 'Patel',
    email: 'arjun.patel@pes.edu',
    password: 'password123',
    role: 'student',
    usn: 'PES1UG21CS003',
    branch: 'CSE',
    semester: 8,
    phone: '+91-9876543212',
    skills: ['Java', 'Spring Boot', 'Microservices', 'Kubernetes', 'Docker'],
    bio: 'Backend developer specializing in microservices architecture',
    currentStatus: 'alumni',
    graduationYear: 2024,
    topSkill: 'Java',
    targetCompany: 'Amazon'
  },
  {
    firstName: 'Sneha',
    lastName: 'Kumar',
    email: 'sneha.kumar@pes.edu',
    password: 'password123',
    role: 'student',
    usn: 'PES1UG22CS004',
    branch: 'CSE',
    semester: 4,
    phone: '+91-9876543213',
    skills: ['React', 'JavaScript', 'TypeScript', 'UI/UX Design', 'Figma'],
    bio: 'Frontend developer with a keen eye for design',
    currentStatus: 'current',
    graduationYear: 2026,
    topSkill: 'React',
    targetCompany: 'Adobe'
  },
  {
    firstName: 'Vikram',
    lastName: 'Singh',
    email: 'vikram.singh@pes.edu',
    password: 'password123',
    role: 'student',
    usn: 'PES1UG21ECE005',
    branch: 'ECE',
    semester: 8,
    phone: '+91-9876543214',
    skills: ['Python', 'Data Analytics', 'SQL', 'Power BI', 'Tableau'],
    bio: 'Data analyst passionate about deriving insights from data',
    currentStatus: 'alumni',
    graduationYear: 2024,
    topSkill: 'Python',
    targetCompany: 'Infosys'
  },
  {
    firstName: 'Ananya',
    lastName: 'Iyer',
    email: 'ananya.iyer@pes.edu',
    password: 'password123',
    role: 'student',
    usn: 'PES1UG22CS006',
    branch: 'CSE',
    semester: 5,
    phone: '+91-9876543215',
    skills: ['Node.js', 'Express', 'MongoDB', 'REST API', 'GraphQL'],
    bio: 'Backend specialist focused on API development',
    currentStatus: 'current',
    graduationYear: 2026,
    topSkill: 'Node.js',
    targetCompany: 'Google'
  },
  {
    firstName: 'Karthik',
    lastName: 'Nair',
    email: 'karthik.nair@pes.edu',
    password: 'password123',
    role: 'student',
    usn: 'PES1UG21ISE007',
    branch: 'ISE',
    semester: 8,
    phone: '+91-9876543216',
    skills: ['AWS', 'Cloud Computing', 'DevOps', 'Terraform', 'Jenkins'],
    bio: 'Cloud engineer with expertise in AWS services',
    currentStatus: 'alumni',
    graduationYear: 2024,
    topSkill: 'AWS',
    targetCompany: 'Amazon'
  },
  {
    firstName: 'Divya',
    lastName: 'Menon',
    email: 'divya.menon@pes.edu',
    password: 'password123',
    role: 'student',
    usn: 'PES1UG22CS008',
    branch: 'CSE',
    semester: 6,
    phone: '+91-9876543217',
    skills: ['Java', 'Spring Framework', 'Hibernate', 'MySQL', 'REST API'],
    bio: 'Java developer experienced in enterprise applications',
    currentStatus: 'current',
    graduationYear: 2025,
    topSkill: 'Java',
    targetCompany: 'TCS'
  },
  {
    firstName: 'Rohan',
    lastName: 'Gupta',
    email: 'rohan.gupta@pes.edu',
    password: 'password123',
    role: 'student',
    usn: 'PES1UG21CS009',
    branch: 'CSE',
    semester: 8,
    phone: '+91-9876543218',
    skills: ['Python', 'Django', 'Flask', 'PostgreSQL', 'Redis'],
    bio: 'Python web developer building robust applications',
    currentStatus: 'alumni',
    graduationYear: 2024,
    topSkill: 'Python',
    targetCompany: 'Flipkart'
  },
  {
    firstName: 'Meera',
    lastName: 'Joshi',
    email: 'meera.joshi@pes.edu',
    password: 'password123',
    role: 'student',
    usn: 'PES1UG22ECE010',
    branch: 'ECE',
    semester: 4,
    phone: '+91-9876543219',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux'],
    bio: 'Modern web developer using latest technologies',
    currentStatus: 'current',
    graduationYear: 2026,
    topSkill: 'React',
    targetCompany: 'Adobe'
  },
  {
    firstName: 'Aditya',
    lastName: 'Rao',
    email: 'aditya.rao@pes.edu',
    password: 'password123',
    role: 'student',
    usn: 'PES1UG21CS011',
    branch: 'CSE',
    semester: 8,
    phone: '+91-9876543220',
    skills: ['Machine Learning', 'Deep Learning', 'PyTorch', 'Computer Vision', 'NLP'],
    bio: 'AI researcher working on cutting-edge ML models',
    currentStatus: 'alumni',
    graduationYear: 2024,
    topSkill: 'Machine Learning',
    targetCompany: 'Google'
  },
  {
    firstName: 'Kavya',
    lastName: 'Bhat',
    email: 'kavya.bhat@pes.edu',
    password: 'password123',
    role: 'student',
    usn: 'PES1UG22ISE012',
    branch: 'ISE',
    semester: 5,
    phone: '+91-9876543221',
    skills: ['Angular', 'TypeScript', 'RxJS', 'Material UI', 'JavaScript'],
    bio: 'Frontend developer specializing in Angular framework',
    currentStatus: 'current',
    graduationYear: 2026,
    topSkill: 'Angular',
    targetCompany: 'TCS'
  },
  {
    firstName: 'Siddharth',
    lastName: 'Pillai',
    email: 'siddharth.pillai@pes.edu',
    password: 'password123',
    role: 'student',
    usn: 'PES1UG21CS013',
    branch: 'CSE',
    semester: 8,
    phone: '+91-9876543222',
    skills: ['Kubernetes', 'Docker', 'Microservices', 'Go', 'Prometheus'],
    bio: 'DevOps engineer passionate about container orchestration',
    currentStatus: 'alumni',
    graduationYear: 2024,
    topSkill: 'Kubernetes',
    targetCompany: 'Walmart Labs'
  },
  {
    firstName: 'Ishita',
    lastName: 'Desai',
    email: 'ishita.desai@pes.edu',
    password: 'password123',
    role: 'student',
    usn: 'PES1UG22CS014',
    branch: 'CSE',
    semester: 6,
    phone: '+91-9876543223',
    skills: ['C#', 'Azure', '.NET Core', 'SQL Server', 'Entity Framework'],
    bio: 'Microsoft stack developer building enterprise solutions',
    currentStatus: 'current',
    graduationYear: 2025,
    topSkill: 'Azure',
    targetCompany: 'Microsoft'
  },
  {
    firstName: 'Varun',
    lastName: 'Hegde',
    email: 'varun.hegde@pes.edu',
    password: 'password123',
    role: 'student',
    usn: 'PES1UG21EEE015',
    branch: 'EEE',
    semester: 8,
    phone: '+91-9876543224',
    skills: ['SAP', 'ERP', 'Business Analytics', 'SQL', 'Project Management'],
    bio: 'SAP consultant with expertise in ERP systems',
    currentStatus: 'alumni',
    graduationYear: 2024,
    topSkill: 'SAP',
    targetCompany: 'Infosys'
  },
  {
    firstName: 'Nidhi',
    lastName: 'Kamath',
    email: 'nidhi.kamath@pes.edu',
    password: 'password123',
    role: 'student',
    usn: 'PES1UG22CS016',
    branch: 'CSE',
    semester: 4,
    phone: '+91-9876543225',
    skills: ['MongoDB', 'Express', 'React', 'Node.js', 'GraphQL'],
    bio: 'MERN stack developer creating modern web apps',
    currentStatus: 'current',
    graduationYear: 2026,
    topSkill: 'MongoDB',
    targetCompany: 'Flipkart'
  },
  {
    firstName: 'Abhishek',
    lastName: 'Shetty',
    email: 'abhishek.shetty@pes.edu',
    password: 'password123',
    role: 'student',
    usn: 'PES1UG21CS017',
    branch: 'CSE',
    semester: 8,
    phone: '+91-9876543226',
    skills: ['Distributed Systems', 'System Design', 'Redis', 'Kafka', 'Cassandra'],
    bio: 'Systems architect designing scalable distributed systems',
    currentStatus: 'alumni',
    graduationYear: 2024,
    topSkill: 'Distributed Systems',
    targetCompany: 'Amazon'
  },
  {
    firstName: 'Pooja',
    lastName: 'Kulkarni',
    email: 'pooja.kulkarni@pes.edu',
    password: 'password123',
    role: 'student',
    usn: 'PES1UG22ISE018',
    branch: 'ISE',
    semester: 5,
    phone: '+91-9876543227',
    skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    bio: 'UX designer focused on creating delightful user experiences',
    currentStatus: 'current',
    graduationYear: 2026,
    topSkill: 'UI/UX Design',
    targetCompany: 'Adobe'
  },
  {
    firstName: 'Nikhil',
    lastName: 'Verma',
    email: 'nikhil.verma@pes.edu',
    password: 'password123',
    role: 'student',
    usn: 'PES1UG21CS019',
    branch: 'CSE',
    semester: 8,
    phone: '+91-9876543228',
    skills: ['Cloud Computing', 'AWS', 'Lambda', 'Serverless', 'API Gateway'],
    bio: 'Cloud solutions architect specializing in serverless',
    currentStatus: 'alumni',
    graduationYear: 2024,
    topSkill: 'Cloud Computing',
    targetCompany: 'Microsoft'
  },
  {
    firstName: 'Riya',
    lastName: 'Agarwal',
    email: 'riya.agarwal@pes.edu',
    password: 'password123',
    role: 'student',
    usn: 'PES1UG22CS020',
    branch: 'CSE',
    semester: 6,
    phone: '+91-9876543229',
    skills: ['Microservices', 'Spring Boot', 'Docker', 'Jenkins', 'Git'],
    bio: 'Backend engineer building microservices architecture',
    currentStatus: 'current',
    graduationYear: 2025,
    topSkill: 'Microservices',
    targetCompany: 'Walmart Labs'
  }
];

const jobs = [
  {
    title: 'Software Engineer - Frontend',
    company: 'Google',
    description: 'Build next-generation web applications using React and modern JavaScript',
    requiredSkills: ['JavaScript', 'React', 'TypeScript'],
    location: 'Bangalore, India',
    salary: {
      min: 1500000,
      max: 2000000,
      currency: 'INR'
    },
    type: 'Full-time',
    workMode: 'Hybrid',
    eligibleBranches: ['CSE', 'ISE'],
    eligibleSemesters: [7, 8],
    applicationDeadline: new Date('2025-12-31'),
    openings: 5
  },
  {
    title: 'Machine Learning Engineer',
    company: 'Microsoft',
    description: 'Develop AI/ML solutions for cloud services',
    requiredSkills: ['Python', 'Machine Learning', 'Azure'],
    location: 'Hyderabad, India',
    salary: {
      min: 1800000,
      max: 2500000,
      currency: 'INR'
    },
    type: 'Full-time',
    workMode: 'On-site',
    eligibleBranches: ['CSE', 'ISE', 'ECE'],
    eligibleSemesters: [7, 8],
    applicationDeadline: new Date('2025-12-31'),
    openings: 3
  },
  {
    title: 'Backend Developer',
    company: 'Amazon',
    description: 'Design and develop scalable microservices',
    requiredSkills: ['Java', 'AWS', 'Distributed Systems'],
    location: 'Bangalore, India',
    salary: {
      min: 1600000,
      max: 2200000,
      currency: 'INR'
    },
    type: 'Full-time',
    workMode: 'On-site',
    eligibleBranches: ['CSE', 'ISE'],
    eligibleSemesters: [7, 8],
    applicationDeadline: new Date('2025-12-31'),
    openings: 4
  },
  {
    title: 'Data Analyst',
    company: 'Infosys',
    description: 'Analyze data and provide business insights',
    requiredSkills: ['Python', 'SQL', 'Data Analytics'],
    location: 'Bangalore, India',
    salary: {
      min: 600000,
      max: 1000000,
      currency: 'INR'
    },
    type: 'Full-time',
    workMode: 'Hybrid',
    eligibleBranches: ['CSE', 'ISE', 'ECE', 'EEE'],
    eligibleSemesters: [7, 8],
    applicationDeadline: new Date('2025-12-31'),
    openings: 10
  },
  {
    title: 'Full Stack Developer',
    company: 'TCS',
    description: 'Work on end-to-end web application development',
    requiredSkills: ['Java', 'React', 'Spring Boot'],
    location: 'Mumbai, India',
    salary: {
      min: 500000,
      max: 800000,
      currency: 'INR'
    },
    type: 'Full-time',
    workMode: 'On-site',
    eligibleBranches: ['CSE', 'ISE', 'ECE'],
    eligibleSemesters: [7, 8],
    applicationDeadline: new Date('2025-12-31'),
    openings: 15
  },
  {
    title: 'Python Developer',
    company: 'Flipkart',
    description: 'Build e-commerce backend services',
    requiredSkills: ['Python', 'MongoDB', 'Microservices'],
    location: 'Bangalore, India',
    salary: {
      min: 1200000,
      max: 1800000,
      currency: 'INR'
    },
    type: 'Full-time',
    workMode: 'Hybrid',
    eligibleBranches: ['CSE', 'ISE'],
    eligibleSemesters: [7, 8],
    applicationDeadline: new Date('2025-12-31'),
    openings: 6
  },
  {
    title: 'UI/UX Designer',
    company: 'Adobe',
    description: 'Design intuitive user interfaces for creative tools',
    requiredSkills: ['UI/UX Design', 'Figma', 'React'],
    location: 'Bangalore, India',
    salary: {
      min: 1000000,
      max: 1500000,
      currency: 'INR'
    },
    type: 'Full-time',
    workMode: 'Hybrid',
    eligibleBranches: ['CSE', 'ISE'],
    eligibleSemesters: [7, 8],
    applicationDeadline: new Date('2025-12-31'),
    openings: 2
  },
  {
    title: 'DevOps Engineer',
    company: 'Walmart Labs',
    description: 'Manage infrastructure and deployment pipelines',
    requiredSkills: ['Kubernetes', 'Docker', 'Microservices'],
    location: 'Bangalore, India',
    salary: {
      min: 1400000,
      max: 2000000,
      currency: 'INR'
    },
    type: 'Full-time',
    workMode: 'On-site',
    eligibleBranches: ['CSE', 'ISE', 'ECE'],
    eligibleSemesters: [7, 8],
    applicationDeadline: new Date('2025-12-31'),
    openings: 3
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({ role: 'student' });
    await Company.deleteMany({});
    await Job.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Create companies
    console.log('🏢 Creating companies...');
    const createdCompanies = await Company.insertMany(companies);
    console.log(`✅ Created ${createdCompanies.length} companies\n`);

    // Create students with hashed passwords
    console.log('👨‍🎓 Creating students...');
    const hashedStudents = await Promise.all(
      students.map(async (student) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(student.password, salt);
        return {
          ...student,
          password: hashedPassword,
          isApproved: true
        };
      })
    );
    const createdStudents = await User.insertMany(hashedStudents);
    console.log(`✅ Created ${createdStudents.length} students\n`);

    // Create jobs with company references
    console.log('💼 Creating jobs...');
    const jobsWithCompanyId = jobs.map(job => {
      const company = createdCompanies.find(c => c.name === job.company);
      return {
        ...job,
        company: company._id,
        postedBy: company._id
      };
    });
    const createdJobs = await Job.insertMany(jobsWithCompanyId);
    console.log(`✅ Created ${createdJobs.length} jobs\n`);

    // Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✨ Database seeding completed successfully! ✨');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('📊 Summary:');
    console.log(`   👨‍🎓 Students: ${createdStudents.length}`);
    console.log(`      - Alumni: ${createdStudents.filter(s => s.currentStatus === 'alumni').length}`);
    console.log(`      - Current: ${createdStudents.filter(s => s.currentStatus === 'current').length}`);
    console.log(`   🏢 Companies: ${createdCompanies.length}`);
    console.log(`   💼 Jobs: ${createdJobs.length}\n`);

    console.log('🔑 Login Credentials:');
    console.log('   Email: <any student email from list>');
    console.log('   Password: password123\n');

    console.log('📋 Sample Students:');
    createdStudents.slice(0, 5).forEach(student => {
      console.log(`   • ${student.firstName} ${student.lastName} (${student.email})`);
      console.log(`     Status: ${student.currentStatus}, Skills: ${student.skills.slice(0, 3).join(', ')}`);
      console.log(`     Target Company: ${student.targetCompany}\n`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
