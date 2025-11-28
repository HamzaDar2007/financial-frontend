import { motion } from 'framer-motion';
import { useState } from 'react';
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon
} from '@heroicons/react/24/outline';

interface Account {
    id: string;
    accountName: string;
    accountType: string;
    parentAccountId?: string;
    children?: Account[];
    balance?: number;
}

// Mock data - Replace with API call
const mockAccounts: Account[] = [
    {
        id: '1',
        accountName: 'الأصول',
        accountType: 'ASSET',
        children: [
            {
                id: '1-1',
                accountName: 'الأصول المتداولة',
                accountType: 'ASSET',
                parentAccountId: '1',
                children: [
                    {
                        id: '1-1-1',
                        accountName: 'النقدية والبنوك',
                        accountType: 'ASSET',
                        parentAccountId: '1-1',
                        children: [
                            { id: '1-1-1-1', accountName: 'الصندوق', accountType: 'ASSET', parentAccountId: '1-1-1', balance: 50000 },
                            { id: '1-1-1-2', accountName: 'البنك الأهلي', accountType: 'ASSET', parentAccountId: '1-1-1', balance: 250000 },
                        ]
                    },
                    {
                        id: '1-1-2',
                        accountName: 'المخزون',
                        accountType: 'ASSET',
                        parentAccountId: '1-1',
                        balance: 180000
                    }
                ]
            }
        ]
    },
    {
        id: '2',
        accountName: 'الخصوم',
        accountType: 'LIABILITY',
        children: [
            {
                id: '2-1',
                accountName: 'الخصوم المتداولة',
                accountType: 'LIABILITY',
                parentAccountId: '2',
                children: [
                    { id: '2-1-1', accountName: 'الموردون', accountType: 'LIABILITY', parentAccountId: '2-1', balance: 75000 },
                ]
            }
        ]
    }
];

const AccountRow = ({ account, level = 0 }: { account: Account; level?: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = account.children && account.children.length > 0;

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'ASSET': return 'text-emerald';
            case 'LIABILITY': return 'text-ruby';
            case 'EQUITY': return 'text-gold';
            case 'REVENUE': return 'text-blue-400';
            case 'EXPENSE': return 'text-orange-400';
            default: return 'text-silver';
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
                className="flex items-center gap-4 p-4 border-b border-white/[0.05] cursor-pointer"
                style={{ paddingRight: `${level * 2 + 1}rem` }}
            >
                {/* Expand/Collapse Button */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-6 h-6 flex items-center justify-center"
                >
                    {hasChildren ? (
                        isExpanded ? (
                            <ChevronDownIcon className="w-4 h-4 text-gold" />
                        ) : (
                            <ChevronLeftIcon className="w-4 h-4 text-silver" />
                        )
                    ) : (
                        <div className="w-2 h-2 rounded-full bg-silver/30"></div>
                    )}
                </button>

                {/* Account Name */}
                <div className="flex-1">
                    <p className="text-white font-medium">{account.accountName}</p>
                    <p className="text-silver text-xs">{account.id}</p>
                </div>

                {/* Account Type */}
                <span className={`text-sm ${getTypeColor(account.accountType)}`}>
                    {account.accountType}
                </span>

                {/* Balance */}
                {account.balance !== undefined && (
                    <span className="text-white font-mono w-32 text-left">
                        {account.balance.toLocaleString()} ر.س
                    </span>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg hover:bg-gold/10 transition-colors"
                    >
                        <PencilIcon className="w-4 h-4 text-gold" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg hover:bg-ruby/10 transition-colors"
                    >
                        <TrashIcon className="w-4 h-4 text-ruby" />
                    </motion.button>
                </div>
            </motion.div>

            {/* Children */}
            {hasChildren && isExpanded && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                >
                    {account.children!.map((child) => (
                        <AccountRow key={child.id} account={child} level={level + 1} />
                    ))}
                </motion.div>
            )}
        </>
    );
};

const ChartOfAccounts = () => {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-light text-white mb-2">شجرة الحسابات</h1>
                    <p className="text-silver">Chart of Accounts - Hierarchical View</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center gap-2"
                >
                    <PlusIcon className="w-5 h-5" />
                    إضافة حساب جديد
                </motion.button>
            </div>

            {/* Accounts Tree */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-0 overflow-hidden"
            >
                {/* Table Header */}
                <div className="flex items-center gap-4 p-4 border-b border-white/[0.08] bg-charcoal/50">
                    <div className="w-6"></div>
                    <div className="flex-1 text-silver text-sm font-medium">اسم الحساب</div>
                    <div className="text-silver text-sm font-medium w-24">النوع</div>
                    <div className="text-silver text-sm font-medium w-32">الرصيد</div>
                    <div className="text-silver text-sm font-medium w-24">الإجراءات</div>
                </div>

                {/* Accounts List */}
                <div>
                    {mockAccounts.map((account) => (
                        <AccountRow key={account.id} account={account} />
                    ))}
                </div>
            </motion.div>

            {/* Legend */}
            <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald"></div>
                    <span className="text-silver">أصول / Assets</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-ruby"></div>
                    <span className="text-silver">خصوم / Liabilities</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gold"></div>
                    <span className="text-silver">حقوق ملكية / Equity</span>
                </div>
            </div>
        </div>
    );
};

export default ChartOfAccounts;
