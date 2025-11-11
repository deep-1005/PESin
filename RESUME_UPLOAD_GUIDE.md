# Resume Upload Guide for Students

## 📄 How to Upload Your Resume

### Step 1: Login to Your Student Account
1. Go to http://localhost:3000
2. Login with your student credentials
   - Example: `rahul.sharma@pes.edu` / `password123`

### Step 2: Navigate to Your Profile
1. From the Student Dashboard, click on **"My Profile"**
2. You'll see your profile page with all your information

### Step 3: Upload Your Resume
1. Scroll down to the **"Resume"** section
2. Click on the **"Upload Resume"** button (orange button with upload icon)
3. Select your resume file (Supported formats: `.pdf`, `.doc`, `.docx`)
4. Wait for the upload to complete
5. You'll see a success message: ✅ "Resume uploaded successfully!"

### Step 4: View Your Uploaded Resume
1. After uploading, you'll see a **"View Resume"** button
2. Click it to open your resume in a new tab
3. You can also **"Update Resume"** anytime to replace it with a new version

## 📋 File Requirements
- **Supported Formats**: PDF, DOC, DOCX
- **Maximum File Size**: 5 MB
- **Recommended**: Use PDF format for best compatibility

## ✨ Features
- ✅ Upload resume directly from your profile
- ✅ View uploaded resume anytime
- ✅ Update/replace resume whenever needed
- ✅ Resume is visible to recruiters and companies
- ✅ Automatic file validation

## 🎯 Tips
1. **Use a professional filename**: e.g., `Rahul_Sharma_Resume.pdf`
2. **Keep it updated**: Upload your latest resume before applying for jobs
3. **Single page recommended**: Most recruiters prefer 1-2 page resumes
4. **Include contact info**: Make sure your resume has email and phone number

## 🔧 Troubleshooting

### Error: "Failed to upload resume"
- **Check file size**: Must be under 5 MB
- **Check file format**: Only PDF, DOC, DOCX allowed
- **Try again**: Refresh page and retry upload

### Resume not showing after upload
- **Refresh the page**: Press F5 or reload browser
- **Check browser console**: Look for any error messages
- **Contact admin**: If issue persists

## 📁 Where is my resume stored?
Your resume is securely stored on the server at:
```
backend/uploads/your-resume-filename.pdf
```

## 🌐 Access Your Resume
Your resume URL will be:
```
http://localhost:5000/uploads/your-resume-filename.pdf
```

## 🚀 Quick Start Example

```javascript
// Student uploads resume flow:
1. Login → rahul.sharma@pes.edu
2. Click "My Profile" 
3. Scroll to Resume section
4. Click "Upload Resume"
5. Select file: Rahul_Sharma_Resume.pdf
6. Success! ✅
7. Click "View Resume" to verify
```

---

**Need Help?** Contact your placement coordinator or admin.
