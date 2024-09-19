# Chrome Note taker

A simple note taker chrome extension app built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui.

## Features

- Chrome extension boilerplate
- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- shadcn/ui for UI components
- ESLint configuration for code quality

## Getting Started

1. Clone the repository
2. Install dependencies: `yarn install`
3. Start development server: `yarn dev`
4. Build the extension: `yarn build`
5. Test the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions`
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked"
   - Select the `dist` folder from your project directory
   - The extension should now be installed and visible in your Chrome toolbar

## Available Scripts

- `yarn dev`: Start development server
- `yarn build`: Build for production
- `yarn lint`: Run ESLint

## Development

This project uses Vite for building the Chrome extension. The `manifest.json` and other extension-specific files are located in the `public` directory.

## UI Components

We use [shadcn/ui](https://ui.shadcn.com/) for UI components. These are built on top of [Radix UI](https://www.radix-ui.com/) and styled with Tailwind CSS.

## Learn More

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [React Documentation](https://reactjs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)