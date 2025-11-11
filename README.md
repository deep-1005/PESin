# 🎓 PESin - College Portfolio and Placement Portal

**A Professional Web Platform for PES University Students**

## 👥 Team Members
- **Diya R Gowda** - PES1UG24CS159, CSE 'C'
- **Deeptha S** - PES1UG24CS144, CSE 'C'
- **Epari Subhransi** - PES1UG24CS161, CSE 'C'

---

## 📋 Project Overview

PESin is a comprehensive full-stack web application designed exclusively for PES University students to create professional portfolios, connect with companies, network with alumni, and access college-specific job opportunities.

### ✨ Key Features

#### 🎓 For Students
- **Digital Portfolio Builder** - Create professional portfolios with skills, projects, certifications
- **Smart Company Recommendations** - AI-powered matching based on your skillset
- **Resume Management** - Upload and manage your resume
- **Job Applications** - Apply to external companies and internal college opportunities
- **Alumni Network** - Connect with alumni working in target companies
- **Application Tracking** - Track status (Applied/Shortlisted/Selected/Rejected)
- **Internal Job Listings** - View college-exclusive opportunities (TA, Research, etc.)

#### 👔 For Alumni
- **Profile Management** - Showcase your career journey
- **Mentorship** - Guide students and provide career advice
- **Company Insights** - Share experiences from your workplace
- **Networking** - Connect with current students

#### 👨‍💼 For Administrators
- **User Management** - Approve/manage students, alumni accounts
- **Company Database** - Add and manage 20+ partner companies
- **Job Posting** - Create external and internal job opportunities
- **Internal Job Management** - Post TA, Research, Volunteer roles
- **Application Tracking** - Monitor and update application statuses
- **Analytics Dashboard** - View placement statistics and insights

---

## 🏗️ Technology Stack

### Backend
- **Node.js** & **Express.js** - Server and API
- **MongoDB** & **Mongoose** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Express Validator** - Input validation

### Frontend
- **React 18** - UI Library
- **Material-UI (MUI)** - Component Library
- **Framer Motion** - Animations
- **React Router v6** - Routing
- **Axios** - HTTP Client
- **React Toastify** - Notifications
- **Vite** - Build Tool

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- Git

### Step 1: Clone the Repository
```powershell
git clone <your-repo-url>
cd pesin
```

### Step 2: Backend Setup

```powershell
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (already created)
# The .env file contains:
# - PORT=5000
# - MONGODB_URI=mongodb://localhost:27017/pesin
# - JWT_SECRET=pesin_super_secret_jwt_key_2025_pes_university
# - JWT_EXPIRE=7d
# - CLIENT_URL=http://localhost:3000

# Start MongoDB (if not running)
# Make sure MongoDB is installed and running on your system

# Start the backend server
npm run dev
```

The backend server will start on **http://localhost:5000**

### Step 3: Frontend Setup

Open a new terminal:

```powershell
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on **http://localhost:3000**

---

## 📁 Project Structure

```
pesin/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # Database connection
│   │   ├── controllers/
│   │   │   ├── authController.js     # Authentication logic
│   │   │   ├── studentController.js  # Student operations
│   │   │   ├── alumniController.js   # Alumni operations
│   │   │   ├── adminController.js    # Admin operations
│   │   │   ├── companyController.js  # Company operations
│   │   │   └── jobController.js      # Job operations
│   │   ├── middleware/
│   │   │   ├── auth.js               # JWT authentication
│   │   │   └── roles.js              # Role-based access control
│   │   ├── models/
│   │   │   ├── user.js               # User schema (Student/Alumni/Admin)
│   │   │   ├── company.js            # Company schema
│   │   │   ├── job.js                # External job schema
│   │   │   ├── internalJob.js        # Internal job schema
│   │   │   └── application.js        # Application schema
│   │   ├── routes/
│   │   │   ├── auth.js               # Auth routes
│   │   │   ├── students.js           # Student routes
│   │   │   ├── alumni.js             # Alumni routes
│   │   │   ├── admin.js              # Admin routes
│   │   │   ├── companies.js          # Company routes
│   │   │   └── jobs.js               # Job routes
│   │   ├── utils/
│   │   │   ├── fileUpload.js         # File upload configuration
│   │   │   └── matchingAlgorithm.js  # Skill matching algorithm
│   │   └── server.js                 # Entry point
│   ├── uploads/                      # Uploaded files
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.jsx       # Auth state management
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx       # Landing page
│   │   │   ├── LoginPage.jsx         # Login page
│   │   │   ├── RegisterPage.jsx      # Registration page
│   │   │   ├── student/              # Student pages
│   │   │   ├── alumni/               # Alumni pages
│   │   │   └── admin/                # Admin pages
│   │   ├── App.jsx                   # Main app component
│   │   ├── main.jsx                  # Entry point
│   │   └── index.css                 # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🎨 Design Features

