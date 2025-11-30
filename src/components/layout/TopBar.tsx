import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, BellIcon, UserCircleIcon, LanguageIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../../context/LanguageContext';

const TopBar = () => {
    const { t, toggleLanguage, language } = useLanguage();

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="glass border-b border-white/[0.08] px-8 py-4"
        >
            <div className="flex items-center justify-between">
                {/* Search Bar */}
                <div className="flex-1 max-w-xl">
                    <div className="relative">
                        <MagnifyingGlassIcon className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-silver ${language === 'ur' ? 'right-3' : 'left-3'}`} />
                        <input
                            type="text"
                            placeholder={t('search.placeholder')}
                            className={`input-field w-full ${language === 'ur' ? 'pr-10' : 'pl-10'}`}
                        />
                    </div>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                    {/* Language Toggle */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleLanguage}
                        className="p-2 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
                        title="Switch Language"
                    >
                        <LanguageIcon className="w-6 h-6 text-gold" />
                        <span className="text-sm text-silver font-medium uppercase">{language}</span>
                    </motion.button>

                    {/* Notifications */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                        <BellIcon className="w-6 h-6 text-silver" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-ruby rounded-full"></span>
                    </motion.button>

                    {/* User Menu */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                        <UserCircleIcon className="w-8 h-8 text-gold" />
                    </motion.button>
                </div>
            </div>
        </motion.header>
    );
};

export default TopBar;
