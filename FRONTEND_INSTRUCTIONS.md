# Frontend Development Instructions - Financial System

## Project Overview
This document outlines the instructions for building the frontend of the Financial System using **Electron JS**. The frontend will interact with the existing NestJS backend.

## Technology Stack
- **Core Framework**: Electron JS (Recommended with Vite + React or Vue for UI components)
- **Language**: TypeScript (Recommended) or JavaScript
- **Styling**: Tailwind CSS (Mandatory for this design) + Framer Motion (for animations)
- **State Management**: Redux Toolkit / Zustand
- **HTTP Client**: Axios

## 🎨 Design Philosophy: "Digital Luxury"
The goal is to create a financial dashboard that feels like a high-end fintech product (e.g., Stripe, Ramp, Brex) but tailored for an RTL environment. The design must be **immersive, fluid, and pixel-perfect**.

### 1. The "Aurora" Dark Theme
We will use a sophisticated dark theme that feels deep and expensive, avoiding pitch black.
- **Backgrounds**:
  - **Base**: `#0B0E14` (Deep Void)
  - **Surface**: `#151923` (Obsidian)
  - **Overlay**: `#1E2330` (Charcoal)
- **Accents (The "Gold Standard")**:
  - **Primary Brand**: `#D4AF37` (Metallic Gold) to `#F5D76E` (Soft Gold) gradient.
  - **Success**: `#10B981` (Emerald) with a subtle glow.
  - **Danger**: `#EF4444` (Ruby) with a subtle glow.
- **Gradients**:
  - Use **"Aurora Gradients"** in the background—subtle, moving blobs of color (deep blue, purple, and teal) heavily blurred (`blur-3xl`) and set to low opacity (15%) to breathe life into the dark background.

### 2. Glassmorphism & Texture
- **The "Frosted" Look**:
  - Sidebar and Floating Modals should use `backdrop-filter: blur(20px)`.
  - Add a **Noise Texture** overlay (very low opacity) to surfaces to give them a tactile, premium paper-like feel.
- **Borders**:
  - No solid borders. Use **Gradient Borders**.
  - Example: A 1px border that fades from white (10% opacity) to transparent.
  - `border: 1px solid rgba(255, 255, 255, 0.08)`

### 3. Typography (RTL Optimized)
- **Font Family**: **'IBM Plex Sans Arabic'** or **'Almarai'**. These fonts offer geometric precision and excellent readability in Arabic.
- **Hierarchy**:
  - **Headings**: Light font weight (300) but large size. This feels more elegant than bold heavy text.
  - **Numbers**: Use tabular lining figures (monospaced numbers) for financial data to ensure perfect vertical alignment.

### 4. Component Aesthetics
- **The "Bento" Dashboard**:
  - Organize widgets (Total Assets, Recent Transactions) in a **Bento Grid** layout—rectangular cards that fit perfectly together.
- **Buttons**:
  - **Primary**: Gradient background (Gold to Amber), dark text, with a subtle inner shadow to make it look 3D/tactile.
  - **Secondary**: Transparent background, white border (10% opacity), white text.
- **Inputs**:
  - Dark background (`#0f1218`), no border, but a subtle "inner glow" when focused.

### 5. Motion & Interaction (The "Feel")
- **Fluid Transitions**: Nothing should "snap" into place. All hover states, page loads, and modal openings must have a spring-physics animation (using Framer Motion).
- **Magnetic Hover**: Buttons should slightly move towards the cursor when hovered.
- **Skeleton Loading**: Never show a blank screen. Use shimmering skeleton loaders that match the dark theme.

## Backend Integration & Feature Map

The frontend must implement interfaces for the following backend modules. All API calls should be prefixed with the base URL (e.g., `http://localhost:3000`).

### 1. Authentication & Security (`/auth`)
- **Login**: `POST /auth/login` (Body: `{ username, password }`).
  - **Action**: Store JWT token.
- **Register**: `POST /auth/register` (Body: `{ email, password, ... }`).
- **Profile**: `GET /auth/profile` (Protected).
- **2FA**: `PATCH /auth/2fa` (Toggle Two-Factor Auth).

