import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { contactsAPI } from '../services/api';

const Contacts = () => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [contacts, setContacts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchContacts = async () => {
            if (!user?.defaultCompanyId) return;
            try {
                const response = await contactsAPI.getContacts(user.defaultCompanyId);
                setContacts(response.data);
            } catch (err) {
                console.error('Failed to fetch contacts:', err);
                setError('Failed to load contacts.');
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, [user]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-light text-white mb-2">{t('menu.contacts')}</h1>
                    <p className="text-silver">Customers & Vendors</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center gap-2"
                >
                    <PlusIcon className="w-5 h-5" />
                    New Contact
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
                    <div className="flex-1 text-silver text-sm font-medium">Name</div>
                    <div className="text-silver text-sm font-medium w-48">Email</div>
                    <div className="text-silver text-sm font-medium w-32">Phone</div>
                    <div className="text-silver text-sm font-medium w-32">Type</div>
                </div>

                <div>
                    {loading ? (
                        <div className="p-8 text-center text-silver">Loading...</div>
                    ) : contacts.length > 0 ? (
                        contacts.map((contact: any) => (
                            <div key={contact.id} className="flex items-center gap-4 p-4 border-b border-white/[0.05] hover:bg-white/[0.02]">
                                <div className="flex-1 text-white">{contact.name}</div>
                                <div className="text-silver text-sm w-48">{contact.email}</div>
                                <div className="text-silver text-sm w-32">{contact.phone}</div>
                                <div className="text-silver text-sm w-32">{contact.type}</div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-silver">No contacts found.</div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Contacts;
