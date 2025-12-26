# Git Push Guide - Deva Sea Food Landing Page

## Prerequisites
1. Make sure Git is installed on your system
2. Have a GitHub/GitLab/Bitbucket account (or any Git hosting service)

## Steps to Push to Git Repository

### Option 1: If repository doesn't exist yet

1. **Initialize Git repository** (if not already initialized):
   ```bash
   git init
   ```

2. **Create a .gitignore file** (to exclude unnecessary files):
   ```
   node_modules/
   .DS_Store
   *.log
   .vscode/
   .idea/
   ```

3. **Add all files**:
   ```bash
   git add .
   ```

4. **Create initial commit**:
   ```bash
   git commit -m "Initial commit: Deva Sea Food landing page with animations and carousel"
   ```

5. **Create repository on GitHub/GitLab** (via web interface)

6. **Add remote repository**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```
   (Replace with your actual repository URL)

7. **Push to repository**:
   ```bash
   git branch -M main
   git push -u origin main
   ```

### Option 2: If repository already exists

1. **Check current status**:
   ```bash
   git status
   ```

2. **Add changed files**:
   ```bash
   git add .
   ```

3. **Commit changes**:
   ```bash
   git commit -m "Update: Added carousel animations and mobile optimizations"
   ```

4. **Push to repository**:
   ```bash
   git push origin main
   ```
   (or `git push origin master` if your default branch is master)

## Recommended Commit Messages

- `"Initial commit: Deva Sea Food landing page"`
- `"Add: Mobile optimizations and responsive design"`
- `"Add: Carousel animations for certifications section"`
- `"Update: Enhanced animations and transitions"`
- `"Fix: Seamless carousel loop and gradient effects"`

## Troubleshooting

### If Git is not recognized:
- Install Git from: https://git-scm.com/download/win
- Restart your terminal/IDE after installation

### If you need to set up Git credentials:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### If you need to force push (use with caution):
```bash
git push -f origin main
```

## Files to Include
- ✅ index.html
- ✅ styles.css
- ✅ main.js
- ✅ package.json
- ✅ All image files (1.jpeg, 2.webp, etc.)
- ✅ logo.png, banner.png
- ✅ build.js
- ✅ README.md

## Files to Exclude (add to .gitignore)
- ❌ node_modules/ (if you add npm packages)
- ❌ .DS_Store
- ❌ *.log files
- ❌ IDE configuration files

