#!/bin/bash
# Git Push Script for Deva Sea Food Website
# Run this in Git Bash or Terminal

echo "=========================================="
echo "Pushing to GitHub Repository"
echo "Repository: https://github.com/sherwynjoel/Deva-Sea-Food-website"
echo "=========================================="
echo ""

# Navigate to project directory
cd "$(dirname "$0")"
echo "Current directory: $(pwd)"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "ERROR: Git is not installed!"
    echo "Please install Git from: https://git-scm.com/download/win"
    exit 1
fi

echo "✓ Git is installed"
echo ""

# Check if .git exists
if [ ! -d ".git" ]; then
    echo "Initializing Git repository..."
    git init
    echo "✓ Repository initialized"
    echo ""
fi

# Check current remote
echo "Checking remote configuration..."
REMOTE_URL=$(git remote get-url origin 2>/dev/null)

if [ -z "$REMOTE_URL" ]; then
    echo "No remote configured. Adding remote..."
    git remote add origin https://github.com/sherwynjoel/Deva-Sea-Food-landing-page-website.git
    echo "✓ Remote added: https://github.com/sherwynjoel/Deva-Sea-Food-landing-page-website.git"
else
    echo "Current remote: $REMOTE_URL"
    # Update if different
    if [ "$REMOTE_URL" != "https://github.com/sherwynjoel/Deva-Sea-Food-landing-page-website.git" ]; then
        echo "Updating remote URL..."
        git remote set-url origin https://github.com/sherwynjoel/Deva-Sea-Food-landing-page-website.git
        echo "✓ Remote updated"
    fi
fi
echo ""

# Check status
echo "Current git status:"
git status
echo ""

# Add all files
echo "Adding all files..."
git add .
echo "✓ Files staged"
echo ""

# Commit
COMMIT_MSG="Update: Added carousel animations, mobile optimizations, and enhanced UI"
echo "Committing changes..."
echo "Commit message: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"
echo "✓ Changes committed"
echo ""

# Determine branch name
BRANCH=$(git branch --show-current 2>/dev/null || echo "main")
if [ -z "$BRANCH" ] || [ "$BRANCH" = "" ]; then
    BRANCH="main"
    git branch -M main 2>/dev/null || true
fi

echo "Current branch: $BRANCH"
echo ""

# Push to repository
echo "Pushing to GitHub..."
echo "Repository: https://github.com/sherwynjoel/Deva-Sea-Food-landing-page-website"
echo "Branch: $BRANCH"
echo ""

git push -u origin $BRANCH

if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo "✓ Successfully pushed to GitHub!"
    echo "=========================================="
    echo ""
    echo "View your repository at:"
    echo "https://github.com/sherwynjoel/Deva-Sea-Food-landing-page-website"
    echo ""
else
    echo ""
    echo "=========================================="
    echo "Push failed. Possible reasons:"
    echo "1. Authentication required (use GitHub CLI or SSH keys)"
    echo "2. Branch name mismatch (try: git push -u origin main)"
    echo "3. Network issues"
    echo "=========================================="
    echo ""
    echo "If authentication is needed, you may need to:"
    echo "1. Use GitHub CLI: gh auth login"
    echo "2. Or set up SSH keys"
    echo "3. Or use a personal access token"
    echo ""
fi

