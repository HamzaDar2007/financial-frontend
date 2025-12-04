import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
<<<<<<< HEAD
import { PlusIcon, CheckCircleIcon, XCircleIcon, EyeIcon } from '@heroicons/react/24/outline';
import { reconciliationsAPI } from '../services/api';
import ReconciliationForm from './reconciliation/ReconciliationForm';
=======
import { PlusIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { reconciliationsAPI } from '../services/api';
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3

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
<<<<<<< HEAD
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReconciliation, setSelectedReconciliation] = useState<Reconciliation | undefined>(undefined);
=======
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3

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

<<<<<<< HEAD
    const handleCreate = () => {
        setSelectedReconciliation(undefined);
        setIsModalOpen(true);
    };

    const handleView = (rec: Reconciliation) => {
        setSelectedReconciliation(rec);
        setIsModalOpen(true);
    };

    const handleSuccess = () => {
        fetchReconciliations();
        setIsModalOpen(false);
    };

=======
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3
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
<<<<<<< HEAD
                    onClick={handleCreate}
=======
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3
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
<<<<<<< HEAD
                <div className="grid grid-cols-7 gap-4 p-4 border-b border-white/[0.08] bg-charcoal/50 text-silver text-sm font-medium">
=======
                <div className="grid grid-cols-6 gap-4 p-4 border-b border-white/[0.08] bg-charcoal/50 text-silver text-sm font-medium">
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3
                    <div className="col-span-1">Date</div>
                    <div className="col-span-1">Account</div>
                    <div className="col-span-1">Statement Bal.</div>
                    <div className="col-span-1">Book Bal.</div>
                    <div className="col-span-1">Difference</div>
                    <div className="col-span-1">Status</div>
<<<<<<< HEAD
                    <div className="col-span-1 text-right">Actions</div>
=======
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3
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
<<<<<<< HEAD
                                className="grid grid-cols-7 gap-4 p-4 border-b border-white/[0.05] hover:bg-white/[0.02] items-center group"
=======
                                className="grid grid-cols-6 gap-4 p-4 border-b border-white/[0.05] hover:bg-white/[0.02] items-center"
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3
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
<<<<<<< HEAD
                                <div className="col-span-1 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleView(rec)}
                                        className="p-2 text-silver hover:text-white hover:bg-white/10 rounded-full"
                                        title="View Details"
                                    >
                                        <EyeIcon className="w-4 h-4" />
                                    </button>
                                </div>
=======
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3
                            </motion.div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-silver">No reconciliations found.</div>
                    )}
                </div>
            </div>
<<<<<<< HEAD

            <ReconciliationForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
                reconciliation={selectedReconciliation}
            />
=======
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3
        </div>
    );
};

export default Reconciliation;
