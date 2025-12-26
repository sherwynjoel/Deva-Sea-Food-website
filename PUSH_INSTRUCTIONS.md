# Push to GitHub Repository

## Repository URL
**https://github.com/sherwynjoel/Deva-Sea-Food-website**

## Quick Push Methods

### Method 1: Using Git Bash (Recommended)

1. **Open Git Bash** in your project folder
2. **Run the script:**
   ```bash
   bash push-to-github.sh
   ```

### Method 2: Manual Commands in Git Bash

```bash
# Navigate to project directory
cd "c:\Users\Sherwyn joel\OneDrive\Desktop\Deva Sea Food landing page"

# Check/Set remote
git remote -v
# If remote doesn't exist or is wrong:
git remote set-url origin https://github.com/sherwynjoel/Deva-Sea-Food-website.git
# Or add it:
git remote add origin https://github.com/sherwynjoel/Deva-Sea-Food-website.git

# Add all files
git add .

# Commit
git commit -m "Update: Added carousel animations, mobile optimizations, and enhanced UI"

# Push
git push -u origin main
# OR if your branch is master:
git push -u origin master
```

### Method 3: Using VS Code

1. Open VS Code in your project folder
2. Click **Source Control** icon (left sidebar)
3. Click **"+"** to stage all changes
4. Enter commit message: `"Update: Added carousel animations, mobile optimizations, and enhanced UI"`
5. Click **"✓"** to commit
6. Click **"..."** menu → **"Push"** → **"Push to..."** → Select `origin/main`

### Method 4: Using GitHub Desktop

1. Open GitHub Desktop
2. File → Add Local Repository
3. Select your project folder
4. Add commit message
5. Click "Commit to main"
6. Click "Push origin"

## Authentication

If you get authentication errors:

### Option A: GitHub CLI
```bash
gh auth login
```

### Option B: Personal Access Token
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` permissions
3. Use token as password when pushing

### Option C: SSH Keys
1. Generate SSH key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
2. Add to GitHub: Settings → SSH and GPG keys → New SSH key

## Troubleshooting

### "Remote already exists"
```bash
git remote set-url origin https://github.com/sherwynjoel/Deva-Sea-Food-website.git
```

### "Branch name mismatch"
```bash
git branch -M main
git push -u origin main
```

### "Authentication failed"
- Use GitHub CLI: `gh auth login`
- Or set up SSH keys
- Or use personal access token

### "Nothing to commit"
Your changes are already committed. Just push:
```bash
git push origin main
```

## Files to Push

✅ All your updated files:
- index.html (with carousel)
- styles.css (with animations)
- main.js (with carousel logic)
- All images and assets
- package.json
- README.md

## After Pushing

Your code will be available at:
**https://github.com/sherwynjoel/Deva-Sea-Food-website**

You can also set up GitHub Pages for live hosting:
1. Go to repository Settings → Pages
2. Select `main` branch
3. Your site will be live at: `https://sherwynjoel.github.io/Deva-Sea-Food-website/`

