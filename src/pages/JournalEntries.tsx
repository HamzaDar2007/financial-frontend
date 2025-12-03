import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../context/LanguageContext';
import { journalEntriesAPI } from '../services/api';

const JournalEntries = () => {
    const { t } = useLanguage();
    const [entries, setEntries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
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
                </div>

                <div>
                    {loading ? (
                        <div className="p-8 text-center text-silver">Loading...</div>
                    ) : entries.length > 0 ? (
                        entries.map((entry: any) => (
                            <div key={entry.id} className="flex items-center gap-4 p-4 border-b border-white/[0.05] hover:bg-white/[0.02]">
                                <div className="flex-1 text-white">{entry.description}</div>
                                <div className="text-silver text-sm w-32">{entry.reference}</div>
                                <div className="text-silver text-sm w-32">{new Date(entry.date).toLocaleDateString()}</div>
                                <div className="text-white font-mono w-32">{entry.totalAmount} {t('currency')}</div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-silver">No journal entries found.</div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default JournalEntries;
