# Professional Portfolio Website

A modern, responsive, and performance-optimized personal website built with **React**, **Vite**, and **Tailwind CSS**.

## Features

- 🎨 **Modern Design**: Clean, minimal, and mobile-first.
- 🌙 **Dark/Light Mode**: Persisted theme preferences.
- 🚀 **Fast Performance**: Optimized with Vite, Code-splitting, and lazy loading.
- ♿ **Accessible**: Semantic HTML, ARIA attributes, and keyboard navigation.
- 📱 **Responsive**: Perfect on Mobile, Tablet, and Desktop.
- 🛠 **Easy Customization**: Centralized content file.

## Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + PostCSS
- **Animations**: Framer Motion
- **Icons**: React Icons (FontAwesome, Material, etc.)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1.  Clone the repository (or extract the zip):
    ```bash
    git clone <your-repo-url>
    cd sprint-4
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## Customization

To personalize the website, edit `src/data/content.js`. This file contains all the text, links, and data used across the site.

- **Personal Info**: Update `personalInfo` object.
- **Skills**: Update `skills` arrays.
- **Projects**: Update `projects` array.
- **Experience**: Update `experience` array.
- **Research**: Update `research` array.

### Changing the Color Theme

The primary color is set in `tailwind.config.js` under `theme.extend.colors.primary`. You can change the hex codes there to your preferred color palette.

## Deployment

### GitHub Pages

1.  Update `vite.config.js` with your base URL (if needed):
    ```js
    export default defineConfig({
      base: '/your-repo-name/',
      plugins: [react()],
    })
    ```
2.  Run build:
    ```bash
    npm run build
    ```
3.  Deploy the `dist` folder.

### Netlify / Vercel

1.  Connect your GitHub repository.
2.  Set Build Command: `npm run build`
3.  Set Output Directory: `dist`
4.  Deploy!

## License

MIT
