import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { accountsAPI } from '../services/api';
import AccountForm from './accounts/AccountForm';

interface Account {
    id: string;
    code?: string;
    accountName: string;
    accountNameEn?: string;
    accountType: string;
    parentAccountId?: string;
    children?: Account[];
    balance?: number;
    description?: string;
}

const AccountRow = ({
    account,
    level = 0,
    onEdit,
    onDelete
}: {
    account: Account;
    level?: number;
    onEdit: (account: Account) => void;
    onDelete: (id: string) => void;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { t, language } = useLanguage();
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

    const ChevronIcon = language === 'ur' ? ChevronLeftIcon : ChevronRightIcon;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
                className="flex items-center gap-4 p-4 border-b border-white/[0.05] cursor-pointer group"
                style={{ [language === 'ur' ? 'paddingRight' : 'paddingLeft']: `${level * 2 + 1}rem` }}
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
                            <ChevronIcon className="w-4 h-4 text-silver" />
                        )
                    ) : (
                        <div className="w-2 h-2 rounded-full bg-silver/30"></div>
                    )}
                </button>

                {/* Account Name */}
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className="text-gold font-mono text-xs">{account.code}</span>
                        <p className="text-white font-medium">{account.accountName}</p>
                    </div>
                    {account.accountNameEn && (
                        <p className="text-silver text-xs">{account.accountNameEn}</p>
                    )}
                </div>

                {/* Account Type */}
                <span className={`text-sm ${getTypeColor(account.accountType)} w-24`}>
                    {account.accountType}
                </span>

                {/* Balance */}
                <span className="text-white font-mono w-32 text-left">
                    {account.balance ? account.balance.toLocaleString() : '0'} {t('currency')}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-2 w-24 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onEdit(account)}
                        className="p-2 rounded-lg hover:bg-gold/10 transition-colors"
                    >
                        <PencilIcon className="w-4 h-4 text-gold" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onDelete(account.id)}
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
                        <AccountRow
                            key={child.id}
                            account={child}
                            level={level + 1}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </motion.div>
            )}
        </>
    );
};

const ChartOfAccounts = () => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<Account | undefined>(undefined);

    useEffect(() => {
        fetchAccounts();
    }, [user]);

    const fetchAccounts = async () => {
        try {
            const response = await accountsAPI.getAll();
            const flatAccounts = response.data;
            const tree = buildAccountTree(flatAccounts);
            setAccounts(tree);
        } catch (err) {
            console.error('Failed to fetch accounts:', err);
            setError('Failed to load accounts.');
        } finally {
            setLoading(false);
        }
    };

    const buildAccountTree = (flatList: any[]): Account[] => {
        const map = new Map<string, Account>();
        const roots: Account[] = [];

        // First pass: create nodes
        flatList.forEach(item => {
            map.set(item.id, { ...item, children: [] });
        });

        // Second pass: connect children to parents
        flatList.forEach(item => {
            const node = map.get(item.id)!;
            if (item.parentAccountId && map.has(item.parentAccountId)) {
                map.get(item.parentAccountId)!.children!.push(node);
            } else {
                roots.push(node);
            }
        });

        return roots;
    };

    const handleCreate = () => {
        setSelectedAccount(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (account: Account) => {
        setSelectedAccount(account);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this account?')) return;

        try {
            await accountsAPI.delete(id);
            fetchAccounts();
        } catch (err) {
            console.error('Failed to delete account:', err);
            alert('Failed to delete account. It may have associated transactions.');
        }
    };

    const handleSuccess = () => {
        fetchAccounts();
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-light text-white mb-2">{t('accounts.title')}</h1>
                    <p className="text-silver">{t('accounts.subtitle')}</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreate}
                    className="btn-primary flex items-center gap-2"
                >
                    <PlusIcon className="w-5 h-5" />
                    {t('accounts.add')}
                </motion.button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-ruby/10 border border-ruby/20 text-ruby p-4 rounded-lg">
                    {error}
                </div>
            )}

            {/* Accounts Tree */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-0 overflow-hidden"
            >
                {/* Table Header */}
                <div className="flex items-center gap-4 p-4 border-b border-white/[0.08] bg-charcoal/50">
                    <div className="w-6"></div>
                    <div className="flex-1 text-silver text-sm font-medium">{t('accounts.name')}</div>
                    <div className="text-silver text-sm font-medium w-24">{t('accounts.type')}</div>
                    <div className="text-silver text-sm font-medium w-32">{t('accounts.balance')}</div>
                    <div className="text-silver text-sm font-medium w-24">{t('accounts.actions')}</div>
                </div>

                {/* Accounts List */}
                <div>
                    {loading ? (
                        <div className="p-8 text-center text-silver">Loading accounts...</div>
                    ) : accounts.length > 0 ? (
                        accounts.map((account) => (
                            <AccountRow
                                key={account.id}
                                account={account}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <div className="p-8 text-center text-silver">No accounts found.</div>
                    )}
                </div>
            </motion.div>

            {/* Legend */}
            <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald"></div>
                    <span className="text-silver">{t('accounts.assets')}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-ruby"></div>
                    <span className="text-silver">{t('accounts.liabilities')}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gold"></div>
                    <span className="text-silver">{t('accounts.equity')}</span>
                </div>
            </div>

            <AccountForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
                account={selectedAccount}
            />
        </div>
    );
};

export default ChartOfAccounts;
