# Git Push Script for Deva Sea Food Landing Page
# Run this script in PowerShell from the project directory

Write-Host "=== Deva Sea Food - Git Push Script ===" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "✓ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Current directory: $(Get-Location)" -ForegroundColor Gray
Write-Host ""

# Check if git repository is initialized
if (Test-Path .git) {
    Write-Host "✓ Git repository is initialized" -ForegroundColor Green
} else {
    Write-Host "! Git repository not initialized. Initializing..." -ForegroundColor Yellow
    git init
    Write-Host "✓ Repository initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "Checking git status..." -ForegroundColor Cyan
git status

Write-Host ""
$response = Read-Host "Do you want to add all files and commit? (y/n)"
if ($response -eq "y" -or $response -eq "Y") {
    Write-Host ""
    Write-Host "Adding all files..." -ForegroundColor Cyan
    git add .
    
    Write-Host ""
    $commitMessage = Read-Host "Enter commit message (or press Enter for default)"
    if ([string]::IsNullOrWhiteSpace($commitMessage)) {
        $commitMessage = "Update: Deva Sea Food landing page with animations and carousel"
    }
    
    Write-Host ""
    Write-Host "Committing changes..." -ForegroundColor Cyan
    git commit -m $commitMessage
    
    Write-Host ""
    Write-Host "✓ Changes committed successfully!" -ForegroundColor Green
    Write-Host ""
    
    $pushResponse = Read-Host "Do you want to push to remote repository? (y/n)"
    if ($pushResponse -eq "y" -or $pushResponse -eq "Y") {
        Write-Host ""
        Write-Host "Checking for remote repository..." -ForegroundColor Cyan
        $remote = git remote -v
        
        if ($remote) {
            Write-Host "Found remote: $remote" -ForegroundColor Green
            Write-Host ""
            Write-Host "Pushing to remote..." -ForegroundColor Cyan
            git push origin main
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✓ Successfully pushed to remote repository!" -ForegroundColor Green
            } else {
                Write-Host "! Push failed. Trying 'master' branch..." -ForegroundColor Yellow
                git push origin master
            }
        } else {
            Write-Host "! No remote repository configured." -ForegroundColor Yellow
            Write-Host ""
            Write-Host "To add a remote repository, run:" -ForegroundColor Cyan
            Write-Host "  git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git" -ForegroundColor White
            Write-Host ""
            Write-Host "Then push with:" -ForegroundColor Cyan
            Write-Host "  git push -u origin main" -ForegroundColor White
        }
    }
} else {
    Write-Host ""
    Write-Host "Operation cancelled." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Done ===" -ForegroundColor Cyan

