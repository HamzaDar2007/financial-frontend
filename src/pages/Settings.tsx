import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
    UserIcon,
    BuildingOfficeIcon,
    CalendarIcon,
    BanknotesIcon,
    CurrencyDollarIcon,
    UsersIcon
} from '@heroicons/react/24/outline';
import {
    companiesAPI,
    fiscalYearsAPI,
    taxCategoriesAPI,
    currenciesAPI,
    usersAPI
} from '../services/api';

const Settings = () => {
    const { t } = useLanguage();
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const tabs = [
        { id: 'profile', label: 'Profile', icon: UserIcon },
        { id: 'companies', label: 'Companies', icon: BuildingOfficeIcon },
        { id: 'fiscal-years', label: 'Fiscal Years', icon: CalendarIcon },
        { id: 'taxes', label: 'Tax Categories', icon: BanknotesIcon },
        { id: 'currencies', label: 'Currencies', icon: CurrencyDollarIcon },
        { id: 'users', label: 'Users', icon: UsersIcon },
    ];

    useEffect(() => {
        if (activeTab !== 'profile') {
            fetchData(activeTab);
        }
    }, [activeTab]);

    const fetchData = async (tab: string) => {
        setLoading(true);
        try {
            let response;
            switch (tab) {
                case 'companies':
                    response = await companiesAPI.getAll();
                    break;
                case 'fiscal-years':
                    response = await fiscalYearsAPI.getAll();
                    break;
                case 'taxes':
                    response = await taxCategoriesAPI.getAll();
                    break;
                case 'currencies':
                    response = await currenciesAPI.getAll();
                    break;
                case 'users':
                    response = await usersAPI.getAll();
                    break;
            }
            if (response) setData(response.data);
        } catch (err) {
            console.error(`Failed to fetch ${tab}:`, err);
        } finally {
            setLoading(false);
        }
    };

    const renderContent = () => {
        if (activeTab === 'profile') {
            return (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl text-white mb-4">User Profile</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-silver text-sm mb-1">Username</label>
                                <div className="text-white p-3 rounded bg-white/[0.05]">{user?.username}</div>
                            </div>
                            <div>
                                <label className="block text-silver text-sm mb-1">Email</label>
                                <div className="text-white p-3 rounded bg-white/[0.05]">{user?.email}</div>
                            </div>
                            <div>
                                <label className="block text-silver text-sm mb-1">Role</label>
                                <div className="text-white p-3 rounded bg-white/[0.05]">{user?.role || 'N/A'}</div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-white/[0.1]">
                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-ruby/20 text-ruby rounded hover:bg-ruby/30 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            );
        }

        if (loading) return <div className="text-silver text-center p-8">Loading...</div>;

        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl text-white capitalize">{activeTab.replace('-', ' ')}</h2>
                    <button className="btn-primary text-sm px-3 py-1">Add New</button>
                </div>

                {data.length > 0 ? (
                    <div className="grid gap-4">
                        {data.map((item: any, idx) => (
                            <div key={item.id || idx} className="p-4 rounded bg-white/[0.05] border border-white/[0.05] flex justify-between items-center">
                                <div>
                                    <p className="text-white font-medium">{item.name || item.code || item.username}</p>
                                    <p className="text-silver text-sm">{item.description || item.email || item.symbol}</p>
                                </div>
                                <div className="text-silver text-sm">
                                    {item.isActive !== undefined ? (
                                        <span className={`px-2 py-1 rounded text-xs ${item.isActive ? 'bg-emerald/20 text-emerald' : 'bg-ruby/20 text-ruby'}`}>
                                            {item.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-silver text-center p-8 border border-dashed border-white/[0.1] rounded">
                        No items found.
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-4xl font-light text-white mb-2">{t('menu.settings')}</h1>
                <p className="text-silver">System Configuration</p>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Sidebar Tabs */}
                <div className="col-span-12 md:col-span-3 space-y-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === tab.id
                                        ? 'bg-gold/20 text-gold border border-gold/30'
                                        : 'text-silver hover:bg-white/[0.05]'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="col-span-12 md:col-span-9">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="card min-h-[400px]"
                    >
                        {renderContent()}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
