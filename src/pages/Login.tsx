import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement actual authentication
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 aurora-bg">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                {/* Login Card */}
                <div className="glass rounded-2xl p-8 noise-texture relative overflow-hidden">
                    {/* Decorative Gradient */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold/20 to-transparent rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        {/* Logo */}
                        <div className="text-center mb-8">
                            <motion.h1
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light mb-2"
                            >
                                النظام المالي
                            </motion.h1>
                            <motion.p
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-silver"
                            >
                                Financial Management System
                            </motion.p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleLogin} className="space-y-6">
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <label className="block text-silver text-sm mb-2">
                                    اسم المستخدم / Username
                                </label>
                                <div className="relative">
                                    <UserIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-silver" />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="input-field w-full pr-10"
                                        placeholder="أدخل اسم المستخدم"
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
                                    كلمة المرور / Password
                                </label>
                                <div className="relative">
                                    <LockClosedIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-silver" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="input-field w-full pr-10"
                                        placeholder="أدخل كلمة المرور"
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
                                    <span className="text-silver">تذكرني</span>
                                </label>
                                <a href="#" className="text-gold hover:text-gold-light transition-colors">
                                    نسيت كلمة المرور؟
                                </a>
                            </motion.div>

                            <motion.button
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                type="submit"
                                className="btn-primary w-full"
                            >
                                تسجيل الدخول / Login
                            </motion.button>
                        </form>

                        {/* Footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-8 text-center"
                        >
                            <p className="text-silver text-sm">
                                ليس لديك حساب؟{' '}
                                <a href="#" className="text-gold hover:text-gold-light transition-colors">
                                    سجل الآن
                                </a>
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Version Info */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center text-silver/50 text-xs mt-4"
                >
                    Version 1.0.0 | © 2025 Financial System
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Login;
