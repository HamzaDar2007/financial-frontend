import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LockClosedIcon, UserIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../context/LanguageContext';
import { authAPI } from '../services/api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { t, language } = useLanguage();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        try {
            await authAPI.register({ username, email, password });
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err: any) {
            console.error('Registration failed:', err);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
                {/* Register Card */}
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
                                {t('login.title')}
                            </motion.h1>
                            <motion.p
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-silver"
                            >
                                Create New Account
                            </motion.p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-ruby/10 border border-ruby/20 text-ruby text-sm p-3 rounded-lg mb-4 text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Success Message */}
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-emerald/10 border border-emerald/20 text-emerald text-sm p-3 rounded-lg mb-4 text-center"
                            >
                                {success}
                            </motion.div>
                        )}

                        {/* Register Form */}
                        <form onSubmit={handleRegister} className="space-y-6">
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <label className="block text-silver text-sm mb-2">
                                    Username
                                </label>
                                <div className="relative">
                                    <UserIcon className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-silver ${language === 'ur' ? 'right-3' : 'left-3'}`} />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className={`input-field w-full ${language === 'ur' ? 'pr-10' : 'pl-10'}`}
                                        placeholder="Enter username"
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
                                    Email
                                </label>
                                <div className="relative">
                                    <EnvelopeIcon className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-silver ${language === 'ur' ? 'right-3' : 'left-3'}`} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`input-field w-full ${language === 'ur' ? 'pr-10' : 'pl-10'}`}
                                        placeholder="Enter email"
                                        required
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <label className="block text-silver text-sm mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <LockClosedIcon className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-silver ${language === 'ur' ? 'right-3' : 'left-3'}`} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`input-field w-full ${language === 'ur' ? 'pr-10' : 'pl-10'}`}
                                        placeholder="Enter password"
                                        required
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                <label className="block text-silver text-sm mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <LockClosedIcon className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-silver ${language === 'ur' ? 'right-3' : 'left-3'}`} />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={`input-field w-full ${language === 'ur' ? 'pr-10' : 'pl-10'}`}
                                        placeholder="Confirm password"
                                        required
                                    />
                                </div>
                            </motion.div>

                            <motion.button
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                type="submit"
                                className="btn-primary w-full"
                            >
                                Register
                            </motion.button>
                        </form>

                        {/* Footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="mt-8 text-center"
                        >
                            <p className="text-silver text-sm">
                                Already have an account?{' '}
                                <Link to="/login" className="text-gold hover:text-gold-light transition-colors">
                                    Login here
                                </Link>
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
                    {t('login.version')}
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Register;
