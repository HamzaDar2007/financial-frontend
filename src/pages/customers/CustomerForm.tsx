import { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { customersAPI } from '../../services/api';

interface CustomerFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    customer?: any;
}

const CustomerForm = ({ isOpen, onClose, onSuccess, customer }: CustomerFormProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        code: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        taxId: '',
        creditLimit: '',
        paymentTerms: '',
        isActive: true
    });

    useEffect(() => {
        if (customer) {
            setFormData({
                code: customer.code || '',
                name: customer.name,
                email: customer.email || '',
                phone: customer.phone || '',
                address: customer.address || '',
                taxId: customer.taxId || '',
                creditLimit: customer.creditLimit || '0',
                paymentTerms: customer.paymentTerms || '0',
                isActive: customer.isActive ?? true
            });
        } else {
            setFormData({
                code: '',
                name: '',
                email: '',
                phone: '',
                address: '',
                taxId: '',
                creditLimit: '0',
                paymentTerms: '30',
                isActive: true
            });
        }
        setError('');
    }, [customer, isOpen]);

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
                creditLimit: parseFloat(formData.creditLimit) || 0,
                paymentTerms: parseInt(formData.paymentTerms) || 0
            };

            if (customer) {
                await customersAPI.update(customer.id, payload);
            } else {
                await customersAPI.create(payload);
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error('Failed to save customer:', err);
            setError(err.response?.data?.message || 'Failed to save customer');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={customer ? 'Edit Customer' : 'Add Customer'}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="p-3 bg-ruby/10 border border-ruby/20 text-ruby rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Customer Code"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        required
                        placeholder="e.g. CUST-001"
                    />
                    <Input
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Company Name"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                    />
                    <Input
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 890"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-silver mb-1">Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                        placeholder="Billing Address..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Tax ID"
                        name="taxId"
                        value={formData.taxId}
                        onChange={handleChange}
                        placeholder="VAT/Tax Number"
                    />
                    <Input
                        label="Credit Limit"
                        type="number"
                        name="creditLimit"
                        value={formData.creditLimit}
                        onChange={handleChange}
                        placeholder="0.00"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Payment Terms (Days)"
                        type="number"
                        name="paymentTerms"
                        value={formData.paymentTerms}
                        onChange={handleChange}
                        placeholder="30"
                    />
                    <div>
                        <label className="block text-sm font-medium text-silver mb-1">Status</label>
                        <select
                            name="isActive"
                            value={formData.isActive ? 'true' : 'false'}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                            className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                        >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={loading}>
                        {customer ? 'Update Customer' : 'Add Customer'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default CustomerForm;
