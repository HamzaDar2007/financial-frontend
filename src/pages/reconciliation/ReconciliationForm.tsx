import { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { reconciliationsAPI, accountsAPI } from '../../services/api';

interface ReconciliationFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    reconciliation?: any;
}

const ReconciliationForm = ({ isOpen, onClose, onSuccess, reconciliation }: ReconciliationFormProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [accounts, setAccounts] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        accountId: '',
        statementDate: new Date().toISOString().split('T')[0],
        statementBalance: ''
    });

    useEffect(() => {
        if (isOpen) {
            fetchAccounts();
        }
    }, [isOpen]);

    useEffect(() => {
        if (reconciliation) {
            setFormData({
                accountId: reconciliation.accountId,
                statementDate: reconciliation.statementDate ? new Date(reconciliation.statementDate).toISOString().split('T')[0] : '',
                statementBalance: reconciliation.statementBalance?.toString() || ''
            });
        } else {
            setFormData({
                accountId: '',
                statementDate: new Date().toISOString().split('T')[0],
                statementBalance: ''
            });
        }
        setError('');
    }, [reconciliation, isOpen]);

    const fetchAccounts = async () => {
        try {
            const response = await accountsAPI.getAll();
            // Filter for bank accounts if possible, otherwise show all
            setAccounts(response.data);
        } catch (err) {
            console.error('Failed to fetch accounts:', err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                statementBalance: parseFloat(formData.statementBalance) || 0
            };

            if (reconciliation) {
                // Reconciliations are usually snapshots, but if we allow editing:
                // await reconciliationsAPI.update(reconciliation.id, payload);
                setError('Editing reconciliation is not supported yet.');
            } else {
                await reconciliationsAPI.create(payload);
                onSuccess();
                onClose();
            }
        } catch (err: any) {
            console.error('Failed to save reconciliation:', err);
            setError(err.response?.data?.message || 'Failed to save reconciliation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={reconciliation ? 'View Reconciliation' : 'New Reconciliation'}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="p-3 bg-ruby/10 border border-ruby/20 text-ruby rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-silver mb-1">Bank Account</label>
                    <select
                        name="accountId"
                        value={formData.accountId}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                        required
                    >
                        <option value="">Select Account</option>
                        {accounts.map(acc => (
                            <option key={acc.id} value={acc.id}>
                                {acc.code} - {acc.name}
                            </option>
                        ))}
                    </select>
                </div>

                <Input
                    label="Statement Date"
                    type="date"
                    name="statementDate"
                    value={formData.statementDate}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Statement Balance"
                    type="number"
                    name="statementBalance"
                    value={formData.statementBalance}
                    onChange={handleChange}
                    required
                    placeholder="0.00"
                />

                <div className="flex justify-end gap-3 mt-6">
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    {!reconciliation && (
                        <Button type="submit" isLoading={loading}>
                            Start Reconciliation
                        </Button>
                    )}
                </div>
            </form>
        </Modal>
    );
};

export default ReconciliationForm;
