@echo off
echo ========================================
echo   HealthInspector - Netlify Deployment
echo ========================================
echo.

echo [1/5] Checking Git status...
git status
echo.

echo [2/5] Adding all files...
git add .
echo.

echo [3/5] Committing changes...
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Configure for Netlify deployment
git commit -m "%commit_msg%"
echo.

echo [4/5] Pushing to GitHub...
git push origin main
echo.

echo [5/5] Deployment Instructions:
echo.
echo ✅ Your code has been pushed to GitHub!
echo.
echo Next steps:
echo 1. Go to https://app.netlify.com/
echo 2. Click "Add new site" - "Import an existing project"
echo 3. Connect your GitHub repository
echo 4. Click "Deploy site"
echo.
echo Your site will be live in ~2-3 minutes!
echo.
echo For local testing with Netlify CLI:
echo   npm install -g netlify-cli
echo   netlify dev
echo.
pause
