# 🧪 System Testing Guide

This guide will help you verify that the Financial System frontend and backend are working together correctly.

## 📋 Prerequisites

Ensure you have the following installed:
- Node.js (v18 or higher)
- PostgreSQL (running and accessible)
- Git

## 🚀 Step 1: Start the Backend

1. Open a terminal.
2. Navigate to the backend directory:
   ```powershell
   cd f:\projects\finacial-system\double-entery-system\backend
   ```
3. Install dependencies (if not already done):
   ```powershell
   npm install
   ```
4. Start the backend server:
   ```powershell
   npm run start:dev
   ```
5. **Verify**: Open your browser and go to `http://localhost:3000/api`. You should see the Swagger API documentation.

## 💻 Step 2: Start the Frontend

1. Open a **new** terminal window.
2. Navigate to the frontend directory:
   ```powershell
   cd f:\projects\finacial-system\double-entery-system\financial-frontend
   ```
3. Install dependencies (if not already done):
   ```powershell
   npm install
   ```
4. Start the frontend development server:
   ```powershell
   npm run dev
   ```
5. **Verify**: The terminal will show a URL, usually `http://localhost:5173`. Open this in your browser.

## 🔍 Step 3: Functional Testing Checklist

Follow these steps to verify the system features:

### 1. Authentication
- [ ] **Register**: Click "Register" on the login page. Create a new account.
  - *Expected*: Success message and redirect to login.
- [ ] **Login**: Log in with your new credentials.
  - *Expected*: Redirect to Dashboard. Token stored in localStorage.

### 2. Dashboard
- [ ] **Load**: Verify the dashboard loads without "Failed to fetch" errors.
- [ ] **Stats**: Check if "Total Assets", "Total Liabilities", etc., show numbers (even if 0).

### 3. Chart of Accounts
- [ ] **Navigate**: Go to "Chart of Accounts" from the sidebar.
- [ ] **View**: Verify the tree structure of accounts is visible.

### 4. Customers & Suppliers
- [ ] **Create Customer**: Go to "Customers" -> "Add Customer". Fill form and save.
- [ ] **List**: Verify the new customer appears in the list.
- [ ] **Suppliers**: Repeat for Suppliers.

### 5. Invoices (Sales & Purchase)
- [ ] **Create Invoice**: Go to "Invoices" -> "New Invoice".
- [ ] **Select Type**: Choose "Sales" or "Purchase".
- [ ] **Add Items**: Add line items (ensure you have Items in Inventory first).
- [ ] **Save**: Save the invoice.
- [ ] **PDF**: Click the PDF icon to test download.

### 6. Inventory
- [ ] **Add Item**: Go to "Inventory" -> "New Product".
- [ ] **List**: Verify the product appears.

### 7. Reports
- [ ] **Generate**: Go to "Reports". Select "Balance Sheet".
- [ ] **View**: Click "Generate Report". Verify data is displayed.

### 8. Settings
- [ ] **Profile**: Check if your user details are correct.
- [ ] **Companies**: Verify your company is listed.

## ❓ Troubleshooting

- **"Failed to fetch" error**:
  - Check if the backend is running (`http://localhost:3000`).
  - Check browser console (F12) for CORS errors.
  - Verify `VITE_API_BASE_URL` in `.env` file matches your backend URL.

- **Login fails**:
  - Check backend logs for database connection errors.
  - Ensure PostgreSQL is running.

- **White screen**:
  - Check browser console for JavaScript errors.
