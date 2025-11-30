# Financial System - Electron Desktop Application

## Overview
The Financial System is now available as a cross-platform desktop application built with Electron, React, and Vite.

## Development

### Prerequisites
- Node.js 20.x or higher
- npm 11.x or higher

### Running in Development Mode

```bash
# Start the Electron app in development mode
npm run electron:dev
```

This will:
1. Start the Vite development server on `http://localhost:5173`
2. Launch the Electron app
3. Enable hot reload for both React and Electron
4. Open DevTools automatically

### Web Development Mode (Browser)

```bash
# Run in browser (original mode)
npm run dev
```

## Building for Production

### Build the Application

```bash
# Build for current platform
npm run electron:build
```

### Create Distributable Packages

```bash
# Build for all platforms (Windows, Mac, Linux)
npm run electron:dist
```

Or build for specific platforms:

```bash
# Windows only
npx electron-builder --win

# macOS only
npx electron-builder --mac

# Linux only
npx electron-builder --linux
```

## Distribution

After running `npm run electron:dist`, you'll find the installers in the `release/` directory:

### Windows
- **NSIS Installer**: `Financial System Setup x.x.x.exe` - Full installer with options
- **Portable**: `Financial System x.x.x.exe` - Standalone executable

### macOS
- **DMG**: `Financial System-x.x.x.dmg` - Disk image for installation
- **ZIP**: `Financial System-x.x.x-mac.zip` - Compressed app bundle

### Linux
- **AppImage**: `Financial System-x.x.x.AppImage` - Universal Linux package
- **DEB**: `financial-system_x.x.x_amd64.deb` - Debian/Ubuntu package

## Project Structure

```
financial-frontend/
├── electron/
│   ├── main.js       # Electron main process
│   └── preload.js    # Preload script for security
├── src/              # React application source
├── dist/             # Vite build output
├── release/          # Electron-builder output
├── build/            # Build resources (icons)
└── electron-builder.json  # Packaging configuration
```

## Configuration

### Electron Builder
Configuration is in `electron-builder.json`. Customize:
- App name and ID
- Icons
- Build targets
- Installer options

### Window Settings
Edit `electron/main.js` to customize:
- Window size (default: 1200x800)
- Minimum size (default: 800x600)
- Title bar
- Menu

## Backend Connection

The Electron app connects to the backend at `http://localhost:3000` by default. Make sure your backend server is running:

```bash
cd ../financial-system-backend
npm run start:dev
```

## Troubleshooting

### App won't start in dev mode
- Ensure Vite dev server is running on port 5173
- Check if port 5173 is available
- Try `npm run dev` first to verify Vite works

### Build fails
- Clear `node_modules` and reinstall: `npm ci`
- Clear `dist` folder: `rm -rf dist`
- Check Node.js version: `node --version`

### Icons not showing
- Place icon files in `build/` directory:
  - `icon.ico` for Windows
  - `icon.icns` for macOS
  - `icon.png` for Linux

## Features

✅ Cross-platform desktop application  
✅ Native window controls  
✅ Offline-capable (after initial load)  
✅ Auto-updates support (can be configured)  
✅ System tray integration (can be added)  
✅ Native notifications (can be added)  

## License

Private - Internal Use Only
