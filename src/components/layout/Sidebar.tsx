import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
    HomeIcon,
    ChartBarIcon,
    DocumentTextIcon,
    ShoppingCartIcon,
    CubeIcon,
    UsersIcon,
    CogIcon,
    BanknotesIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '../../context/LanguageContext';

const Sidebar = () => {
    const location = useLocation();
    const { t, language } = useLanguage();

    const menuItems = [
        { key: 'menu.dashboard', path: '/', icon: HomeIcon },
        { key: 'menu.accounts', path: '/accounts', icon: ChartBarIcon },
        { key: 'menu.journal', path: '/journal', icon: DocumentTextIcon },
        { key: 'menu.sales', path: '/sales', icon: ShoppingCartIcon },
        { key: 'menu.purchases', path: '/purchases', icon: BanknotesIcon },
        { key: 'menu.inventory', path: '/inventory', icon: CubeIcon },
        { key: 'menu.contacts', path: '/contacts', icon: UsersIcon },
        { key: 'menu.settings', path: '/settings', icon: CogIcon },
    ];

    return (
        <motion.aside
            initial={{ x: language === 'ur' ? 100 : -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`w-72 glass flex flex-col ${language === 'ur' ? 'border-l' : 'border-r'} border-white/[0.08]`}
        >
            {/* Logo */}
            <div className="p-6 border-b border-white/[0.08]">
                <motion.h1
                    className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light"
                    whileHover={{ scale: 1.02 }}
                >
                    {t('app.title')}
                </motion.h1>
                <p className="text-silver text-sm mt-1">{t('app.subtitle')}</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <Link key={item.path} to={item.path}>
                            <motion.div
                                whileHover={{ x: language === 'ur' ? -5 : 5, backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive
                                        ? `bg-gradient-to-${language === 'ur' ? 'l' : 'r'} from-gold/20 to-transparent ${language === 'ur' ? 'border-r-2' : 'border-l-2'} border-gold`
                                        : 'hover:bg-white/5'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-gold' : 'text-silver'}`} />
                                <div className="flex-1">
                                    <p className={`text-sm font-medium ${isActive ? 'text-white' : 'text-silver'}`}>
                                        {t(item.key)}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-white/[0.08]">
                <motion.div
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer"
                >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-void font-bold">
                        {language === 'ur' ? 'ن' : 'U'}
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-white">{t('user.name')}</p>
                        <p className="text-xs text-silver">{t('user.role')}</p>
                    </div>
                </motion.div>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
