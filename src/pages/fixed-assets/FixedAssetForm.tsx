import { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { fixedAssetsAPI } from '../../services/api';

interface FixedAssetFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    asset?: any;
}

const FixedAssetForm = ({ isOpen, onClose, onSuccess, asset }: FixedAssetFormProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        purchaseDate: new Date().toISOString().split('T')[0],
        purchaseCost: '',
        salvageValue: '',
        usefulLifeYears: '',
        depreciationMethod: 'STRAIGHT_LINE',
        status: 'ACTIVE'
    });

    useEffect(() => {
        if (asset) {
            setFormData({
                name: asset.name,
                description: asset.description || '',
                purchaseDate: asset.purchaseDate ? new Date(asset.purchaseDate).toISOString().split('T')[0] : '',
                purchaseCost: asset.purchaseCost || asset.purchasePrice || '',
                salvageValue: asset.salvageValue || '0',
                usefulLifeYears: asset.usefulLifeYears || '',
                depreciationMethod: asset.depreciationMethod || 'STRAIGHT_LINE',
                status: asset.status || 'ACTIVE'
            });
        } else {
            setFormData({
                name: '',
                description: '',
                purchaseDate: new Date().toISOString().split('T')[0],
                purchaseCost: '',
                salvageValue: '0',
                usefulLifeYears: '',
                depreciationMethod: 'STRAIGHT_LINE',
                status: 'ACTIVE'
            });
        }
        setError('');
    }, [asset, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = {
                ...formData,
                purchaseCost: parseFloat(formData.purchaseCost),
                salvageValue: parseFloat(formData.salvageValue),
                usefulLifeYears: parseInt(formData.usefulLifeYears),
            };

            if (asset) {
                await fixedAssetsAPI.update(asset.id, payload);
            } else {
                await fixedAssetsAPI.create(payload);
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error('Failed to save asset:', err);
            setError(err.response?.data?.message || 'Failed to save asset');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={asset ? 'Edit Asset' : 'Add Fixed Asset'}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="p-3 bg-ruby/10 border border-ruby/20 text-ruby rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <Input
                    label="Asset Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Office Laptop"
                />

                <div>
                    <label className="block text-sm font-medium text-silver mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                        placeholder="Asset details..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Purchase Date"
                        type="date"
                        name="purchaseDate"
                        value={formData.purchaseDate}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Purchase Cost"
                        type="number"
                        name="purchaseCost"
                        value={formData.purchaseCost}
                        onChange={handleChange}
                        required
                        placeholder="0.00"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Salvage Value"
                        type="number"
                        name="salvageValue"
                        value={formData.salvageValue}
                        onChange={handleChange}
                        placeholder="0.00"
                    />
                    <Input
                        label="Useful Life (Years)"
                        type="number"
                        name="usefulLifeYears"
                        value={formData.usefulLifeYears}
                        onChange={handleChange}
                        required
                        placeholder="e.g. 5"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-silver mb-1">Depreciation Method</label>
                    <select
                        name="depreciationMethod"
                        value={formData.depreciationMethod}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                    >
                        <option value="STRAIGHT_LINE">Straight Line</option>
                        <option value="DOUBLE_DECLINING">Double Declining Balance</option>
                    </select>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={loading}>
                        {asset ? 'Update Asset' : 'Add Asset'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default FixedAssetForm;
