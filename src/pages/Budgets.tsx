import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
<<<<<<< HEAD
import { PlusIcon, ChartBarIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { budgetsAPI } from '../services/api';
import BudgetForm from './budgets/BudgetForm';
=======
import { PlusIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { budgetsAPI } from '../services/api';
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3

interface Budget {
    id: string;
    name: string;
    fiscalYearId: string;
    totalAmount: number;
    status: string;
<<<<<<< HEAD
    description?: string;
=======
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3
}

const Budgets = () => {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
<<<<<<< HEAD
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState<Budget | undefined>(undefined);
=======
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3

    useEffect(() => {
        fetchBudgets();
    }, []);

    const fetchBudgets = async () => {
        try {
            const response = await budgetsAPI.getAll();
            setBudgets(response.data);
        } catch (err) {
            console.error('Failed to fetch budgets:', err);
            setError('Failed to load budgets.');
        } finally {
            setLoading(false);
        }
    };

<<<<<<< HEAD
    const handleCreate = () => {
        setSelectedBudget(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (budget: Budget) => {
        setSelectedBudget(budget);
        setIsModalOpen(true);
    };

    const handleSuccess = () => {
        fetchBudgets();
        setIsModalOpen(false);
    };

=======
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-light text-white mb-2">Budgets</h1>
                    <p className="text-silver">Plan and track financial budgets</p>
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
                    Create Budget
                </motion.button>
            </div>

            {error && (
                <div className="bg-ruby/10 border border-ruby/20 text-ruby p-4 rounded-lg">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full p-8 text-center text-silver">Loading budgets...</div>
                ) : budgets.length > 0 ? (
                    budgets.map((budget, index) => (
                        <motion.div
                            key={budget.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
<<<<<<< HEAD
                            className="card group relative"
                        >
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleEdit(budget); }}
                                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white"
                                >
                                    <PencilSquareIcon className="w-4 h-4" />
                                </button>
                            </div>

=======
                            className="card group cursor-pointer"
                        >
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-lg bg-emerald/10 text-emerald">
                                    <ChartBarIcon className="w-6 h-6" />
                                </div>
                                <span className="px-2 py-1 rounded text-xs bg-gold/20 text-gold">
                                    FY 2024
                                </span>
                            </div>

                            <h3 className="text-xl text-white font-medium mb-1">{budget.name}</h3>
<<<<<<< HEAD
                            <p className="text-silver text-sm mb-4">{budget.description || 'Annual Budget'}</p>
=======
                            <p className="text-silver text-sm mb-4">Annual Budget</p>
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3

                            <div className="flex justify-between items-end border-t border-white/[0.05] pt-4">
                                <div>
                                    <p className="text-silver text-xs mb-1">Total Budget</p>
                                    <p className="text-white font-mono text-lg">${budget.totalAmount?.toLocaleString() || '0'}</p>
                                </div>
                                <span className="text-xs text-emerald">+12% vs LY</span>
                            </div>
                        </motion.div>
                    ))
                ) : (
<<<<<<< HEAD
                    <div className="col-span-full p-8 text-center text-silver">No budgets found. Click "Create Budget" to add one.</div>
                )}
            </div>

            <BudgetForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
                budget={selectedBudget}
            />
=======
                    <div className="col-span-full p-8 text-center text-silver">No budgets found.</div>
                )}
            </div>
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3
        </div>
    );
};

export default Budgets;
