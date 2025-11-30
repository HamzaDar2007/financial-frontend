import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
    const { t } = useLanguage();
    const { user, logout } = useAuth();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-light text-white mb-2">{t('menu.settings')}</h1>
                    <p className="text-silver">System Configuration</p>
                </div>
            </div>

            <div className="card space-y-6">
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
                        <div>
                            <label className="block text-silver text-sm mb-1">Company ID</label>
                            <div className="text-white p-3 rounded bg-white/[0.05]">{user?.defaultCompanyId || 'N/A'}</div>
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
        </div>
    );
};

export default Settings;
