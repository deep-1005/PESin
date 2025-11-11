import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connectDB from './config/db.js';
import rateLimit from 'express-rate-limit';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Initialize express app
const app = express();

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Import routes
import authRoutes from './routes/auth.js';
import studentRoutes from './routes/students.js';
import alumniRoutes from './routes/alumni.js';
import companyRoutes from './routes/companies.js';
import jobRoutes from './routes/jobs.js';
import adminRoutes from './routes/admin.js';

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/admin', adminRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🎓 Welcome to PESin API - College Portfolio and Placement Portal',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      students: '/api/students',
      alumni: '/api/alumni',
      companies: '/api/companies',
      jobs: '/api/jobs',
      admin: '/api/admin'
    }
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║                                                        ║');
  console.log('║           🎓 PESin Server Running Successfully 🎓      ║');
  console.log('║                                                        ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`🚀 Server: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📦 MongoDB: ${process.env.MONGODB_URI}`);
  console.log('');
  console.log('📌 API Endpoints:');
  console.log(`   - Authentication: http://localhost:${PORT}/api/auth`);
  console.log(`   - Students: http://localhost:${PORT}/api/students`);
  console.log(`   - Alumni: http://localhost:${PORT}/api/alumni`);
  console.log(`   - Companies: http://localhost:${PORT}/api/companies`);
  console.log(`   - Jobs: http://localhost:${PORT}/api/jobs`);
  console.log(`   - Admin: http://localhost:${PORT}/api/admin`);
  console.log('');
  console.log('✨ Ready to accept requests!');
  console.log('');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`❌ Error: ${err.message}`);
  // Close server & exit process
  process.exit(1);
});
