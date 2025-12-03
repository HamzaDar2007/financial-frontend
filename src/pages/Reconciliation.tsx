import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PlusIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { reconciliationsAPI } from '../services/api';

interface Reconciliation {
    id: string;
    accountId: string;
    statementDate: string;
    statementBalance: number;
    bookBalance: number;
    difference: number;
    status: string;
}

const Reconciliation = () => {
    const [reconciliations, setReconciliations] = useState<Reconciliation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchReconciliations();
    }, []);

    const fetchReconciliations = async () => {
        try {
            const response = await reconciliationsAPI.getAll();
            setReconciliations(response.data);
        } catch (err) {
            console.error('Failed to fetch reconciliations:', err);
            setError('Failed to load reconciliations.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-light text-white mb-2">Bank Reconciliation</h1>
                    <p className="text-silver">Reconcile bank statements with book records</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center gap-2"
                >
                    <PlusIcon className="w-5 h-5" />
                    New Reconciliation
                </motion.button>
            </div>

            {error && (
                <div className="bg-ruby/10 border border-ruby/20 text-ruby p-4 rounded-lg">
                    {error}
                </div>
            )}

            <div className="card p-0 overflow-hidden">
                <div className="grid grid-cols-6 gap-4 p-4 border-b border-white/[0.08] bg-charcoal/50 text-silver text-sm font-medium">
                    <div className="col-span-1">Date</div>
                    <div className="col-span-1">Account</div>
                    <div className="col-span-1">Statement Bal.</div>
                    <div className="col-span-1">Book Bal.</div>
                    <div className="col-span-1">Difference</div>
                    <div className="col-span-1">Status</div>
                </div>

                <div>
                    {loading ? (
                        <div className="p-8 text-center text-silver">Loading reconciliations...</div>
                    ) : reconciliations.length > 0 ? (
                        reconciliations.map((rec, index) => (
                            <motion.div
                                key={rec.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="grid grid-cols-6 gap-4 p-4 border-b border-white/[0.05] hover:bg-white/[0.02] items-center"
                            >
                                <div className="col-span-1 text-white">{new Date(rec.statementDate).toLocaleDateString()}</div>
                                <div className="col-span-1 text-silver">Bank Account</div>
                                <div className="col-span-1 text-white font-mono">${rec.statementBalance.toLocaleString()}</div>
                                <div className="col-span-1 text-white font-mono">${rec.bookBalance?.toLocaleString() || '0'}</div>
                                <div className={`col-span-1 font-mono ${rec.difference === 0 ? 'text-emerald' : 'text-ruby'}`}>
                                    ${rec.difference?.toLocaleString() || '0'}
                                </div>
                                <div className="col-span-1">
                                    {rec.difference === 0 ? (
                                        <span className="flex items-center gap-1 text-emerald text-sm">
                                            <CheckCircleIcon className="w-4 h-4" /> Balanced
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-ruby text-sm">
                                            <XCircleIcon className="w-4 h-4" /> Unbalanced
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-silver">No reconciliations found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reconciliation;
