# Frontend API Quick Reference Guide

## 🔗 How to Use the API Services

All API services are imported from `src/services/api.ts`. Each module follows a consistent pattern.

## 📚 Import Examples

```typescript
import { 
  authAPI,
  companiesAPI,
  accountsAPI,
  customersAPI,
  suppliersAPI,
  invoicesAPI,
  reportsAPI,
  // ... etc
} from '../services/api';
```

## 🔐 Authentication

```typescript
// Login
const response = await authAPI.login({ 
  email: 'user@example.com', 
  password: 'password123' 
});
const token = response.data.access_token;
localStorage.setItem('auth_token', token);

// Register
await authAPI.register({
  email: 'new@example.com',
  password: 'password123',
  firstName: 'John',
  lastName: 'Doe'
});

// Get Profile
const profile = await authAPI.getProfile();
```

## 🏢 Companies

```typescript
// Get all companies
const companies = await companiesAPI.getAll();

// Get single company
const company = await companiesAPI.getById(companyId);

// Create company
await companiesAPI.create({
  name: 'Acme Corp',
  legalName: 'Acme Corporation Ltd.',
  registrationNo: 'REG-12345',
  taxRegistrationNo: 'TAX-12345',
  countryCode: 'US',
  currencyCode: 'USD',
  fiscalYearStartMonth: 1,
  address: '123 Main St',
  phone: '+1-555-0100',
  email: 'info@acme.com'
});

// Update company
await companiesAPI.update(companyId, { name: 'New Name' });

// Delete company
await companiesAPI.delete(companyId);
```

## 📅 Fiscal Years

```typescript
// Get all fiscal years
const fiscalYears = await fiscalYearsAPI.getAll();

// Create fiscal year
await fiscalYearsAPI.create({
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  name: 'FY 2024',
  isClosed: false
});

// Close fiscal year
await fiscalYearsAPI.close(fiscalYearId);
```

## 📊 Chart of Accounts

```typescript
// Get all accounts (hierarchical)
const accounts = await accountsAPI.getAll();

// Get single account
const account = await accountsAPI.getById(accountId);

// Create account
await accountsAPI.create({
  code: '1110-01',
  name: 'Cash on Hand',
  type: 'asset',
  level: '4',
  parentId: 'parent-uuid',
  isPosting: true,
  isActive: true
});

// Update account
await accountsAPI.update(accountId, { name: 'Updated Name' });

// Delete account
await accountsAPI.delete(accountId);
```

## 📝 Journal Entries

```typescript
// Get all journal entries
const entries = await journalEntriesAPI.getAll();

// Get with filters
const filtered = await journalEntriesAPI.getAll({ 
  status: 'posted',
  startDate: '2024-01-01',
  endDate: '2024-12-31'
});

// Create journal entry
await journalEntriesAPI.create({
  voucherTypeId: 'voucher-type-uuid',
  fiscalYearId: 'fiscal-year-uuid',
  entryDate: '2024-12-02',
  referenceNo: 'INV-001',
  description: 'Payment for supplies',
  lines: [
    {
      accountId: 'account-uuid-1',
      debit: 1000.00,
      credit: 0,
      description: 'Supplies purchased'
    },
    {
      accountId: 'account-uuid-2',
      debit: 0,
      credit: 1000.00,
      description: 'Cash payment'
    }
  ]
});

// Approve entry
await journalEntriesAPI.approve(entryId);

// Post entry
await journalEntriesAPI.post(entryId);
```

## 👥 Customers

```typescript
// Get all customers
const customers = await customersAPI.getAll();

// Get customers with outstanding balances
const withBalance = await customersAPI.getWithBalance();

// Create customer
await customersAPI.create({
  code: 'CUST-001',
  name: 'ABC Company',
  email: 'contact@abc.com',
  phone: '+1-555-0123',
  address: '123 Customer St',
  creditLimit: 50000,
  paymentTerms: 30
});

// Update customer
await customersAPI.update(customerId, { creditLimit: 75000 });

// Delete customer
await customersAPI.delete(customerId);
```

