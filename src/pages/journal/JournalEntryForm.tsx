import { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { journalEntriesAPI, accountsAPI } from '../../services/api';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface JournalEntryFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    entry?: any;
}

interface JournalLine {
    accountId: string;
    debit: string;
    credit: string;
    description: string;
}

const JournalEntryForm = ({ isOpen, onClose, onSuccess, entry }: JournalEntryFormProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [accounts, setAccounts] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        description: '',
        reference: '',
        lines: [
            { accountId: '', debit: '', credit: '', description: '' },
            { accountId: '', debit: '', credit: '', description: '' }
        ] as JournalLine[]
    });

    useEffect(() => {
        if (isOpen) {
            fetchAccounts();
        }
    }, [isOpen]);

    useEffect(() => {
        if (entry) {
            setFormData({
                date: entry.date ? new Date(entry.date).toISOString().split('T')[0] : '',
                description: entry.description,
                reference: entry.reference || '',
                lines: entry.lines.map((line: any) => ({
                    accountId: line.accountId,
                    debit: line.debit > 0 ? line.debit.toString() : '',
                    credit: line.credit > 0 ? line.credit.toString() : '',
                    description: line.description || ''
                }))
            });
        } else {
            setFormData({
                date: new Date().toISOString().split('T')[0],
                description: '',
                reference: '',
                lines: [
                    { accountId: '', debit: '', credit: '', description: '' },
                    { accountId: '', debit: '', credit: '', description: '' }
                ]
            });
        }
        setError('');
    }, [entry, isOpen]);

    const fetchAccounts = async () => {
        try {
            const response = await accountsAPI.getAll();
            setAccounts(response.data);
        } catch (err) {
            console.error('Failed to fetch accounts:', err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLineChange = (index: number, field: keyof JournalLine, value: string) => {
        const newLines = [...formData.lines];
        newLines[index] = { ...newLines[index], [field]: value };

        // If debit is entered, clear credit and vice versa
        if (field === 'debit' && value) newLines[index].credit = '';
        if (field === 'credit' && value) newLines[index].debit = '';

        setFormData(prev => ({ ...prev, lines: newLines }));
    };

    const addLine = () => {
        setFormData(prev => ({
            ...prev,
            lines: [...prev.lines, { accountId: '', debit: '', credit: '', description: '' }]
        }));
    };

    const removeLine = (index: number) => {
        if (formData.lines.length <= 2) return;
        setFormData(prev => ({
            ...prev,
            lines: prev.lines.filter((_, i) => i !== index)
        }));
    };

    const calculateTotals = () => {
        const totalDebit = formData.lines.reduce((sum, line) => sum + (parseFloat(line.debit) || 0), 0);
        const totalCredit = formData.lines.reduce((sum, line) => sum + (parseFloat(line.credit) || 0), 0);
        return { totalDebit, totalCredit };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { totalDebit, totalCredit } = calculateTotals();

        if (Math.abs(totalDebit - totalCredit) > 0.01) {
            setError(`Debits ($${totalDebit}) must equal Credits ($${totalCredit})`);
            setLoading(false);
            return;
        }

        if (totalDebit === 0) {
            setError('Journal entry cannot be empty');
            setLoading(false);
            return;
        }

        try {
            const payload = {
                ...formData,
                entries: formData.lines.map(line => ({
                    accountId: line.accountId,
                    debit: parseFloat(line.debit) || 0,
                    credit: parseFloat(line.credit) || 0,
                    description: line.description || formData.description
                })).filter(line => line.debit > 0 || line.credit > 0)
            };

            // Remove lines property as backend expects 'entries'
            // @ts-ignore
            delete payload.lines;

            if (entry) {
                // Journal entries are typically immutable, but if we allow editing:
                // await journalEntriesAPI.update(entry.id, payload);
                setError('Editing journal entries is not supported. Please reverse and create a new one.');
            } else {
                await journalEntriesAPI.create(payload);
                onSuccess();
                onClose();
            }
        } catch (err: any) {
            console.error('Failed to save journal entry:', err);
            setError(err.response?.data?.message || 'Failed to save journal entry');
        } finally {
            setLoading(false);
        }
    };

    const { totalDebit, totalCredit } = calculateTotals();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={entry ? 'View Journal Entry' : 'New Journal Entry'}
            maxWidth="4xl"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="p-3 bg-ruby/10 border border-ruby/20 text-ruby rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-3 gap-4">
                    <Input
                        label="Date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Reference"
                        name="reference"
                        value={formData.reference}
                        onChange={handleChange}
                        placeholder="e.g. INV-001"
                    />
                    <div className="col-span-1"></div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-silver mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                        placeholder="Entry description..."
                        required
                    />
                </div>

                <div className="space-y-2">
                    <div className="grid grid-cols-12 gap-2 text-sm text-silver font-medium px-2">
                        <div className="col-span-4">Account</div>
                        <div className="col-span-3">Description (Optional)</div>
                        <div className="col-span-2 text-right">Debit</div>
                        <div className="col-span-2 text-right">Credit</div>
                        <div className="col-span-1"></div>
                    </div>

                    {formData.lines.map((line, index) => (
                        <div key={index} className="grid grid-cols-12 gap-2 items-start">
                            <div className="col-span-4">
                                <select
                                    value={line.accountId}
                                    onChange={(e) => handleLineChange(index, 'accountId', e.target.value)}
                                    className="w-full px-3 py-2 bg-black/20 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-gold/50"
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
                            <div className="col-span-3">
                                <input
                                    type="text"
                                    value={line.description}
                                    onChange={(e) => handleLineChange(index, 'description', e.target.value)}
                                    className="w-full px-3 py-2 bg-black/20 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-gold/50"
                                    placeholder="Line description"
                                />
                            </div>
                            <div className="col-span-2">
                                <input
                                    type="number"
                                    value={line.debit}
                                    onChange={(e) => handleLineChange(index, 'debit', e.target.value)}
                                    className="w-full px-3 py-2 bg-black/20 border border-white/10 rounded-lg text-white text-sm text-right focus:outline-none focus:ring-1 focus:ring-gold/50"
                                    placeholder="0.00"
                                    step="0.01"
                                />
                            </div>
                            <div className="col-span-2">
                                <input
                                    type="number"
                                    value={line.credit}
                                    onChange={(e) => handleLineChange(index, 'credit', e.target.value)}
                                    className="w-full px-3 py-2 bg-black/20 border border-white/10 rounded-lg text-white text-sm text-right focus:outline-none focus:ring-1 focus:ring-gold/50"
                                    placeholder="0.00"
                                    step="0.01"
                                />
                            </div>
                            <div className="col-span-1 flex justify-center pt-2">
                                <button
                                    type="button"
                                    onClick={() => removeLine(index)}
                                    className="text-silver hover:text-ruby transition-colors"
                                    disabled={formData.lines.length <= 2}
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <Button type="button" variant="secondary" onClick={addLine} className="text-sm py-1">
                        <PlusIcon className="w-4 h-4 mr-1" /> Add Line
                    </Button>

                    <div className="flex gap-8 text-sm font-medium">
                        <div className="flex gap-4">
                            <span className="text-silver">Total Debit:</span>
                            <span className={totalDebit !== totalCredit ? 'text-ruby' : 'text-emerald'}>
                                {totalDebit.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-silver">Total Credit:</span>
                            <span className={totalDebit !== totalCredit ? 'text-ruby' : 'text-emerald'}>
                                {totalCredit.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-silver">Difference:</span>
                            <span className={Math.abs(totalDebit - totalCredit) > 0.01 ? 'text-ruby' : 'text-emerald'}>
                                {Math.abs(totalDebit - totalCredit).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    {!entry && (
                        <Button type="submit" isLoading={loading} disabled={Math.abs(totalDebit - totalCredit) > 0.01}>
                            Post Entry
                        </Button>
                    )}
                </div>
            </form>
        </Modal>
    );
};

export default JournalEntryForm;
