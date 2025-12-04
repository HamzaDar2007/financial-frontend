import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../context/LanguageContext';
import { itemsAPI } from '../services/api';
import ItemForm from './inventory/ItemForm';

const Inventory = () => {
    const { t } = useLanguage();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any | undefined>(undefined);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await itemsAPI.getAll();
            setProducts(response.data);
        } catch (err) {
            console.error('Failed to fetch products:', err);
            setError('Failed to load products.');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setSelectedItem(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (item: any) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleSuccess = () => {
        fetchProducts();
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-light text-white mb-2">{t('menu.inventory')}</h1>
                    <p className="text-silver">Products & Services</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreate}
                    className="btn-primary flex items-center gap-2"
                >
                    <PlusIcon className="w-5 h-5" />
                    New Product
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
                    <div className="flex-1 text-silver text-sm font-medium">Name</div>
                    <div className="text-silver text-sm font-medium w-32">SKU</div>
                    <div className="text-silver text-sm font-medium w-32">Type</div>
                    <div className="text-silver text-sm font-medium w-32">Price</div>
                    <div className="text-silver text-sm font-medium w-32">Stock</div>
                    <div className="text-silver text-sm font-medium w-20 text-right">Actions</div>
                </div>

                <div>
                    {loading ? (
                        <div className="p-8 text-center text-silver">Loading...</div>
                    ) : products.length > 0 ? (
                        products.map((product: any) => (
                            <div key={product.id} className="flex items-center gap-4 p-4 border-b border-white/[0.05] hover:bg-white/[0.02] group">
                                <div className="flex-1 text-white">{product.name}</div>
                                <div className="text-silver text-sm w-32">{product.sku}</div>
                                <div className="text-silver text-sm w-32 capitalize">{product.type?.toLowerCase()}</div>
                                <div className="text-white font-mono w-32">{product.salesPrice} {t('currency')}</div>
                                <div className="text-silver text-sm w-32">{product.stockQuantity || 0}</div>
                                <div className="w-20 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="p-2 text-silver hover:text-white hover:bg-white/10 rounded-full"
                                    >
                                        <PencilSquareIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-silver">No products found.</div>
                    )}
                </div>
            </motion.div>

            <ItemForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
                item={selectedItem}
            />
        </div>
    );
};

export default Inventory;
