import { motion } from 'framer-motion';
import { useState } from 'react';
import {
    ChartBarIcon,
    DocumentChartBarIcon,
    ScaleIcon,
    ClipboardDocumentListIcon,
    CalendarIcon,
    ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { reportsAPI } from '../services/api';

interface ReportCard {
    id: string;
    title: string;
    description: string;
    icon: any;
    color: string;
    requiresDateRange?: boolean;
    requiresSingleDate?: boolean;
}

const Reports = () => {
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [asOfDate, setAsOfDate] = useState('');

    const reports: ReportCard[] = [
        {
            id: 'trial-balance',
            title: 'Trial Balance',
            description: 'Summary of all account balances',
            icon: ScaleIcon,
            color: 'gold',
            requiresDateRange: true,
        },
        {
            id: 'income-statement',
            title: 'Income Statement (P&L)',
            description: 'Profit and loss statement',
            icon: ChartBarIcon,
            color: 'emerald',
            requiresDateRange: true,
        },
        {
            id: 'balance-sheet',
            title: 'Balance Sheet',
            description: 'Assets, liabilities, and equity',
            icon: DocumentChartBarIcon,
            color: 'blue-400',
            requiresSingleDate: true,
        },
        {
            id: 'ar-aging',
            title: 'AR Aging Report',
            description: 'Accounts receivable aging',
            icon: ClipboardDocumentListIcon,
            color: 'purple-400',
            requiresSingleDate: true,
        },
        {
            id: 'ap-aging',
            title: 'AP Aging Report',
            description: 'Accounts payable aging',
            icon: ClipboardDocumentListIcon,
            color: 'orange-400',
            requiresSingleDate: true,
        },
        {
            id: 'journal-register',
            title: 'Journal Register',
            description: 'All journal entries',
            icon: CalendarIcon,
            color: 'teal-400',
            requiresDateRange: true,
        },
        {
            id: 'day-book',
            title: 'Day Book',
            description: 'Daily transactions summary',
            icon: CalendarIcon,
            color: 'pink-400',
            requiresSingleDate: true,
        },
    ];

    const generateReport = async (reportId: string) => {
        setLoading(true);
        try {
            let response;

            switch (reportId) {
                case 'trial-balance':
                    if (!startDate || !endDate) {
                        alert('Please select date range');
                        return;
                    }
                    response = await reportsAPI.trialBalance({ startDate, endDate });
                    break;

                case 'income-statement':
                    if (!startDate || !endDate) {
                        alert('Please select date range');
                        return;
                    }
                    response = await reportsAPI.incomeStatement({ startDate, endDate });
                    break;

                case 'balance-sheet':
                    if (!asOfDate) {
                        alert('Please select as-of date');
                        return;
                    }
                    response = await reportsAPI.balanceSheet({ asOfDate });
                    break;

                case 'ar-aging':
                    if (!asOfDate) {
                        alert('Please select as-of date');
                        return;
                    }
                    response = await reportsAPI.arAging({ asOfDate });
                    break;

                case 'ap-aging':
                    if (!asOfDate) {
                        alert('Please select as-of date');
                        return;
                    }
                    response = await reportsAPI.apAging({ asOfDate });
                    break;

                case 'journal-register':
                    if (!startDate || !endDate) {
                        alert('Please select date range');
                        return;
                    }
                    response = await reportsAPI.journalRegister({ startDate, endDate });
                    break;

                case 'day-book':
                    if (!asOfDate) {
                        alert('Please select date');
                        return;
                    }
                    response = await reportsAPI.dayBook({ date: asOfDate });
                    break;
            }

            // Handle the response (could download as PDF or display in modal)
            console.log('Report data:', response?.data);
            alert('Report generated successfully! Check console for data.');

        } catch (err) {
            console.error('Failed to generate report:', err);
            alert('Failed to generate report.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-4xl font-light text-white mb-2">Financial Reports</h1>
                <p className="text-silver">Generate comprehensive financial reports</p>
            </div>

            {/* Date Range Selector */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
            >
                <h2 className="text-xl font-light text-white mb-4">Report Parameters</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-silver text-sm mb-2">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full bg-charcoal border border-white/[0.08] rounded-lg px-4 py-2 text-white focus:border-gold/50 focus:outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-silver text-sm mb-2">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full bg-charcoal border border-white/[0.08] rounded-lg px-4 py-2 text-white focus:border-gold/50 focus:outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-silver text-sm mb-2">As Of Date</label>
                        <input
                            type="date"
                            value={asOfDate}
                            onChange={(e) => setAsOfDate(e.target.value)}
                            className="w-full bg-charcoal border border-white/[0.08] rounded-lg px-4 py-2 text-white focus:border-gold/50 focus:outline-none transition-colors"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report, index) => {
                    const Icon = report.icon;
                    return (
                        <motion.div
                            key={report.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="card group cursor-pointer"
                        >
                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${report.color}/20 to-${report.color}/10 flex items-center justify-center mb-4 group-hover:from-${report.color}/30 group-hover:to-${report.color}/20 transition-all`}>
                                <Icon className={`w-6 h-6 text-${report.color}`} />
                            </div>

                            {/* Content */}
                            <h3 className="text-white text-lg font-medium mb-2">{report.title}</h3>
                            <p className="text-silver text-sm mb-4">{report.description}</p>

                            {/* Date Requirement Badge */}
                            <div className="mb-4">
                                {report.requiresDateRange && (
                                    <span className="text-xs bg-gold/10 text-gold px-2 py-1 rounded">
                                        Requires Date Range
                                    </span>
                                )}
                                {report.requiresSingleDate && (
                                    <span className="text-xs bg-blue-400/10 text-blue-400 px-2 py-1 rounded">
                                        Requires As-Of Date
                                    </span>
                                )}
                            </div>

                            {/* Generate Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => generateReport(report.id)}
                                disabled={loading}
                                className="w-full btn-primary flex items-center justify-center gap-2"
                            >
                                <ArrowDownTrayIcon className="w-4 h-4" />
                                Generate Report
                            </motion.button>
                        </motion.div>
                    );
                })}
            </div>

            {loading && (
                <div className="fixed inset-0 bg-void/80 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="card">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-white">Generating report...</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reports;
