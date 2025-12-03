import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
    BanknotesIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { journalEntriesAPI, financialAPI } from '../services/api';
import type { JournalEntry } from '../types';

const Dashboard = () => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [transactions, setTransactions] = useState<JournalEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch recent journal entries
                const journalRes = await journalEntriesAPI.getAll();
                // Take last 5 entries
                setTransactions(journalRes.data.slice(0, 5));
            } catch (err) {
                console.error('Failed to fetch dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const calculateTotal = (entry: JournalEntry) => {
        // Sum of debits (should equal sum of credits)
        return entry.lines.reduce((sum, line) => sum + Number(line.debit), 0);
    };

    const stats = [
        {
            title: t('stats.assets'),
            value: '1,250,000', // TODO: Fetch real stats from backend when available
            currency: t('currency'),
            change: '+12.5%',
            isPositive: true,
            icon: BanknotesIcon,
        },
        {
            title: t('stats.revenue'),
            value: '850,000',
            currency: t('currency'),
            change: '+8.2%',
            isPositive: true,
            icon: ArrowTrendingUpIcon,
        },
        {
            title: t('stats.expenses'),
            value: '420,000',
            currency: t('currency'),
            change: '-3.1%',
            isPositive: false,
            icon: ArrowTrendingDownIcon,
        },
        {
            title: t('stats.profit'),
            value: '430,000',
            currency: t('currency'),
            change: '+15.7%',
            isPositive: true,
            icon: DocumentTextIcon,
        },
    ];

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-4xl font-light text-white mb-2">{t('dashboard.title')}</h1>
                <p className="text-silver">{t('dashboard.subtitle')}</p>
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
                        <h2 className="text-2xl font-light text-white mb-1">{t('transactions.title')}</h2>
                    </div>
                    <button className="btn-secondary text-sm">
                        {t('transactions.viewAll')}
                    </button>
                </div>

                <div className="space-y-3">
                    {loading ? (
                        <div className="text-silver text-center py-4">Loading transactions...</div>
                    ) : transactions.length > 0 ? (
                        transactions.map((transaction, index) => (
                            <motion.div
                                key={transaction.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
                                className="flex items-center justify-between p-4 rounded-lg border border-white/[0.05] hover:border-white/[0.1] transition-all"
                            >
                                <div className="flex-1">
                                    <p className="text-white font-medium mb-1">{transaction.description || 'Journal Entry'}</p>
                                    <p className="text-silver text-xs">{transaction.reference}</p>
                                </div>
                                <div className="text-left">
                                    <p className="text-lg font-medium text-white">
                                        {calculateTotal(transaction).toLocaleString()} {t('currency')}
                                    </p>
                                    <p className="text-silver text-xs">{new Date(transaction.entryDate).toLocaleDateString()}</p>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-silver text-center py-4">No recent transactions found.</div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
