import { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { itemsAPI } from '../../services/api';

interface ItemFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    item?: any;
}

const ItemForm = ({ isOpen, onClose, onSuccess, item }: ItemFormProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        type: 'PRODUCT',
        salesPrice: '',
        purchasePrice: '',
        description: '',
        stockQuantity: ''
    });

    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name,
                sku: item.sku || '',
                type: item.type || 'PRODUCT',
                salesPrice: item.salesPrice || '',
                purchasePrice: item.purchasePrice || '',
                description: item.description || '',
                stockQuantity: item.stockQuantity || '0'
            });
        } else {
            setFormData({
                name: '',
                sku: '',
                type: 'PRODUCT',
                salesPrice: '',
                purchasePrice: '',
                description: '',
                stockQuantity: '0'
            });
        }
        setError('');
    }, [item, isOpen]);

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
                salesPrice: parseFloat(formData.salesPrice) || 0,
                purchasePrice: parseFloat(formData.purchasePrice) || 0,
                stockQuantity: parseInt(formData.stockQuantity) || 0
            };

            if (item) {
                await itemsAPI.update(item.id, payload);
            } else {
                await itemsAPI.create(payload);
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error('Failed to save item:', err);
            setError(err.response?.data?.message || 'Failed to save item');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={item ? 'Edit Item' : 'New Product/Service'}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="p-3 bg-ruby/10 border border-ruby/20 text-ruby rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <Input
                    label="Item Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Web Hosting"
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="SKU"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        placeholder="e.g. SRV-001"
                    />
                    <div>
                        <label className="block text-sm font-medium text-silver mb-1">Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                        >
                            <option value="PRODUCT">Product</option>
                            <option value="SERVICE">Service</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Sales Price"
                        type="number"
                        name="salesPrice"
                        value={formData.salesPrice}
                        onChange={handleChange}
                        required
                        placeholder="0.00"
                    />
                    <Input
                        label="Purchase Price"
                        type="number"
                        name="purchasePrice"
                        value={formData.purchasePrice}
                        onChange={handleChange}
                        placeholder="0.00"
                    />
                </div>

                {formData.type === 'PRODUCT' && (
                    <Input
                        label="Initial Stock"
                        type="number"
                        name="stockQuantity"
                        value={formData.stockQuantity}
                        onChange={handleChange}
                        placeholder="0"
                    />
                )}

                <div>
                    <label className="block text-sm font-medium text-silver mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                        placeholder="Item details..."
                    />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={loading}>
                        {item ? 'Update Item' : 'Create Item'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default ItemForm;
