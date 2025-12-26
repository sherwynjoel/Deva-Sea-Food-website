# Quick Git Push Instructions

## Method 1: Double-click push.bat
Simply double-click the `push.bat` file in your project folder and follow the prompts.

## Method 2: Use Git Bash or Command Prompt

### If Git is installed:

1. **Open Git Bash** (or Command Prompt) in your project folder

2. **Check status:**
   ```bash
   git status
   ```

3. **Add all files:**
   ```bash
   git add .
   ```

4. **Commit:**
   ```bash
   git commit -m "Update: Deva Sea Food landing page with animations and carousel"
   ```

5. **Push:**
   ```bash
   git push origin main
   ```
   (or `git push origin master` if your default branch is master)

### If repository doesn't exist:

1. **Create repository on GitHub** (via web interface)

2. **Add remote:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```

3. **Push:**
   ```bash
   git push -u origin main
   ```

## Method 3: Use VS Code (if installed)

1. Open VS Code in your project folder
2. Click the Source Control icon (left sidebar)
3. Click the "+" to stage all changes
4. Enter commit message
5. Click "✓" to commit
6. Click "..." menu → "Push" to push to remote

## Troubleshooting

- **Git not found**: Install from https://git-scm.com/download/win
- **Authentication error**: You may need to set up credentials or use a personal access token
- **No remote**: Add remote repository first (see Method 2)

