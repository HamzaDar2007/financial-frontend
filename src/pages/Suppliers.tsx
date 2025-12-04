import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { suppliersAPI } from '../services/api';
<<<<<<< HEAD
import SupplierForm from './suppliers/SupplierForm';
=======
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3

interface Supplier {
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

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showWithBalance, setShowWithBalance] = useState(false);
<<<<<<< HEAD
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | undefined>(undefined);
=======
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3

    useEffect(() => {
        fetchSuppliers();
    }, [showWithBalance]);

    const fetchSuppliers = async () => {
        try {
            const response = showWithBalance
                ? await suppliersAPI.getWithBalance()
                : await suppliersAPI.getAll();
            setSuppliers(response.data);
        } catch (err) {
            console.error('Failed to fetch suppliers:', err);
            setError('Failed to load suppliers.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this supplier?')) return;

        try {
            await suppliersAPI.delete(id);
            fetchSuppliers();
        } catch (err) {
            console.error('Failed to delete supplier:', err);
            alert('Failed to delete supplier.');
        }
    };

<<<<<<< HEAD
    const handleCreate = () => {
        setSelectedSupplier(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (supplier: Supplier) => {
        setSelectedSupplier(supplier);
        setIsModalOpen(true);
    };

    const handleSuccess = () => {
        fetchSuppliers();
        setIsModalOpen(false);
    };

=======
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-light text-white mb-2">Suppliers</h1>
                    <p className="text-silver">Manage your supplier accounts</p>
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
                    Add Supplier
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
                    <BuildingOfficeIcon className="w-5 h-5 inline mr-2" />
                    {showWithBalance ? 'Showing With Balance' : 'Show All'}
                </button>
            </div>

            {error && (
                <div className="bg-ruby/10 border border-ruby/20 text-ruby p-4 rounded-lg">
                    {error}
                </div>
            )}

            {/* Suppliers Table */}
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
                        <div className="p-8 text-center text-silver">Loading suppliers...</div>
                    ) : suppliers.length > 0 ? (
                        suppliers.map((supplier, index) => (
                            <motion.div
                                key={supplier.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
                                className="grid grid-cols-12 gap-4 p-4 border-b border-white/[0.05]"
                            >
                                <div className="col-span-1 text-gold font-mono">{supplier.code}</div>
                                <div className="col-span-2 text-white font-medium">{supplier.name}</div>
                                <div className="col-span-2 text-silver text-sm">{supplier.email}</div>
                                <div className="col-span-2 text-silver text-sm">{supplier.phone}</div>
                                <div className="col-span-1 text-white font-mono">
                                    {supplier.creditLimit.toLocaleString()}
                                </div>
                                <div className="col-span-1 text-silver">{supplier.paymentTerms}</div>
                                {showWithBalance && (
                                    <div className="col-span-1 text-white font-mono">
                                        {supplier.balance?.toLocaleString() || '0'}
                                    </div>
                                )}
                                <div className={`flex items-center gap-2 ${showWithBalance ? "col-span-2" : "col-span-3"}`}>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
<<<<<<< HEAD
                                        onClick={() => handleEdit(supplier)}
=======
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3
                                        className="p-2 rounded-lg hover:bg-gold/10 transition-colors"
                                    >
                                        <PencilIcon className="w-4 h-4 text-gold" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleDelete(supplier.id)}
                                        className="p-2 rounded-lg hover:bg-ruby/10 transition-colors"
                                    >
                                        <TrashIcon className="w-4 h-4 text-ruby" />
                                    </motion.button>
                                    <span className={`px-2 py-1 rounded text-xs ${supplier.isActive
                                        ? 'bg-emerald/20 text-emerald'
                                        : 'bg-ruby/20 text-ruby'
                                        }`}>
                                        {supplier.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-silver">No suppliers found.</div>
                    )}
                </div>
            </motion.div>
<<<<<<< HEAD

            <SupplierForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
                supplier={selectedSupplier}
            />
=======
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3
        </div>
    );
};

export default Suppliers;
