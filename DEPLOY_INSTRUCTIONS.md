# Deploying to realmitratushar.github.io

Since you are deploying to your **User Page** (`https://realmitratushar.github.io`), the setup is slightly different from a project page.

## Prerequisites
- You already have the `deploy` script and `gh-pages` package installed (I did this earlier).
- Your `vite.config.js` is already configured for root domain deployment (I just updated this).

## Step-by-Step Instructions

1.  **Create the Repository**
    - Go to GitHub and create a new **public** repository named exactly: `realmitratushar.github.io`
    - **Do not** initialize it with a README, .gitignore, or license.

2.  **Initialize and Push Source Code**
    Open your terminal in this project folder (`sprint 4`) and run these commands one by one:

    ```powershell
    # Initialize git
    git init

    # Add all files
    git add .

    # Commit
    git commit -m "Initial portfolio commit"

    # Rename branch to main
    git branch -M main

    # Link to your repository
    git remote add origin https://github.com/realmitratushar/realmitratushar.github.io.git

    # Push source code to main branch
    git push -u origin main
    ```

3.  **Deploy the Site**
    Now, run the deploy script to build the project and push the `dist` folder to a `gh-pages` branch:

    ```powershell
    npm run deploy
    ```

    *Input `y` if asked to install `gh-pages` (though it should be installed locally already).*

4.  **Configure GitHub Pages Settings**
    - Go to your repository on GitHub: `https://github.com/realmitratushar/realmitratushar.github.io`
    - Click on **Settings** > **Pages** (in the left sidebar).
    - Under **Build and deployment** > **Source**, select **Deploy from a branch**.
    - under **Branch**, select **gh-pages** and folder **/(root)**.
    - Click **Save**.

5.  **Verify**
    - Wait a minute or two.
    - Visit [https://realmitratushar.github.io/](https://realmitratushar.github.io/)
