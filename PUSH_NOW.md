# Push to GitHub - Quick Commands

## Repository: https://github.com/sherwynjoel/Deva-Sea-Food-website

### Copy and paste these commands in Git Bash:

```bash
cd "c:\Users\Sherwyn joel\OneDrive\Desktop\Deva Sea Food landing page"

# Set remote repository
git remote set-url origin https://github.com/sherwynjoel/Deva-Sea-Food-website.git

# Or if remote doesn't exist:
git remote add origin https://github.com/sherwynjoel/Deva-Sea-Food-website.git

# Check status
git status

# Add all files
git add .

# Commit changes
git commit -m "Update: Added carousel animations, mobile optimizations, and enhanced UI with seamless infinite loop"

# Push to GitHub
git push -u origin main
```

### If you get "branch main doesn't exist", try:
```bash
git branch -M main
git push -u origin main
```

### Or if your branch is master:
```bash
git push -u origin master
```

### If authentication is required:
- Use GitHub Desktop (easiest)
- Or GitHub CLI: `gh auth login`
- Or use a personal access token

