import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { customersAPI } from '../services/api';

interface Customer {
    id: string;
    code: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    creditLimit: number;
    paymentTerms: number;
    balance?: number;
    isActive: boolean;
}

const Customers = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showWithBalance, setShowWithBalance] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, [showWithBalance]);

    const fetchCustomers = async () => {
        try {
            const response = showWithBalance
                ? await customersAPI.getWithBalance()
                : await customersAPI.getAll();
            setCustomers(response.data);
        } catch (err) {
            console.error('Failed to fetch customers:', err);
            setError('Failed to load customers.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this customer?')) return;

        try {
            await customersAPI.delete(id);
            fetchCustomers();
        } catch (err) {
            console.error('Failed to delete customer:', err);
            alert('Failed to delete customer.');
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-light text-white mb-2">Customers</h1>
                    <p className="text-silver">Manage your customer accounts</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center gap-2"
                >
                    <PlusIcon className="w-5 h-5" />
                    Add Customer
                </motion.button>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setShowWithBalance(!showWithBalance)}
                    className={`px-4 py-2 rounded-lg transition-all ${showWithBalance
                        ? 'bg-gold/20 text-gold border border-gold/30'
                        : 'bg-charcoal text-silver border border-white/[0.08]'
                        }`}
                >
                    <UserGroupIcon className="w-5 h-5 inline mr-2" />
                    {showWithBalance ? 'Showing With Balance' : 'Show All'}
                </button>
            </div>

            {error && (
                <div className="bg-ruby/10 border border-ruby/20 text-ruby p-4 rounded-lg">
                    {error}
                </div>
            )}

            {/* Customers Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-0 overflow-hidden"
            >
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/[0.08] bg-charcoal/50 text-silver text-sm font-medium">
                    <div className="col-span-1">Code</div>
                    <div className="col-span-2">Name</div>
                    <div className="col-span-2">Email</div>
                    <div className="col-span-2">Phone</div>
                    <div className="col-span-1">Credit Limit</div>
                    <div className="col-span-1">Terms (Days)</div>
                    {showWithBalance && <div className="col-span-1">Balance</div>}
                    <div className={showWithBalance ? "col-span-2" : "col-span-3"}>Actions</div>
                </div>

                {/* Table Body */}
                <div>
                    {loading ? (
                        <div className="p-8 text-center text-silver">Loading customers...</div>
                    ) : customers.length > 0 ? (
                        customers.map((customer, index) => (
                            <motion.div
                                key={customer.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
                                className="grid grid-cols-12 gap-4 p-4 border-b border-white/[0.05]"
                            >
                                <div className="col-span-1 text-gold font-mono">{customer.code}</div>
                                <div className="col-span-2 text-white font-medium">{customer.name}</div>
                                <div className="col-span-2 text-silver text-sm">{customer.email}</div>
                                <div className="col-span-2 text-silver text-sm">{customer.phone}</div>
                                <div className="col-span-1 text-white font-mono">
                                    {customer.creditLimit.toLocaleString()}
                                </div>
                                <div className="col-span-1 text-silver">{customer.paymentTerms}</div>
                                {showWithBalance && (
                                    <div className="col-span-1 text-white font-mono">
                                        {customer.balance?.toLocaleString() || '0'}
                                    </div>
                                )}
                                <div className={`flex items-center gap-2 ${showWithBalance ? "col-span-2" : "col-span-3"}`}>
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
                                        onClick={() => handleDelete(customer.id)}
                                        className="p-2 rounded-lg hover:bg-ruby/10 transition-colors"
                                    >
                                        <TrashIcon className="w-4 h-4 text-ruby" />
                                    </motion.button>
                                    <span className={`px-2 py-1 rounded text-xs ${customer.isActive
                                        ? 'bg-emerald/20 text-emerald'
                                        : 'bg-ruby/20 text-ruby'
                                        }`}>
                                        {customer.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-silver">No customers found.</div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Customers;
