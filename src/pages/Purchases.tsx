import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { purchasesAPI } from '../services/api';

const Purchases = () => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.defaultCompanyId) return;
            try {
                const response = await purchasesAPI.getPurchaseOrders(user.defaultCompanyId);
                setOrders(response.data);
            } catch (err) {
                console.error('Failed to fetch purchase orders:', err);
                setError('Failed to load purchase orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-light text-white mb-2">{t('menu.purchases')}</h1>
                    <p className="text-silver">Purchase Orders</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center gap-2"
                >
                    <PlusIcon className="w-5 h-5" />
                    New Order
                </motion.button>
            </div>

            {error && (
                <div className="bg-ruby/10 border border-ruby/20 text-ruby p-4 rounded-lg">
                    {error}
                </div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-0 overflow-hidden"
            >
                <div className="flex items-center gap-4 p-4 border-b border-white/[0.08] bg-charcoal/50">
                    <div className="flex-1 text-silver text-sm font-medium">Order #</div>
                    <div className="text-silver text-sm font-medium w-32">Vendor</div>
                    <div className="text-silver text-sm font-medium w-32">Date</div>
                    <div className="text-silver text-sm font-medium w-32">Total</div>
                    <div className="text-silver text-sm font-medium w-32">Status</div>
                </div>

                <div>
                    {loading ? (
                        <div className="p-8 text-center text-silver">Loading...</div>
                    ) : orders.length > 0 ? (
                        orders.map((order: any) => (
                            <div key={order.id} className="flex items-center gap-4 p-4 border-b border-white/[0.05] hover:bg-white/[0.02]">
                                <div className="flex-1 text-white">{order.orderNumber}</div>
                                <div className="text-silver text-sm w-32">{order.vendorName || 'N/A'}</div>
                                <div className="text-silver text-sm w-32">{new Date(order.orderDate).toLocaleDateString()}</div>
                                <div className="text-white font-mono w-32">{order.totalAmount} {t('currency')}</div>
                                <div className="text-silver text-sm w-32">{order.status}</div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-silver">No purchase orders found.</div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Purchases;
