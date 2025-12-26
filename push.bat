@echo off
echo ========================================
echo Deva Sea Food - Git Push
echo ========================================
echo.

cd /d "%~dp0"

echo Checking Git installation...
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo Git is installed!
echo.

echo Current status:
git status
echo.

echo Adding all files...
git add .
echo.

set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Update: Deva Sea Food landing page with animations and carousel

echo.
echo Committing changes...
git commit -m "%commit_msg%"
echo.

echo Checking for remote repository...
git remote -v >nul 2>&1
if errorlevel 1 (
    echo.
    echo No remote repository found!
    echo.
    echo Adding remote repository...
        git remote add origin https://github.com/sherwynjoel/Deva-Sea-Food-website.git
        echo Remote added!
    ) else (
        echo Remote repository found.
        for /f "tokens=2" %%i in ('git remote get-url origin 2^>nul') do set CURRENT_REMOTE=%%i
        if not "!CURRENT_REMOTE!"=="https://github.com/sherwynjoel/Deva-Sea-Food-website.git" (
            echo.
            echo Updating remote URL...
            git remote set-url origin https://github.com/sherwynjoel/Deva-Sea-Food-website.git
            echo Remote updated!
        )
    )
    echo.
    echo Remote: https://github.com/sherwynjoel/Deva-Sea-Food-website.git
echo.

echo.
set /p push_confirm="Push to remote repository? (y/n): "
if /i "%push_confirm%"=="y" (
    echo.
    echo Pushing to remote...
    git push origin main 2>nul || git push origin master
    echo.
    echo Done!
) else (
    echo Push cancelled.
)

echo.
pause

