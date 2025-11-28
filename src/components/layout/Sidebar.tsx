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

const menuItems = [
    { name: 'لوحة التحكم', nameEn: 'Dashboard', path: '/', icon: HomeIcon },
    { name: 'شجرة الحسابات', nameEn: 'Chart of Accounts', path: '/accounts', icon: ChartBarIcon },
    { name: 'القيود اليومية', nameEn: 'Journal Entries', path: '/journal', icon: DocumentTextIcon },
    { name: 'المبيعات', nameEn: 'Sales', path: '/sales', icon: ShoppingCartIcon },
    { name: 'المشتريات', nameEn: 'Purchases', path: '/purchases', icon: BanknotesIcon },
    { name: 'المخزون', nameEn: 'Inventory', path: '/inventory', icon: CubeIcon },
    { name: 'العملاء والموردين', nameEn: 'Contacts', path: '/contacts', icon: UsersIcon },
    { name: 'الإعدادات', nameEn: 'Settings', path: '/settings', icon: CogIcon },
];

const Sidebar = () => {
    const location = useLocation();

    return (
        <motion.aside
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-72 glass border-l border-white/[0.08] flex flex-col"
        >
            {/* Logo */}
            <div className="p-6 border-b border-white/[0.08]">
                <motion.h1
                    className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light"
                    whileHover={{ scale: 1.02 }}
                >
                    النظام المالي
                </motion.h1>
                <p className="text-silver text-sm mt-1">Financial System</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <Link key={item.path} to={item.path}>
                            <motion.div
                                whileHover={{ x: -5, backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive
                                        ? 'bg-gradient-to-l from-gold/20 to-transparent border-r-2 border-gold'
                                        : 'hover:bg-white/5'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-gold' : 'text-silver'}`} />
                                <div className="flex-1">
                                    <p className={`text-sm font-medium ${isActive ? 'text-white' : 'text-silver'}`}>
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-silver/60">{item.nameEn}</p>
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
                        م
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-white">مستخدم النظام</p>
                        <p className="text-xs text-silver">System User</p>
                    </div>
                </motion.div>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
