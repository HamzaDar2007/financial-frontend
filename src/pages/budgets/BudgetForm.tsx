import { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { budgetsAPI, fiscalYearsAPI } from '../../services/api';

interface BudgetFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    budget?: any;
}

const BudgetForm = ({ isOpen, onClose, onSuccess, budget }: BudgetFormProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fiscalYears, setFiscalYears] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        name: '',
        fiscalYearId: '',
        totalAmount: '',
        description: ''
    });

    useEffect(() => {
        if (isOpen) {
            fetchFiscalYears();
        }
    }, [isOpen]);

    useEffect(() => {
        if (budget) {
            setFormData({
                name: budget.name,
                fiscalYearId: budget.fiscalYearId || budget.fiscalYear?.id || '',
                totalAmount: budget.totalAmount || '',
                description: budget.description || ''
            });
        } else {
            setFormData({
                name: '',
                fiscalYearId: '',
                totalAmount: '',
                description: ''
            });
        }
        setError('');
    }, [budget, isOpen]);

    const fetchFiscalYears = async () => {
        try {
            const response = await fiscalYearsAPI.getAll();
            setFiscalYears(response.data);
        } catch (err) {
            console.error('Failed to fetch fiscal years:', err);
            // Don't block form if fiscal years fail, maybe user can type ID or we handle it gracefully
        }
    };

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
                totalAmount: parseFloat(formData.totalAmount) || 0
            };

            if (budget) {
                await budgetsAPI.update(budget.id, payload);
            } else {
                await budgetsAPI.create(payload);
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error('Failed to save budget:', err);
            setError(err.response?.data?.message || 'Failed to save budget');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={budget ? 'Edit Budget' : 'Create Budget'}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="p-3 bg-ruby/10 border border-ruby/20 text-ruby rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <Input
                    label="Budget Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Annual Marketing Budget"
                />

                <div>
                    <label className="block text-sm font-medium text-silver mb-1">Fiscal Year</label>
                    <select
                        name="fiscalYearId"
                        value={formData.fiscalYearId}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                        required
                    >
                        <option value="">Select Fiscal Year</option>
                        {fiscalYears.map(fy => (
                            <option key={fy.id} value={fy.id}>
                                {fy.name} ({new Date(fy.startDate).getFullYear()})
                            </option>
                        ))}
                    </select>
                </div>

                <Input
                    label="Total Amount"
                    type="number"
                    name="totalAmount"
                    value={formData.totalAmount}
                    onChange={handleChange}
                    required
                    placeholder="0.00"
                />

                <div>
                    <label className="block text-sm font-medium text-silver mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                        placeholder="Budget details..."
                    />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={loading}>
                        {budget ? 'Update Budget' : 'Create Budget'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default BudgetForm;
