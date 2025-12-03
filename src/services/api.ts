import axios from 'axios';
import type { Account, JournalEntry, Company, User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Redirect to login if unauthorized
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// ==================== AUTH API ====================
export const authAPI = {
    login: (credentials: { email: string; password: string }) =>
        apiClient.post<{ accessToken: string; user: User }>('/auth/login', credentials),

<<<<<<< HEAD
    register: (data: { email: string; password: string; firstName: string; lastName: string }) =>
        apiClient.post('/auth/register', data),

    getProfile: () =>
        apiClient.get('/auth/profile'),
};

// ==================== COMPANIES API ====================
export const companiesAPI = {
    getAll: () =>
        apiClient.get('/companies'),
=======
    register: (data: any) =>
        apiClient.post<User>('/auth/register', data),

    getProfile: () =>
        apiClient.get<User>('/auth/profile'),

    toggle2FA: () =>
        apiClient.patch('/auth/2fa'),
};

// Financial API
export const financialAPI = {
    // Accounts
    getAccounts: (companyId: string) =>
        apiClient.get<Account[]>(`/accounts?companyId=${companyId}`),

    createAccount: (data: Partial<Account>) =>
        apiClient.post<Account>('/accounts', data),

    updateAccount: (id: string, data: Partial<Account>) =>
        apiClient.patch<Account>(`/accounts/${id}`, data),

    deleteAccount: (id: string) =>
        apiClient.delete<void>(`/accounts/${id}`),

    // Journal Entries
    getJournalEntries: (companyId: string) =>
        apiClient.get<JournalEntry[]>(`/journal?companyId=${companyId}`),

    createJournalEntry: (data: any) =>
        apiClient.post<JournalEntry>('/journal', data),

    // Currencies
    getCurrencies: () =>
        apiClient.get('/financial/currencies'),

    // Exchange Rates
    getExchangeRates: () =>
        apiClient.get('/financial/exchange-rates'),
};

import type { SalesOrder } from '../types';

// ... (existing imports)

// Sales API
export const salesAPI = {
    getSalesOrders: (companyId: string) =>
        apiClient.get<SalesOrder[]>(`/sales-orders/${companyId}`),

    createSalesOrder: (data: any) =>
        apiClient.post('/sales-orders', data),

    getInvoices: () =>
        apiClient.get('/invoices'),

    createInvoice: (data: any) =>
        apiClient.post('/invoices', data),

    getPayments: () =>
        apiClient.get('/payments'),

    createPayment: (data: any) =>
        apiClient.post('/payments', data),
};

// Purchases API
export const purchasesAPI = {
    getPurchaseOrders: (companyId: string) =>
        apiClient.get(`/purchase-orders/company/${companyId}`),

    createPurchaseOrder: (data: any) =>
        apiClient.post('/purchase-orders', data),
};

// Inventory API
export const inventoryAPI = {
    getProducts: (companyId: string) =>
        apiClient.get(`/products?companyId=${companyId}`),

    createProduct: (data: any) =>
        apiClient.post('/products', data),

    getWarehouses: () =>
        apiClient.get('/warehouses'),

    getUnitsOfMeasure: () =>
        apiClient.get('/uom'),
};

// Contacts API
export const contactsAPI = {
    getCompanies: () =>
        apiClient.get<Company[]>('/companies'),
>>>>>>> 4250e4ea9131537ba4b4829de554d0c59e151439

    getById: (id: string) =>
        apiClient.get(`/companies/${id}`),

    create: (data: any) =>
        apiClient.post('/companies', data),

    update: (id: string, data: any) =>
        apiClient.patch(`/companies/${id}`, data),

    delete: (id: string) =>
        apiClient.delete(`/companies/${id}`),
};

// ==================== FISCAL YEARS API ====================
export const fiscalYearsAPI = {
    getAll: () =>
        apiClient.get('/fiscal-years'),

    getById: (id: string) =>
        apiClient.get(`/fiscal-years/${id}`),

    create: (data: any) =>
        apiClient.post('/fiscal-years', data),

    close: (id: string) =>
        apiClient.patch(`/fiscal-years/${id}/close`),
};

// ==================== ACCOUNTS API ====================
export const accountsAPI = {
    getAll: () =>
        apiClient.get('/accounts'),

    getById: (id: string) =>
        apiClient.get(`/accounts/${id}`),

    create: (data: any) =>
        apiClient.post('/accounts', data),

    update: (id: string, data: any) =>
        apiClient.patch(`/accounts/${id}`, data),

    delete: (id: string) =>
        apiClient.delete(`/accounts/${id}`),
};

// ==================== VOUCHER TYPES API ====================
export const voucherTypesAPI = {
    getAll: () =>
        apiClient.get('/voucher-types'),

    getById: (id: string) =>
        apiClient.get(`/voucher-types/${id}`),

    create: (data: any) =>
        apiClient.post('/voucher-types', data),

    update: (id: string, data: any) =>
        apiClient.patch(`/voucher-types/${id}`, data),

    delete: (id: string) =>
        apiClient.delete(`/voucher-types/${id}`),
};

// ==================== JOURNAL ENTRIES API ====================
export const journalEntriesAPI = {
    getAll: (params?: any) =>
        apiClient.get('/journal-entries', { params }),

    getById: (id: string) =>
        apiClient.get(`/journal-entries/${id}`),

    create: (data: any) =>
        apiClient.post('/journal-entries', data),

    update: (id: string, data: any) =>
        apiClient.patch(`/journal-entries/${id}`, data),

    delete: (id: string) =>
        apiClient.delete(`/journal-entries/${id}`),

    approve: (id: string) =>
        apiClient.patch(`/journal-entries/${id}/approve`),

    post: (id: string) =>
        apiClient.patch(`/journal-entries/${id}/post`),
};

// ==================== CUSTOMERS API ====================
export const customersAPI = {
    getAll: () =>
        apiClient.get('/customers'),

    getWithBalance: () =>
        apiClient.get('/customers/with-balance'),

    getById: (id: string) =>
        apiClient.get(`/customers/${id}`),

    create: (data: any) =>
        apiClient.post('/customers', data),

    update: (id: string, data: any) =>
        apiClient.patch(`/customers/${id}`, data),

    delete: (id: string) =>
        apiClient.delete(`/customers/${id}`),
};

// ==================== SUPPLIERS API ====================
export const suppliersAPI = {
    getAll: () =>
        apiClient.get('/suppliers'),

    getWithBalance: () =>
        apiClient.get('/suppliers/with-balance'),

    getById: (id: string) =>
        apiClient.get(`/suppliers/${id}`),

    create: (data: any) =>
        apiClient.post('/suppliers', data),

    update: (id: string, data: any) =>
        apiClient.patch(`/suppliers/${id}`, data),

    delete: (id: string) =>
        apiClient.delete(`/suppliers/${id}`),
};

// ==================== TAX CATEGORIES API ====================
export const taxCategoriesAPI = {
    getAll: () =>
        apiClient.get('/tax-categories'),

    getById: (id: string) =>
        apiClient.get(`/tax-categories/${id}`),

    create: (data: any) =>
        apiClient.post('/tax-categories', data),

    update: (id: string, data: any) =>
        apiClient.patch(`/tax-categories/${id}`, data),

    delete: (id: string) =>
        apiClient.delete(`/tax-categories/${id}`),
};

// ==================== ITEMS API ====================
export const itemsAPI = {
    getAll: () =>
        apiClient.get('/items'),

    getLowStock: () =>
        apiClient.get('/items/low-stock'),

    getById: (id: string) =>
        apiClient.get(`/items/${id}`),

    create: (data: any) =>
        apiClient.post('/items', data),

    update: (id: string, data: any) =>
        apiClient.patch(`/items/${id}`, data),

    updateStock: (id: string, data: { quantity: number; type: 'in' | 'out' }) =>
        apiClient.patch(`/items/${id}/stock`, data),

    delete: (id: string) =>
        apiClient.delete(`/items/${id}`),
};

// ==================== PROJECTS API ====================
export const projectsAPI = {
    getAll: () =>
        apiClient.get('/projects'),

    getById: (id: string) =>
        apiClient.get(`/projects/${id}`),

    getVariance: (id: string) =>
        apiClient.get(`/projects/${id}/variance`),

    create: (data: any) =>
        apiClient.post('/projects', data),

    update: (id: string, data: any) =>
        apiClient.patch(`/projects/${id}`, data),

    delete: (id: string) =>
        apiClient.delete(`/projects/${id}`),
};

// ==================== COST CENTERS API ====================
export const costCentersAPI = {
    getAll: () =>
        apiClient.get('/cost-centers'),

    getById: (id: string) =>
        apiClient.get(`/cost-centers/${id}`),

    create: (data: any) =>
        apiClient.post('/cost-centers', data),

    update: (id: string, data: any) =>
        apiClient.patch(`/cost-centers/${id}`, data),

    delete: (id: string) =>
        apiClient.delete(`/cost-centers/${id}`),
};

// ==================== INVOICES API ====================
export const invoicesAPI = {
    getAll: (params?: any) =>
        apiClient.get('/invoices', { params }),

    getById: (id: string) =>
        apiClient.get(`/invoices/${id}`),

    getPDF: (id: string) =>
        apiClient.get(`/invoices/${id}/pdf`, { responseType: 'blob' }),

    create: (data: any) =>
        apiClient.post('/invoices', data),

    update: (id: string, data: any) =>
        apiClient.patch(`/invoices/${id}`, data),

    markAsPaid: (id: string, data: { paymentDate: string; paymentAmount: number; paymentMethod: string }) =>
        apiClient.patch(`/invoices/${id}/pay`, data),

    delete: (id: string) =>
        apiClient.delete(`/invoices/${id}`),
};

// ==================== REPORTS API ====================
export const reportsAPI = {
    trialBalance: (params: { startDate: string; endDate: string }) =>
        apiClient.get('/reports/trial-balance', { params }),

    incomeStatement: (params: { startDate: string; endDate: string }) =>
        apiClient.get('/reports/income-statement', { params }),

    balanceSheet: (params: { asOfDate: string }) =>
        apiClient.get('/reports/balance-sheet', { params }),

    generalLedger: (accountId: string, params: { startDate: string; endDate: string }) =>
        apiClient.get(`/reports/general-ledger/${accountId}`, { params }),

    arAging: (params: { asOfDate: string }) =>
        apiClient.get('/reports/ar-aging', { params }),

    apAging: (params: { asOfDate: string }) =>
        apiClient.get('/reports/ap-aging', { params }),

    journalRegister: (params: { startDate: string; endDate: string }) =>
        apiClient.get('/reports/journal-register', { params }),

    dayBook: (params: { date: string }) =>
        apiClient.get('/reports/day-book', { params }),
};

<<<<<<< HEAD
// ==================== RECONCILIATIONS API ====================
export const reconciliationsAPI = {
    getAll: () =>
        apiClient.get('/reconciliations'),

    getById: (id: string) =>
        apiClient.get(`/reconciliations/${id}`),

    create: (data: any) =>
        apiClient.post('/reconciliations', data),

    update: (id: string, data: any) =>
        apiClient.patch(`/reconciliations/${id}`, data),

    delete: (id: string) =>
        apiClient.delete(`/reconciliations/${id}`),
};

// ==================== FIXED ASSETS API ====================
export const fixedAssetsAPI = {
    getAll: () =>
        apiClient.get('/fixed-assets'),

    getById: (id: string) =>
        apiClient.get(`/fixed-assets/${id}`),

    create: (data: any) =>
        apiClient.post('/fixed-assets', data),

    depreciate: (id: string, data: { depreciationDate: string }) =>
        apiClient.post(`/fixed-assets/${id}/depreciate`, data),

    update: (id: string, data: any) =>
        apiClient.patch(`/fixed-assets/${id}`, data),

    delete: (id: string) =>
        apiClient.delete(`/fixed-assets/${id}`),
};

// ==================== CURRENCIES API ====================
export const currenciesAPI = {
    getAll: () =>
        apiClient.get('/currencies'),

    getExchangeRate: (params: { from: string; to: string; date: string }) =>
        apiClient.get('/currencies/exchange-rate', { params }),

    create: (data: any) =>
        apiClient.post('/currencies', data),

    update: (id: string, data: any) =>
        apiClient.patch(`/currencies/${id}`, data),

    delete: (id: string) =>
        apiClient.delete(`/currencies/${id}`),
};

// ==================== BUDGETS API ====================
export const budgetsAPI = {
    getAll: () =>
        apiClient.get('/budgets'),

    getById: (id: string) =>
        apiClient.get(`/budgets/${id}`),

    getVariance: (id: string) =>
        apiClient.get(`/budgets/${id}/variance`),

    create: (data: any) =>
        apiClient.post('/budgets', data),

    update: (id: string, data: any) =>
        apiClient.patch(`/budgets/${id}`, data),

    delete: (id: string) =>
        apiClient.delete(`/budgets/${id}`),
};

// ==================== BALANCES API ====================
export const balancesAPI = {
    getAccountBalance: (accountId: string, params?: { asOfDate: string }) =>
        apiClient.get(`/balances/account/${accountId}`, { params }),

    recalculateAll: () =>
        apiClient.post('/balances/recalculate'),
};

// ==================== USERS API ====================
export const usersAPI = {
    getAll: () =>
        apiClient.get('/users'),

    getById: (id: string) =>
        apiClient.get(`/users/${id}`),

    create: (data: any) =>
        apiClient.post('/users', data),
=======
// Admin API
export const adminAPI = {
    getUsers: () =>
        apiClient.get<User[]>('/users'),

    createUser: (data: any) =>
        apiClient.post<User>('/users', data),
>>>>>>> 4250e4ea9131537ba4b4829de554d0c59e151439

    update: (id: string, data: any) =>
        apiClient.patch(`/users/${id}`, data),

    delete: (id: string) =>
        apiClient.delete(`/users/${id}`),
};

export default apiClient;
