import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { t, language } = useLanguage();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await authAPI.login({ email, password });
            const { access_token, user } = response.data;
            login(access_token, user);
            // Force a full page reload to ensure auth state is recognized
            window.location.href = '/';
        } catch (err: any) {
            console.error('Login failed:', err);
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 aurora-bg">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="glass rounded-2xl p-8 noise-texture relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold/20 to-transparent rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="text-center mb-8">
                            <motion.h1
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light mb-2"
                            >
                                {t('login.title')}
                            </motion.h1>
                            <motion.p
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-silver"
                            >
                                {t('login.subtitle')}
                            </motion.p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-ruby/10 border border-ruby/20 text-ruby text-sm p-3 rounded-lg mb-4 text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <label className="block text-silver text-sm mb-2">
                                    {t('login.username')} (Email)
                                </label>
                                <div className="relative">
                                    <UserIcon className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-silver ${language === 'ur' ? 'right-3' : 'left-3'}`} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`input-field w-full ${language === 'ur' ? 'pr-10' : 'pl-10'}`}
                                        placeholder={t('login.username.placeholder')}
                                        required
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <label className="block text-silver text-sm mb-2">
                                    {t('login.password')}
                                </label>
                                <div className="relative">
                                    <LockClosedIcon className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-silver ${language === 'ur' ? 'right-3' : 'left-3'}`} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`input-field w-full ${language === 'ur' ? 'pr-10' : 'pl-10'}`}
                                        placeholder={t('login.password.placeholder')}
                                        required
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="flex items-center justify-between text-sm"
                            >
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="rounded" />
                                    <span className="text-silver">{t('login.remember')}</span>
                                </label>
                                <a href="#" className="text-gold hover:text-gold-light transition-colors">
                                    {t('login.forgot')}
                                </a>
                            </motion.div>

                            <motion.button
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                type="submit"
                                className="btn-primary w-full"
                            >
                                {t('login.submit')}
                            </motion.button>
                        </form>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-8 text-center"
                        >
                            <p className="text-silver text-sm">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-gold hover:text-gold-light transition-colors">
                                    Register here
                                </Link>
                            </p>
                        </motion.div>
                    </div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center text-silver/50 text-xs mt-4"
                >
                    {t('login.version')}
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Login;
