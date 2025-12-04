import { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { accountsAPI } from '../../services/api';

interface AccountFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    account?: any;
}

const AccountForm = ({ isOpen, onClose, onSuccess, account }: AccountFormProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [parentAccounts, setParentAccounts] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        code: '',
        accountName: '',
        accountType: 'ASSET',
        parentAccountId: '',
        description: ''
    });

    useEffect(() => {
        if (isOpen) {
            fetchParentAccounts();
        }
    }, [isOpen]);

    useEffect(() => {
        if (account) {
            setFormData({
                code: account.code || '',
                accountName: account.accountName,
                accountType: account.accountType,
                parentAccountId: account.parentAccountId || '',
                description: account.description || ''
            });
        } else {
            setFormData({
                code: '',
                accountName: '',
                accountType: 'ASSET',
                parentAccountId: '',
                description: ''
            });
        }
        setError('');
    }, [account, isOpen]);

    const fetchParentAccounts = async () => {
        try {
            const response = await accountsAPI.getAll();
            // Filter out current account if editing to avoid circular reference
            const filtered = account
                ? response.data.filter((a: any) => a.id !== account.id)
                : response.data;
            setParentAccounts(filtered);
        } catch (err) {
            console.error('Failed to fetch accounts:', err);
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
                parentAccountId: formData.parentAccountId || null
            };

            if (account) {
                await accountsAPI.update(account.id, payload);
            } else {
                await accountsAPI.create(payload);
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error('Failed to save account:', err);
            setError(err.response?.data?.message || 'Failed to save account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={account ? 'Edit Account' : 'New Account'}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="p-3 bg-ruby/10 border border-ruby/20 text-ruby rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                        <Input
                            label="Code"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            required
                            placeholder="1000"
                        />
                    </div>
                    <div className="col-span-2">
                        <Input
                            label="Account Name"
                            name="accountName"
                            value={formData.accountName}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Cash on Hand"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-silver mb-1">Account Type</label>
                    <select
                        name="accountType"
                        value={formData.accountType}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                    >
                        <option value="ASSET">Asset</option>
                        <option value="LIABILITY">Liability</option>
                        <option value="EQUITY">Equity</option>
                        <option value="REVENUE">Revenue</option>
                        <option value="EXPENSE">Expense</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-silver mb-1">Parent Account (Optional)</label>
                    <select
                        name="parentAccountId"
                        value={formData.parentAccountId}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                    >
                        <option value="">None (Top Level)</option>
                        {parentAccounts.map(acc => (
                            <option key={acc.id} value={acc.id}>
                                {acc.code} - {acc.accountName}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-silver mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                        placeholder="Account details..."
                    />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={loading}>
                        {account ? 'Update Account' : 'Create Account'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default AccountForm;
