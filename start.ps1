# PESin Quick Start Script
# Run this script to start both backend and frontend servers

Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                        ║" -ForegroundColor Cyan
Write-Host "║           🎓 PESin - Starting Application 🎓          ║" -ForegroundColor Cyan
Write-Host "║                                                        ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "🔍 Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check if MongoDB is running
Write-Host "🔍 Checking MongoDB..." -ForegroundColor Yellow
$mongoProcess = Get-Process mongod -ErrorAction SilentlyContinue
if ($mongoProcess) {
    Write-Host "✅ MongoDB is running" -ForegroundColor Green
} else {
    Write-Host "⚠️  MongoDB is not running. Please start MongoDB:" -ForegroundColor Yellow
    Write-Host "   Run: mongod" -ForegroundColor Yellow
    Write-Host ""
    $response = Read-Host "Do you want to continue anyway? (y/n)"
    if ($response -ne 'y') {
        exit 1
    }
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
Write-Host ""

# Install backend dependencies
if (!(Test-Path "backend/node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
    Set-Location backend
    npm install
    Set-Location ..
    Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✅ Backend dependencies already installed" -ForegroundColor Green
}

# Install frontend dependencies
if (!(Test-Path "frontend/node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
    Set-Location frontend
    npm install
    Set-Location ..
    Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✅ Frontend dependencies already installed" -ForegroundColor Green
}

# Create uploads directory
if (!(Test-Path "backend/uploads")) {
    New-Item -ItemType Directory -Path "backend/uploads" | Out-Null
    Write-Host "✅ Created uploads directory" -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 Starting servers..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Backend will run on: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend will run on: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all servers" -ForegroundColor Yellow
Write-Host ""

# Start backend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"

# Wait 3 seconds for backend to start
Start-Sleep -Seconds 3

# Start frontend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "✅ Servers started!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Open your browser and navigate to: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 Quick Guide:" -ForegroundColor Yellow
Write-Host "   1. Visit http://localhost:3000" -ForegroundColor White
Write-Host "   2. Click 'Get Started' to register" -ForegroundColor White
Write-Host "   3. Create an admin account first (role: admin)" -ForegroundColor White
Write-Host "   4. Then create student/alumni accounts" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Enjoy PESin!" -ForegroundColor Green
