import { motion } from 'framer-motion';
import {
    BanknotesIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline';

const stats = [
    {
        title: 'إجمالي الأصول',
        titleEn: 'Total Assets',
        value: '1,250,000',
        currency: 'ر.س',
        change: '+12.5%',
        isPositive: true,
        icon: BanknotesIcon,
    },
    {
        title: 'إجمالي الإيرادات',
        titleEn: 'Total Revenue',
        value: '850,000',
        currency: 'ر.س',
        change: '+8.2%',
        isPositive: true,
        icon: ArrowTrendingUpIcon,
    },
    {
        title: 'إجمالي المصروفات',
        titleEn: 'Total Expenses',
        value: '420,000',
        currency: 'ر.س',
        change: '-3.1%',
        isPositive: false,
        icon: ArrowTrendingDownIcon,
    },
    {
        title: 'صافي الربح',
        titleEn: 'Net Profit',
        value: '430,000',
        currency: 'ر.س',
        change: '+15.7%',
        isPositive: true,
        icon: DocumentTextIcon,
    },
];

const recentTransactions = [
    { id: 1, description: 'فاتورة مبيعات #1234', descriptionEn: 'Sales Invoice #1234', amount: '+25,000', date: '2025-11-28' },
    { id: 2, description: 'مشتريات مواد خام', descriptionEn: 'Raw Materials Purchase', amount: '-15,000', date: '2025-11-27' },
    { id: 3, description: 'رواتب الموظفين', descriptionEn: 'Employee Salaries', amount: '-45,000', date: '2025-11-26' },
    { id: 4, description: 'فاتورة مبيعات #1235', descriptionEn: 'Sales Invoice #1235', amount: '+18,500', date: '2025-11-25' },
];

const Dashboard = () => {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-4xl font-light text-white mb-2">لوحة التحكم</h1>
                <p className="text-silver">Dashboard Overview</p>
            </div>

            {/* Stats Grid - Bento Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5, backgroundColor: 'rgba(30, 35, 48, 0.9)' }}
                            className="card group cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-lg bg-gradient-to-br from-gold/20 to-gold-light/10 group-hover:from-gold/30 group-hover:to-gold-light/20 transition-all">
                                    <Icon className="w-6 h-6 text-gold" />
                                </div>
                                <span className={`text-sm font-medium ${stat.isPositive ? 'text-emerald' : 'text-ruby'}`}>
                                    {stat.change}
                                </span>
                            </div>

                            <h3 className="text-silver text-sm mb-1">{stat.title}</h3>
                            <p className="text-silver/60 text-xs mb-3">{stat.titleEn}</p>

                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-light text-white">{stat.value}</span>
                                <span className="text-silver text-sm">{stat.currency}</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Recent Transactions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card"
            >
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-light text-white mb-1">المعاملات الأخيرة</h2>
                        <p className="text-silver text-sm">Recent Transactions</p>
                    </div>
                    <button className="btn-secondary text-sm">
                        عرض الكل
                    </button>
                </div>

                <div className="space-y-3">
                    {recentTransactions.map((transaction, index) => (
                        <motion.div
                            key={transaction.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
                            className="flex items-center justify-between p-4 rounded-lg border border-white/[0.05] hover:border-white/[0.1] transition-all"
                        >
                            <div className="flex-1">
                                <p className="text-white font-medium mb-1">{transaction.description}</p>
                                <p className="text-silver text-sm">{transaction.descriptionEn}</p>
                            </div>
                            <div className="text-left">
                                <p className={`text-lg font-medium ${transaction.amount.startsWith('+') ? 'text-emerald' : 'text-ruby'}`}>
                                    {transaction.amount} ر.س
                                </p>
                                <p className="text-silver text-xs">{transaction.date}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
