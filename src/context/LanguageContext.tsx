import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ur' | 'en';

interface LanguageContextType {
    language: Language;
    dir: 'rtl' | 'ltr';
    toggleLanguage: () => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
    en: {
        // Sidebar
        'app.title': 'Financial System',
        'app.subtitle': 'Financial Management System',
        'menu.dashboard': 'Dashboard',
        'menu.accounts': 'Chart of Accounts',
        'menu.journal': 'Journal Entries',
        'menu.sales': 'Sales',
        'menu.purchases': 'Purchases',
        'menu.inventory': 'Inventory',
        'menu.contacts': 'Contacts',
        'menu.settings': 'Settings',
        'user.name': 'System User',
        'user.role': 'Admin',

        // TopBar
        'search.placeholder': 'Search...',

        // Dashboard
        'dashboard.title': 'Dashboard',
        'dashboard.subtitle': 'Dashboard Overview',
        'stats.assets': 'Total Assets',
        'stats.revenue': 'Total Revenue',
        'stats.expenses': 'Total Expenses',
        'stats.profit': 'Net Profit',
        'currency': 'SAR',
        'transactions.title': 'Recent Transactions',
        'transactions.viewAll': 'View All',

        // Chart of Accounts
        'accounts.title': 'Chart of Accounts',
        'accounts.subtitle': 'Hierarchical View',
        'accounts.add': 'Add New Account',
        'accounts.name': 'Account Name',
        'accounts.type': 'Type',
        'accounts.balance': 'Balance',
        'accounts.actions': 'Actions',
        'accounts.assets': 'Assets',
        'accounts.liabilities': 'Liabilities',
        'accounts.equity': 'Equity',

        // Login
        'login.title': 'Financial System',
        'login.subtitle': 'Financial Management System',
        'login.username': 'Username',
        'login.password': 'Password',
        'login.username.placeholder': 'Enter username',
        'login.password.placeholder': 'Enter password',
        'login.remember': 'Remember me',
        'login.forgot': 'Forgot password?',
        'login.submit': 'Login',
        'login.register': "Don't have an account? Register now",
        'login.version': 'Version 1.0.0 | © 2025 Financial System',
    },
    ur: {
        // Sidebar
        'app.title': 'مالیاتی نظام',
        'app.subtitle': 'Financial System',
        'menu.dashboard': 'ڈیش بورڈ',
        'menu.accounts': 'اکاؤنٹس کا چارٹ',
        'menu.journal': 'جرنل انٹریز',
        'menu.sales': 'فروخت',
        'menu.purchases': 'خریداری',
        'menu.inventory': 'انوینٹری',
        'menu.contacts': 'گاہک اور سپلائرز',
        'menu.settings': 'ترتیبات',
        'user.name': 'نظام صارف',
        'user.role': 'System User',

        // TopBar
        'search.placeholder': 'تلاش کریں...',

        // Dashboard
        'dashboard.title': 'ڈیش بورڈ',
        'dashboard.subtitle': 'Dashboard Overview',
        'stats.assets': 'کل اثاثے',
        'stats.revenue': 'کل آمدنی',
        'stats.expenses': 'کل اخراجات',
        'stats.profit': 'خالص منافع',
        'currency': 'روپے',
        'transactions.title': 'حالیہ لین دین',
        'transactions.viewAll': 'سب دیکھیں',

        // Chart of Accounts
        'accounts.title': 'اکاؤنٹس کا چارٹ',
        'accounts.subtitle': 'Chart of Accounts - Hierarchical View',
        'accounts.add': 'نیا اکاؤنٹ شامل کریں',
        'accounts.name': 'اکاؤنٹ کا نام',
        'accounts.type': 'قسم',
        'accounts.balance': 'بیلنس',
        'accounts.actions': 'اقدامات',
        'accounts.assets': 'اثاثے',
        'accounts.liabilities': 'واجبات',
        'accounts.equity': 'ایکویٹی',

        // Login
        'login.title': 'مالیاتی نظام',
        'login.subtitle': 'Financial Management System',
        'login.username': 'صارف کا نام',
        'login.password': 'پاس ورڈ',
        'login.username.placeholder': 'صارف کا نام درج کریں',
        'login.password.placeholder': 'پاس ورڈ درج کریں',
        'login.remember': 'مجھے یاد رکھیں',
        'login.forgot': 'پاس ورڈ بھول گئے؟',
        'login.submit': 'لاگ ان',
        'login.register': 'اکاؤنٹ نہیں ہے؟ ابھی رجسٹر کریں',
        'login.version': 'Version 1.0.0 | © 2025 Financial System',
    }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('ur');
    const dir = language === 'ur' ? 'rtl' : 'ltr';

    useEffect(() => {
        // Update HTML dir and lang attributes
        document.documentElement.lang = language;
        document.documentElement.dir = dir;
    }, [language, dir]);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'ur' ? 'en' : 'ur');
    };

    const t = (key: string) => {
        return translations[language][key as keyof typeof translations['en']] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, dir, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
