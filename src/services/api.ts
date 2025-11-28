import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

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

// Auth API
export const authAPI = {
    login: (credentials: { username: string; password: string }) =>
        apiClient.post('/auth/login', credentials),

    register: (data: any) =>
        apiClient.post('/auth/register', data),

    getProfile: () =>
        apiClient.get('/auth/profile'),

    toggle2FA: () =>
        apiClient.patch('/auth/2fa'),
};

// Financial API
export const financialAPI = {
    // Accounts
    getAccounts: () =>
        apiClient.get('/financial/accounts'),

    createAccount: (data: any) =>
        apiClient.post('/financial/accounts', data),

    updateAccount: (id: string, data: any) =>
        apiClient.patch(`/financial/accounts/${id}`, data),

    deleteAccount: (id: string) =>
        apiClient.delete(`/financial/accounts/${id}`),

    // Journal Entries
    getJournalEntries: () =>
        apiClient.get('/financial/journal'),

    createJournalEntry: (data: any) =>
        apiClient.post('/financial/journal', data),

    // Currencies
    getCurrencies: () =>
        apiClient.get('/financial/currencies'),

    // Exchange Rates
    getExchangeRates: () =>
        apiClient.get('/financial/exchange-rates'),
};

// Sales API
export const salesAPI = {
    getSalesOrders: () =>
        apiClient.get('/sales-orders'),

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
    getPurchaseOrders: () =>
        apiClient.get('/purchase-orders'),

    createPurchaseOrder: (data: any) =>
        apiClient.post('/purchase-orders', data),
};

// Inventory API
export const inventoryAPI = {
    getProducts: () =>
        apiClient.get('/products'),

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
        apiClient.get('/companies'),

    getContacts: () =>
        apiClient.get('/company-contacts'),

    createContact: (data: any) =>
        apiClient.post('/company-contacts', data),

    getEmployees: () =>
        apiClient.get('/employees'),
};

// Reports API
export const reportsAPI = {
    getReports: () =>
        apiClient.get('/reports'),

    getBalanceSheet: () =>
        apiClient.get('/reports/balance-sheet'),

    getProfitLoss: () =>
        apiClient.get('/reports/profit-loss'),
};

// Admin API
export const adminAPI = {
    getUsers: () =>
        apiClient.get('/users'),

    createUser: (data: any) =>
        apiClient.post('/users', data),

    getRoles: () =>
        apiClient.get('/roles'),

    createRole: (data: any) =>
        apiClient.post('/roles', data),

    getAuditTrails: () =>
        apiClient.get('/audit-trails'),

    getWorkflows: () =>
        apiClient.get('/workflows'),
};

export default apiClient;