### Modern & Professional UI
- ✨ Gradient backgrounds and glass morphism effects
- 🎭 Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🎨 Material Design components
- ⚡ Fast and optimized performance
- 🌈 Beautiful color scheme (Purple & Blue gradients)
- 💫 Hover effects and transitions
- 🎯 Intuitive user experience

---

## 🔐 User Roles & Permissions

### Student
- Create and manage portfolio
- Upload resume
- View company recommendations
- Apply for jobs
- View internal college jobs
- Track application status
- Connect with alumni

### Alumni
- Manage professional profile
- Share career experiences
- Mentor students
- View alumni directory

### Admin
- Approve/reject user registrations
- Manage companies and jobs
- Create internal job postings
- Update application statuses
- View analytics and statistics

---

## 📊 Key Functionalities

### 1. Skill-Based Matching Algorithm
Intelligent algorithm that matches student skills with company requirements:
- Calculates match percentage
- Shows matched and missing skills
- Recommends top companies based on skills
- Provides skill suggestions by branch

### 2. Internal Job System
College-exclusive job postings:
- Teaching Assistant positions
- Research Assistant roles
- Lab Assistant opportunities
- Event Volunteer positions
- Department Assistant roles
- Only visible to students
- Managed by admin

### 3. Application Tracking
Complete application lifecycle management:
- Applied → Under Review → Shortlisted → Interview → Selected/Rejected
- Interview scheduling
- Feedback system
- Status history tracking

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatepassword` - Update password

### Students
- `GET /api/students/profile` - Get profile
- `PUT /api/students/profile` - Update profile
- `POST /api/students/resume` - Upload resume
- `GET /api/students/recommendations` - Get company recommendations
- `GET /api/students/applications` - Get applications
- `POST /api/students/apply/:jobId` - Apply for job

### Alumni
- `GET /api/alumni` - Get all alumni
- `GET /api/alumni/by-company/:companyName` - Get alumni by company
- `PUT /api/alumni/profile` - Update alumni profile

### Admin
- `GET /api/admin/pending-users` - Get pending approvals
- `PUT /api/admin/approve-user/:userId` - Approve user
- `POST /api/admin/internal-jobs` - Create internal job
- `GET /api/admin/stats` - Get dashboard statistics

### Companies
- `GET /api/companies` - Get all companies
- `GET /api/companies/jobs/all` - Get all jobs

### Jobs
- `GET /api/jobs/internal` - Get internal jobs (Students only)
- `POST /api/jobs/internal/:id/apply` - Apply for internal job

---

## 🎯 Default Admin Account

For testing, create an admin account by registering with role "admin":

```json
{
  "email": "admin@pes.edu",
  "password": "admin123",
  "role": "admin",
  "firstName": "Admin",
  "lastName": "User"
}
```

---

## 🧪 Testing the Application

### 1. Start MongoDB
```powershell
# Make sure MongoDB is running
mongod
```

### 2. Start Backend
```powershell
cd backend
npm run dev
```

### 3. Start Frontend
```powershell
cd frontend
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## 🌟 Screenshots

### Landing Page
Beautiful gradient hero section with animations, feature showcase, and statistics.

### Student Dashboard
Portfolio builder, company recommendations, internal jobs, and application tracking.

### Admin Dashboard
User management, company database, internal job posting, and analytics.

---

## 🚀 Future Enhancements

- [ ] Email notifications for application updates
- [ ] Chat system for student-alumni communication
- [ ] Video profile introductions
- [ ] Company reviews and ratings
- [ ] Interview preparation resources
- [ ] Resume builder with templates
- [ ] Mobile application
- [ ] Advanced analytics and reports

---

## 📝 License

This project is created for educational purposes as part of CSE curriculum at PES University.

---

## 🤝 Contributing

This is a college project. For any questions or suggestions, please contact the team members.

---

## 📞 Contact

For queries, reach out to:
- Diya R Gowda - PES1UG24CS159
- Deeptha S - PES1UG24CS144
- Epari Subhransi - PES1UG24CS161

---

**Made with ❤️ by Team PESin**