## 🏭 Suppliers

```typescript
// Get all suppliers
const suppliers = await suppliersAPI.getAll();

// Get suppliers with outstanding balances
const withBalance = await suppliersAPI.getWithBalance();

// Create supplier
await suppliersAPI.create({
  code: 'SUP-001',
  name: 'XYZ Suppliers',
  email: 'sales@xyz.com',
  phone: '+1-555-0456',
  address: '456 Supplier Ave',
  creditLimit: 100000,
  paymentTerms: 60
});
```

## 💰 Tax Categories

```typescript
// Get all tax categories
const taxes = await taxCategoriesAPI.getAll();

// Create tax category
await taxCategoriesAPI.create({
  code: 'VAT',
  name: 'Value Added Tax',
  rate: 15.00,
  isActive: true
});
```

## 📦 Items

```typescript
// Get all items
const items = await itemsAPI.getAll();

// Get low stock items
const lowStock = await itemsAPI.getLowStock();

// Create item
await itemsAPI.create({
  code: 'ITEM-001',
  name: 'Product A',
  description: 'High quality product',
  unit: 'pcs',
  costPrice: 50.00,
  sellingPrice: 100.00,
  stockQuantity: 100,
  reorderLevel: 10,
  taxCategoryId: 'tax-uuid'
});

// Update stock
await itemsAPI.updateStock(itemId, { 
  quantity: 50, 
  type: 'in' // or 'out'
});
```

## 🏗️ Projects

```typescript
// Get all projects
const projects = await projectsAPI.getAll();

// Get project variance (budget vs actual)
const variance = await projectsAPI.getVariance(projectId);

// Create project
await projectsAPI.create({
  code: 'PROJ-001',
  name: 'Project Alpha',
  description: 'Major development project',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  budget: 500000,
  isActive: true
});
```

## 💼 Cost Centers

```typescript
// Get all cost centers
const costCenters = await costCentersAPI.getAll();

// Create cost center
await costCentersAPI.create({
  code: 'CC-001',
  name: 'Sales Department',
  description: 'Sales and marketing operations',
  isActive: true
});
```

## 🧾 Invoices

```typescript
// Get all invoices
const invoices = await invoicesAPI.getAll();

// Get filtered invoices
const salesInvoices = await invoicesAPI.getAll({ type: 'sales' });

// Create sales invoice
await invoicesAPI.create({
  invoiceNo: 'INV-001',
  type: 'sales',
  customerId: 'customer-uuid',
  invoiceDate: '2024-12-02',
  dueDate: '2025-01-02',
  lines: [
    {
      itemId: 'item-uuid',
      description: 'Product A',
      quantity: 10,
      unitPrice: 100.00,
      taxCategoryId: 'tax-uuid'
    }
  ],
  notes: 'Payment due in 30 days'
});

// Download PDF
const pdfBlob = await invoicesAPI.getPDF(invoiceId);
// Handle blob download...

// Mark as paid
await invoicesAPI.markAsPaid(invoiceId, {
  paymentDate: '2024-12-02',
  paymentAmount: 1150.00,
  paymentMethod: 'bank_transfer'
});
```

## 📈 Reports

```typescript
// Trial Balance
const trialBalance = await reportsAPI.trialBalance({
  startDate: '2024-01-01',
  endDate: '2024-12-31'
});

// Income Statement (P&L)
const incomeStatement = await reportsAPI.incomeStatement({
  startDate: '2024-01-01',
  endDate: '2024-12-31'
});

// Balance Sheet
const balanceSheet = await reportsAPI.balanceSheet({
  asOfDate: '2024-12-31'
});

// AR Aging Report
const arAging = await reportsAPI.arAging({
  asOfDate: '2024-12-31'
});

// AP Aging Report
const apAging = await reportsAPI.apAging({
  asOfDate: '2024-12-31'
});

// Journal Register
const journalRegister = await reportsAPI.journalRegister({
  startDate: '2024-01-01',
  endDate: '2024-12-31'
});

// Day Book
const dayBook = await reportsAPI.dayBook({
  date: '2024-12-02'
});
```

