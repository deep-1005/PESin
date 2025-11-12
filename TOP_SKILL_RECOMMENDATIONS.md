# Top Skill Company Recommendations Feature

## Overview
This feature allows students to select a **Top Skill** from a dropdown list, and based on that selection, the system will recommend the perfect company match.

## How It Works

### 1. **Top Skill Selection (Student Profile)**
- Navigate to **Student Profile** page
- In the **Skills** section, you'll see a new **Top Skill dropdown**
- Select one skill from the following options:
  - JavaScript
  - HTML and CSS
  - Backend
  - Data Science
  - Node
  - Communication-Soft Skill

### 2. **Company Mapping (Hardcoded)**
The system uses a predefined mapping to match your top skill with the perfect company:

| Top Skill | Recommended Company |
|-----------|-------------------|
| JavaScript | **Google** |
| HTML and CSS | **Airbnb** |
| Backend | **Amazon** |
| Data Science | **Netflix** |
| Node | **PayPal** |
| Communication-Soft Skill | *(No specific company)* |

### 3. **View Recommendation**
- After selecting your top skill and saving your profile
- Navigate to **Company Recommendations** from the dashboard
- You'll see your **PERFECT MATCH** company displayed with:
  - 100% match score
  - Company description and details
  - Contact information
  - Links to career page
  - Why it's your perfect match

## Features Implemented

### Backend Changes
✅ **User Model** (`backend/src/models/user.js`)
- Added `topSkill` field with enum validation for the 6 skills

✅ **Student Controller** (`backend/src/controllers/studentController.js`)
- Updated `updateStudentProfile` to handle `topSkill` field
- Completely rewrote `getCompanyRecommendations` function:
  - Checks if user has selected a top skill
  - Uses hardcoded mapping to find the perfect company
  - Returns 100% match with detailed company information

✅ **Seed Script** (`backend/src/scripts/seedCompanies.js`)
- Created script to add 5 companies to database:
  - Google (Technology)
  - Airbnb (Technology & Hospitality)
  - Amazon (E-Commerce & Cloud Computing)
  - Netflix (Entertainment & Streaming)
  - PayPal (Fintech & Payments)

### Frontend Changes
✅ **Student Profile** (`frontend/src/pages/student/StudentProfile.jsx`)
- Added `topSkill` to profile state
- Added dropdown selector with all 6 skill options
- Beautiful UI with gradient background highlighting the top skill section
- Shows selected top skill as a chip when not editing

✅ **Company Recommendations** (`frontend/src/pages/student/CompanyRecommendations.jsx`)
- Completely redesigned UI for single perfect match display
- Shows "PERFECT MATCH FOR YOUR TOP SKILL" badge
- Displays 100% match score prominently
- Shows detailed company information
- Added "Why This is Your Perfect Match" section
- Contact information and action buttons
- If no top skill selected, shows helpful message with all available mappings

## How to Test

### 1. **Seed the Companies** (Already Done)
```bash
cd backend
node src/scripts/seedCompanies.js
```

### 2. **Login as Student**
- Use any student credentials from the database
- Example: `rahul.sharma@pes.edu` / `password123`

### 3. **Set Your Top Skill**
1. Go to **Student Dashboard**
2. Click **My Profile**
3. Click **Edit Profile** button
4. In the Skills section, find the **Top Skill** dropdown
5. Select one skill (e.g., "JavaScript")
6. Click **Save**

### 4. **View Your Recommendation**
1. Go back to **Student Dashboard**
2. Click **Company Recommendations**
3. You should see Google (if you selected JavaScript) with 100% match

### 5. **Try Different Skills**
- Change your top skill in profile to "Data Science" → See Netflix
- Change to "Backend" → See Amazon
- Change to "HTML and CSS" → See Airbnb
- Change to "Node" → See PayPal

## Technical Details

### API Endpoint
```
GET /api/students/recommendations
Authorization: Bearer <token>
```

**Response Format:**
```json
{
  "success": true,
  "count": 1,
  "data": [{
    "company": {
      "_id": "...",
      "name": "Google",
      "industry": "Technology",
      "location": "Bangalore, India",
      "description": "...",
      "website": "https://www.google.com/careers",
      "contactEmail": "careers@google.com",
      "contactPhone": "+91-80-12345678"
    },
    "matchPercentage": 100,
    "matchedSkills": ["JavaScript"],
    "missingSkills": [],
    "reason": "Perfect match for your top skill: JavaScript"
  }]
}
```

## User Flow
```
1. Student Profile
   ↓
2. Select Top Skill from dropdown (e.g., "JavaScript")
   ↓
3. Save Profile
   ↓
4. Navigate to Company Recommendations
   ↓
5. See Google as PERFECT MATCH (100%)
   ↓
6. View company details, career page, contact info
```

## Design Features

### Visual Highlights
- 🎯 Perfect match badge with green gradient
- ✅ 100% match score prominently displayed
- 🌟 Top skill highlighted in green chip
- 📍 Location, contact, and website information
- ✨ "Why This is Your Perfect Match" explanation box
- 🔗 Direct links to company career pages

### User Experience
- Clear instructions if top skill not selected
- Shows all available skill-to-company mappings in alert
- Single, focused recommendation (not overwhelming)
- Easy to understand match reasoning
- Direct action buttons (View Opportunities, Save for Later)

## Files Modified/Created

### Created:
- `backend/src/scripts/seedCompanies.js` - Company seeding script

### Modified:
- `backend/src/models/user.js` - Added topSkill field
- `backend/src/controllers/studentController.js` - Updated profile controller & recommendations logic
- `frontend/src/pages/student/StudentProfile.jsx` - Added top skill dropdown
- `frontend/src/pages/student/CompanyRecommendations.jsx` - Redesigned UI for single perfect match

## Future Enhancements
- Add more companies to the mapping
- Allow multiple company recommendations
- Add "Communication-Soft Skill" mapping to a company
- Save favorite companies
- Apply directly from recommendations page
- Track which recommendations students view/apply to
