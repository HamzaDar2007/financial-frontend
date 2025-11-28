# Financial System Frontend

A premium, RTL-first financial management system built with Electron, React, TypeScript, and Tailwind CSS.

## 🎨 Design Philosophy

This application follows the **"Digital Luxury"** design philosophy, featuring:
- **Aurora Dark Theme**: Deep, sophisticated dark backgrounds with subtle animated gradients
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Gold Standard Accents**: Metallic gold (#D4AF37) primary colors
- **Fluid Animations**: Spring-physics animations using Framer Motion
- **RTL-First**: Fully optimized for Right-to-Left languages (Arabic)

## 🚀 Getting Started

### Prerequisites
- Node.js v20.17.0 or higher
- npm 11.6.2 or higher

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   └── layout/
│       ├── AppShell.tsx      # Main layout wrapper
│       ├── Sidebar.tsx        # Glassmorphic navigation sidebar
│       └── TopBar.tsx         # Top navigation bar
├── pages/
│   ├── Dashboard.tsx          # Main dashboard with Bento grid
│   ├── Login.tsx              # Authentication page
│   └── ChartOfAccounts.tsx    # Hierarchical accounts tree
├── services/
│   └── api.ts                 # Backend API integration
├── lib/
│   └── utils.ts               # Utility functions
└── index.css                  # Global styles with Tailwind
```

## 🎯 Features

### Implemented
- ✅ Premium glassmorphic UI with Aurora theme
- ✅ RTL layout support
- ✅ Authentication (Login page)
- ✅ Dashboard with financial stats
- ✅ Chart of Accounts (Hierarchical tree view)
- ✅ Smooth animations and transitions
- ✅ API service layer for backend integration

### Backend Integration
The frontend connects to the NestJS backend at `http://localhost:3000` with the following modules:
- **Authentication**: Login, Register, 2FA
- **Financial Management**: Accounts, Journal Entries, Currencies
- **Sales & Invoicing**: Orders, Invoices, Payments
- **Purchasing**: Purchase Orders
- **Inventory**: Products, Warehouses, Units
- **Reports**: Balance Sheet, P&L, Analytics
- **Administration**: Users, Roles, Audit Trails

## 🎨 Design System

### Colors
```css
--void: #0B0E14        /* Base background */
--obsidian: #151923    /* Surface */
--charcoal: #1E2330    /* Overlay */
--gold: #D4AF37        /* Primary brand */
--emerald: #10B981     /* Success */
--ruby: #EF4444        /* Danger */
--silver: #94a3b8      /* Text secondary */
```

### Typography
- **Primary Font**: IBM Plex Sans Arabic
- **Fallback**: Almarai
- **Weights**: 100 (Thin) to 700 (Bold)

### Components
- **Buttons**: `.btn-primary`, `.btn-secondary`
- **Inputs**: `.input-field`
- **Cards**: `.card`
- **Glass Effect**: `.glass`
- **Aurora Background**: `.aurora-bg`

## 🔧 Configuration

### Tailwind Config
Custom theme extensions in `tailwind.config.js`:
- Aurora color palette
- Custom animations (shimmer, float)
- Glassmorphism utilities

### API Configuration
Update the base URL in `src/services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:3000';
```

## 📱 Electron Integration

To run as an Electron app:
```bash
# Install Electron dependencies
npm install electron electron-builder -D

# Add Electron main process file
# Configure electron-builder in package.json
# Run electron app
npm run electron:dev
```

## 🌐 RTL Support

The application is RTL-first with:
- `dir="rtl"` in HTML
- Logical CSS properties (margin-inline-start, etc.)
- Mirrored layouts and icons
- Arabic/English bilingual labels

## 📄 License

© 2025 Financial System. All rights reserved.
