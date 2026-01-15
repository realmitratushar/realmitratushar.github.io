# How to Deploy to GitHub Pages

I have pre-installed the `gh-pages` tool and configured the scripts for you. Follow these steps to deploy:

1.  **Create a GitHub Repository**
    - Go to GitHub and create a new public repository.
    - Do not initialize with README/gitignore (you already have them).

2.  **Push your code**
    Run these commands in your terminal:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git push -u origin main
    ```

3.  **Configure Vite (Important!)**
    - Open `vite.config.js`.
    - Uncomment the `base` line and replace `'repo-name'` with your actual repository name.
    - Example: If your repo is `my-portfolio`, it should look like:
      ```js
      base: '/my-portfolio/',
      ```

4.  **Deploy**
    Run this single command:
    ```bash
    npm run deploy
    ```
    - This will build your project and push it to a `gh-pages` branch on GitHub.

5.  **Finish**
    - Go to your GitHub Repository Settings -> Pages.
    - Ensure the source is set to `gh-pages` branch.
    - Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`.
