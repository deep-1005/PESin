# LinkedIn Integration Guide (Optional)

This feature allows students to share their posts directly to LinkedIn.

## Setup Steps (Optional)

### 1. Create LinkedIn App
1. Go to https://www.linkedin.com/developers/apps
2. Click "Create app"
3. Fill in required details:
   - App name: PESin
   - LinkedIn Page: (Create one or use existing)
   - App logo: Upload any logo
4. Click "Create app"

### 2. Get Credentials
1. In your app dashboard, go to "Auth" tab
2. Copy your **Client ID** and **Client Secret**
3. Add to `backend/.env`:
   ```
   LINKEDIN_CLIENT_ID=your_client_id_here
   LINKEDIN_CLIENT_SECRET=your_client_secret_here
   LINKEDIN_REDIRECT_URI=http://localhost:5000/api/auth/linkedin/callback
   ```

### 3. Configure Authorized Redirect URLs
1. In LinkedIn app "Auth" tab
2. Add redirect URL: `http://localhost:5000/api/auth/linkedin/callback`
3. Save changes

### 4. Request Permissions
1. Go to "Products" tab
2. Request access to:
   - **Sign In with LinkedIn**
   - **Share on LinkedIn** (requires verification)

## How It Works

### Without LinkedIn Integration
- Students can still create and view posts on the PESin platform
- Posts are stored in MongoDB and visible to all users
- Basic social feed functionality works perfectly

### With LinkedIn Integration
1. Student connects their LinkedIn account (one-time)
2. When creating a post, they can check "Share to LinkedIn"
3. Post is created on PESin AND shared to their LinkedIn profile
4. LinkedIn sharing is optional per post

## Testing Without LinkedIn API

You can fully test the feed feature without LinkedIn credentials:
1. Just don't check the "Share to LinkedIn" checkbox
2. Posts will work normally on the PESin platform
3. Backend gracefully handles missing LinkedIn tokens

## Current Status

✅ **Posts Feature**: Fully functional
✅ **Feed View**: Working
✅ **Create Posts**: Working
⚠️ **LinkedIn Sharing**: Requires API credentials (optional)

## Quick Start (No LinkedIn needed)

1. Login as student
2. Click "Community Feed" on dashboard
3. Write a post and click "Post"
4. See posts from all students
5. (Optional) Check "Share to LinkedIn" if configured