### 2. Financial Management (`/financial`)
This is the core of the system.
- **Chart of Accounts (COA)**:
  - **Endpoint**: `GET /financial/accounts`
  - **UI**: Hierarchical Tree View (Dynamic depth).
  - **Logic**: Only child-most accounts (leaf nodes) can be used in Journal Entries.
- **Journal Entries**:
  - **Endpoint**: `POST /financial/journal`
  - **UI**: Double-entry form (Debit/Credit must balance).
- **Currencies & Exchange Rates**:
  - Manage multi-currency support (`/financial/currencies`, `/financial/exchange-rates`).

### 3. Sales & Invoicing (`/sales-and-invoicing`)
- **Sales Orders**: `GET/POST /sales-orders`
- **Invoices**: `GET/POST /invoices`
  - **UI**: Invoice generation form with line items (products).
  - **Print**: Generate PDF (using Electron's printToPDF or a library).
- **Payments**: `GET/POST /payments` (Record incoming payments).
- **Credit/Debit Notes**: Handle returns and adjustments.

### 4. Purchasing (`/company-purchases`)
- **Purchase Orders**: `GET/POST /purchase-orders`
  - **UI**: Form to order goods from suppliers.
  - **Workflow**: Create PO -> Approve -> Receive Goods (Inventory update) -> Bill.

### 5. Product & Inventory (`/product-and-inventory`)
- **Product Catalog**: `GET/POST /products`
  - **UI**: Grid view of products with images.
- **Inventory**: Track stock levels.
- **Warehouses**: Manage multiple locations.
- **Units of Measure**: `GET/POST /uom` (Define kg, liters, pcs, etc.).

### 6. Weighbridge & Quality Control (`/weighbridge-and-qualitycontrol`)
*Specialized module for industrial/agricultural use cases.*
- **Weighbridge Tickets**: `GET/POST /weighbridge-tickets`
  - **UI**: Interface to capture truck weights (Gross, Tare, Net).
- **Quality Tests**: `GET/POST /grain-quality-tests`
  - **UI**: Form to record quality parameters (moisture, foreign matter, etc.) linked to a ticket.

### 7. Stakeholders
- **Companies**: `GET/POST /companies` (Multi-company support).
- **Contacts**: `GET/POST /company-contacts` (Customers & Suppliers).
- **Employees**: `GET/POST /employees`.
- **Partners**: `GET/POST /partners` (Business partners/Shareholders).

### 8. Reports & Analytics (`/reports`)
- **Financial Reports**: `GET /reports`
  - **UI**: Dedicated Reporting Dashboard.
  - **Types**: Balance Sheet, Profit & Loss, Trial Balance, General Ledger.
  - **Visualization**: Use charts (Recharts/Chart.js) to visualize trends.

### 9. Administration & Workflow
- **Users**: `GET/POST /users`.
- **Roles & Permissions**: `GET/POST /roles` (Assign permissions to roles).
- **Audit Trails**: `GET /audit-trails` (View system logs for security).
- **Workflows**: `GET/POST /workflows` (Define approval processes for documents).

## Development Steps

### Step 1: Project Initialization
```bash
npm create vite@latest financial-frontend -- --template react-ts
cd financial-frontend
npm install electron electron-builder framer-motion clsx tailwind-merge axios react-router-dom -D
npx tailwindcss init -p
```

### Step 2: Configure RTL & Tailwind
In `tailwind.config.js`, ensure you enable RTL support.
Add your custom colors (Obsidian, Gold, etc.) to the `theme.extend.colors` section.

### Step 3: Build the "Shell"
Create the `AppShell` component containing:
1.  The **Aurora Background** (fixed position).
2.  The **Glassmorphic Sidebar** (Right side).
3.  The **Top Bar** (User profile, Search).

### Step 4: Implement Core Modules
Start with **Authentication**, then move to **Chart of Accounts**, then **Invoicing**.

## Build & Distribution
- Use `electron-builder` to package the application.

---
**Note**: This design requires high attention to detail. "Good enough" is not acceptable. The UI must be stunning.
