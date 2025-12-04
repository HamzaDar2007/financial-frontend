import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PlusIcon, BuildingOfficeIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { fixedAssetsAPI } from '../services/api';
import FixedAssetForm from './fixed-assets/FixedAssetForm';

interface FixedAsset {
    id: string;
    code: string;
    name: string;
    assetType: string;
    purchaseDate: string;
    purchasePrice: number;
    bookValue: number;
    status: string;
}

const FixedAssets = () => {
    const [assets, setAssets] = useState<FixedAsset[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState<FixedAsset | undefined>(undefined);

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = async () => {
        try {
            const response = await fixedAssetsAPI.getAll();
            setAssets(response.data);
        } catch (err) {
            console.error('Failed to fetch fixed assets:', err);
            setError('Failed to load fixed assets.');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setSelectedAsset(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (asset: FixedAsset) => {
        setSelectedAsset(asset);
        setIsModalOpen(true);
    };

    const handleSuccess = () => {
        fetchAssets();
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-light text-white mb-2">Fixed Assets</h1>
                    <p className="text-silver">Manage company assets and depreciation</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreate}
                    className="btn-primary flex items-center gap-2"
                >
                    <PlusIcon className="w-5 h-5" />
                    Add Asset
                </motion.button>
            </div>

            {error && (
                <div className="bg-ruby/10 border border-ruby/20 text-ruby p-4 rounded-lg">
                    {error}
                </div>
            )}

            <div className="card p-0 overflow-hidden">
                <div className="grid grid-cols-7 gap-4 p-4 border-b border-white/[0.08] bg-charcoal/50 text-silver text-sm font-medium">
                    <div className="col-span-1">Code</div>
                    <div className="col-span-2">Asset Name</div>
                    <div className="col-span-1">Type</div>
                    <div className="col-span-1">Purchase Price</div>
                    <div className="col-span-1">Book Value</div>
                    <div className="col-span-1 text-right">Actions</div>
                </div>

                <div>
                    {loading ? (
                        <div className="p-8 text-center text-silver">Loading assets...</div>
                    ) : assets.length > 0 ? (
                        assets.map((asset, index) => (
                            <motion.div
                                key={asset.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="grid grid-cols-7 gap-4 p-4 border-b border-white/[0.05] hover:bg-white/[0.02] items-center group"
                            >
                                <div className="col-span-1 text-gold font-mono">{asset.code}</div>
                                <div className="col-span-2 text-white font-medium flex items-center gap-3">
                                    <div className="p-2 rounded bg-white/5">
                                        <BuildingOfficeIcon className="w-4 h-4 text-silver" />
                                    </div>
                                    {asset.name}
                                </div>
                                <div className="col-span-1 text-silver capitalize">{asset.assetType || 'Fixed Asset'}</div>
                                <div className="col-span-1 text-white font-mono">${asset.purchasePrice.toLocaleString()}</div>
                                <div className="col-span-1 text-emerald font-mono">${asset.bookValue?.toLocaleString() || asset.purchasePrice.toLocaleString()}</div>
                                <div className="col-span-1 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(asset)}
                                        className="p-2 text-silver hover:text-white hover:bg-white/10 rounded-full"
                                    >
                                        <PencilSquareIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-silver">No fixed assets found.</div>
                    )}
                </div>
            </div>

            <FixedAssetForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
                asset={selectedAsset}
            />
        </div>
    );
};

export default FixedAssets;
