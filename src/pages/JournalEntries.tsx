import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PlusIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../context/LanguageContext';
<<<<<<< HEAD
import { journalEntriesAPI } from '../services/api';
import JournalEntryForm from './journal/JournalEntryForm';

const JournalEntries = () => {
    const { t } = useLanguage();
    const [entries, setEntries] = useState<any[]>([]);
=======
import { useAuth } from '../context/AuthContext';
import { journalEntriesAPI, financialAPI } from '../services/api';
import type { JournalEntry } from '../types';

const JournalEntries = () => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [entries, setEntries] = useState<JournalEntry[]>([]);
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState<any | undefined>(undefined);

    useEffect(() => {
<<<<<<< HEAD
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const response = await journalEntriesAPI.getAll();
            setEntries(response.data);
        } catch (err) {
            console.error('Failed to fetch journal entries:', err);
            setError('Failed to load journal entries.');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setSelectedEntry(undefined);
        setIsModalOpen(true);
    };

    const handleView = (entry: any) => {
        setSelectedEntry(entry);
        setIsModalOpen(true);
    };

    const handleSuccess = () => {
        fetchEntries();
        setIsModalOpen(false);
=======
        const fetchEntries = async () => {
            try {
                const response = await journalEntriesAPI.getAll();
                setEntries(response.data);
            } catch (err) {
                console.error('Failed to fetch journal entries:', err);
                setError('Failed to load journal entries.');
            } finally {
                setLoading(false);
            }
        };

        fetchEntries();
    }, []);

    const calculateTotal = (entry: JournalEntry) => {
        return entry.lines.reduce((sum, line) => sum + Number(line.debit), 0);
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-light text-white mb-2">{t('menu.journal')}</h1>
                    <p className="text-silver">Financial Journal Entries</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreate}
                    className="btn-primary flex items-center gap-2"
                >
                    <PlusIcon className="w-5 h-5" />
                    New Entry
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
                    <div className="flex-1 text-silver text-sm font-medium">Description</div>
                    <div className="text-silver text-sm font-medium w-32">Reference</div>
                    <div className="text-silver text-sm font-medium w-32">Date</div>
                    <div className="text-silver text-sm font-medium w-32">Amount</div>
                    <div className="text-silver text-sm font-medium w-20 text-right">Actions</div>
                </div>

                <div>
                    {loading ? (
                        <div className="p-8 text-center text-silver">Loading...</div>
                    ) : entries.length > 0 ? (
<<<<<<< HEAD
                        entries.map((entry: any) => (
                            <div key={entry.id} className="flex items-center gap-4 p-4 border-b border-white/[0.05] hover:bg-white/[0.02] group">
                                <div className="flex-1 text-white">{entry.description}</div>
                                <div className="text-silver text-sm w-32">{entry.reference}</div>
                                <div className="text-silver text-sm w-32">{new Date(entry.date).toLocaleDateString()}</div>
                                <div className="text-white font-mono w-32">{entry.totalAmount} {t('currency')}</div>
                                <div className="w-20 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleView(entry)}
                                        className="p-2 text-silver hover:text-white hover:bg-white/10 rounded-full"
                                        title="View Details"
                                    >
                                        <EyeIcon className="w-4 h-4" />
                                    </button>
                                </div>
=======
                        entries.map((entry) => (
                            <div key={entry.id} className="flex items-center gap-4 p-4 border-b border-white/[0.05] hover:bg-white/[0.02]">
                                <div className="flex-1 text-white">{entry.description || 'Journal Entry'}</div>
                                <div className="text-silver text-sm w-32">{entry.reference || '-'}</div>
                                <div className="text-silver text-sm w-32">{new Date(entry.entryDate).toLocaleDateString()}</div>
                                <div className="text-white font-mono w-32">{calculateTotal(entry).toLocaleString()} {t('currency')}</div>
>>>>>>> 976e418eb7a4e2ecd6cfe2374f0a495c344c27b3
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-silver">No journal entries found.</div>
                    )}
                </div>
            </motion.div>

            <JournalEntryForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
                entry={selectedEntry}
            />
        </div>
    );
};

export default JournalEntries;
