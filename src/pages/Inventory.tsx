import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../context/LanguageContext';
import { itemsAPI } from '../services/api';

const Inventory = () => {
    const { t } = useLanguage();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
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

        fetchProducts();
    }, []);

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
                </div>

                <div>
                    {loading ? (
                        <div className="p-8 text-center text-silver">Loading...</div>
                    ) : products.length > 0 ? (
                        products.map((product: any) => (
                            <div key={product.id} className="flex items-center gap-4 p-4 border-b border-white/[0.05] hover:bg-white/[0.02]">
                                <div className="flex-1 text-white">{product.name}</div>
                                <div className="text-silver text-sm w-32">{product.sku}</div>
                                <div className="text-silver text-sm w-32">{product.type}</div>
                                <div className="text-white font-mono w-32">{product.salesPrice} {t('currency')}</div>
                                <div className="text-silver text-sm w-32">{product.stockQuantity || 0}</div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-silver">No products found.</div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Inventory;
