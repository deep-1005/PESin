# 🎯 Simple Admin Dashboard Guide

## Overview
The Simple Admin Dashboard is a beginner-friendly, single-page interface for administrators to manage the PESin platform. Everything is in ONE file for easy understanding and modification.

## File Location
```
frontend/src/pages/admin/SimpleAdminDashboard.jsx
```

## Features

### 1. **Dashboard Statistics**
- View counts of students, alumni, companies, jobs, and pending approvals
- Color-coded cards for easy visualization

### 2. **User Management** (Tab 1)
- View all pending user registrations
- Approve or reject users with one click
- See user details: name, email, role, USN

### 3. **Company Database** (Tab 2)
- View all registered companies
- Add new companies (name, industry, location)
- Delete companies

### 4. **Internal Job Postings** (Tab 3)
- View all internal job listings
- Post new jobs (TA, Research Assistant, Lab Assistant, etc.)
- Specify title, department, type, description, and stipend
- Delete jobs

## How to Use

### Accessing the Dashboard
1. Login with admin credentials
2. You'll be automatically redirected to: `/admin/simple`

### Managing Users
1. Click on the **"Pending Users"** tab
2. Review user details
3. Click **"Approve"** to accept or **"Reject"** to decline
4. Approved users can now login and use the platform

### Adding Companies
1. Click on the **"Companies"** tab
2. Click **"Add Company"** button
3. Fill in:
   - Company Name (e.g., "Google")
   - Industry (e.g., "Technology")
   - Location (e.g., "Bangalore")
4. Click **"Add Company"**

### Posting Internal Jobs
1. Click on the **"Internal Jobs"** tab
2. Click **"Post Job"** button
3. Fill in:
   - Job Title (e.g., "Python TA")
   - Department (e.g., "Computer Science")
   - Job Type (dropdown):
     - Teaching Assistant
     - Research Assistant
     - Lab Assistant
     - Event Volunteer
     - Department Assistant
   - Description
   - Monthly Stipend (in ₹)
4. Click **"Post Job"**

## Customization Tips

### Change Colors
Find this section in the code (around line 200):
```jsx
<StatCard 
  title="Students" 
  value={stats.totalStudents} 
  icon={<School sx={{ fontSize: 40 }} />}
  color="#667eea"  // Change this color
/>
```

### Add More Job Types
Find the Job Dialog section (around line 540):
```jsx
<option value="Teaching Assistant">Teaching Assistant</option>
<option value="Your New Type">Your New Type</option>
```

### Modify Table Columns
Find the TableHead section for each tab:
```jsx
<TableCell><strong>Your New Column</strong></TableCell>
```

## Quick Reference

### Admin Credentials (for testing)
Create an admin account by registering with:
- **Role**: admin
- **Email**: admin@pes.edu
- **Password**: admin123

### API Endpoints Used
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/pending-users` - Get pending approvals
- `PUT /api/admin/approve-user/:userId` - Approve user
- `DELETE /api/admin/reject-user/:userId` - Reject user
- `GET /api/companies` - Get all companies
- `POST /api/admin/companies` - Add company
- `DELETE /api/admin/companies/:id` - Delete company
- `GET /api/admin/internal-jobs` - Get internal jobs
- `POST /api/admin/internal-jobs` - Create internal job
- `DELETE /api/admin/internal-jobs/:id` - Delete job

## Troubleshooting

### "Cannot read property 'success'" Error
- Check if backend is running (`npm run dev` in backend folder)
- Verify MongoDB is running
- Check browser console for detailed errors

### Empty Tables
- Make sure there's data in the database
- Register some test users
- Check network tab in browser DevTools

### Styling Issues
- Clear browser cache
- Check if Material-UI is installed: `npm install @mui/material @emotion/react @emotion/styled`

## Benefits of Simple UI

✅ **Single File** - Everything in one place, easy to find  
✅ **No Complex Routing** - All tabs in one page  
✅ **Clear Structure** - Organized by features  
✅ **Easy to Modify** - Beginner-friendly code  
✅ **Material-UI** - Professional looking components  
✅ **Responsive** - Works on mobile and desktop  

## Next Steps

1. **Test the Dashboard**: Login as admin and try each feature
2. **Customize**: Change colors, add fields, modify layouts
3. **Expand**: Add more tabs or features as needed
4. **Deploy**: Ready to deploy with the rest of the application

---

**Made with ❤️ for beginners by Team PESin**