## 🔄 Bank Reconciliation

```typescript
// Get all reconciliations
const reconciliations = await reconciliationsAPI.getAll();

// Create reconciliation
await reconciliationsAPI.create({
  accountId: 'bank-account-uuid',
  statementDate: '2024-12-31',
  statementBalance: 50000.00,
  items: [
    {
      entryId: 'journal-entry-uuid',
      isReconciled: true,
      reconciledDate: '2024-12-31'
    }
  ]
});
```

## 🏢 Fixed Assets

```typescript
// Get all fixed assets
const assets = await fixedAssetsAPI.getAll();

// Create fixed asset
await fixedAssetsAPI.create({
  code: 'FA-001',
  name: 'Office Building',
  assetType: 'building',
  purchaseDate: '2020-01-01',
  purchasePrice: 500000,
  depreciationMethod: 'straight_line',
  usefulLife: 20,
  salvageValue: 50000
});

// Calculate depreciation
await fixedAssetsAPI.depreciate(assetId, {
  depreciationDate: '2024-12-31'
});
```

## 💵 Currencies

```typescript
// Get all currencies
const currencies = await currenciesAPI.getAll();

// Get exchange rate
const rate = await currenciesAPI.getExchangeRate({
  from: 'USD',
  to: 'EUR',
  date: '2024-12-02'
});

// Create currency
await currenciesAPI.create({
  code: 'EUR',
  name: 'Euro',
  symbol: '€',
  isActive: true
});
```

## 📊 Budgets

```typescript
// Get all budgets
const budgets = await budgetsAPI.getAll();

// Get budget variance
const variance = await budgetsAPI.getVariance(budgetId);

// Create budget
await budgetsAPI.create({
  name: 'FY 2024 Budget',
  fiscalYearId: 'fiscal-year-uuid',
  lines: [
    {
      accountId: 'account-uuid',
      budgetedAmount: 100000,
      period: 'annual'
    }
  ]
});
```

## 💰 Account Balances

```typescript
// Get account balance
const balance = await balancesAPI.getAccountBalance(accountId, {
  asOfDate: '2024-12-31'
});

// Recalculate all balances
await balancesAPI.recalculateAll();
```

## 👤 Users

```typescript
// Get all users
const users = await usersAPI.getAll();

// Create user
await usersAPI.create({
  email: 'newuser@example.com',
  password: 'password123',
  firstName: 'Jane',
  lastName: 'Smith',
  role: 'accountant'
});

// Update user
await usersAPI.update(userId, { role: 'admin' });

// Delete user
await usersAPI.delete(userId);
```

## 🔧 Error Handling Pattern

```typescript
try {
  const response = await customersAPI.getAll();
  setCustomers(response.data);
} catch (error) {
  console.error('Failed to fetch customers:', error);
  setError('Failed to load customers.');
} finally {
  setLoading(false);
}
```

## 🎯 Common Patterns

### Loading State
```typescript
const [loading, setLoading] = useState(true);
const [data, setData] = useState([]);
const [error, setError] = useState('');

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await someAPI.getAll();
      setData(response.data);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

### Delete with Confirmation
```typescript
const handleDelete = async (id: string) => {
  if (!confirm('Are you sure?')) return;
  
  try {
    await someAPI.delete(id);
    fetchData(); // Refresh list
  } catch (err) {
    alert('Failed to delete');
  }
};
```

### Form Submission
```typescript
const handleSubmit = async (formData: any) => {
  try {
    await someAPI.create(formData);
    alert('Created successfully!');
    navigate('/list');
  } catch (err) {
    alert('Failed to create');
  }
};
```

---

**Note**: All API calls automatically include the JWT token from localStorage. The backend handles company context via the token, so you don't need to pass company IDs manually.
