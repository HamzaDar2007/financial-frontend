import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
    PlusIcon,
    DocumentTextIcon,
    ArrowDownTrayIcon,
    CheckCircleIcon,
    ClockIcon,
    PencilSquareIcon
} from '@heroicons/react/24/outline';
import { invoicesAPI } from '../services/api';
import InvoiceForm from './invoices/InvoiceForm';

interface Invoice {
    id: string;
    invoiceNo: string;
    type: 'sales' | 'purchase';
    customerName?: string;
    supplierName?: string;
    invoiceDate: string;
    dueDate: string;
    totalAmount: number;
    paidAmount: number;
    status: 'draft' | 'pending' | 'paid' | 'overdue';
}

const Invoices = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState<'all' | 'sales' | 'purchase'>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | undefined>(undefined);

    useEffect(() => {
        fetchInvoices();
    }, [filter]);

    const fetchInvoices = async () => {
        try {
            const params = filter !== 'all' ? { type: filter } : undefined;
            const response = await invoicesAPI.getAll(params);
            setInvoices(response.data);
        } catch (err) {
            console.error('Failed to fetch invoices:', err);
            setError('Failed to load invoices.');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setSelectedInvoice(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        setIsModalOpen(true);
    };

    const handleSuccess = () => {
        fetchInvoices();
        setIsModalOpen(false);
    };

    const handleDownloadPDF = async (id: string) => {
        try {
            const response = await invoicesAPI.getPDF(id);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice-${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('Failed to download PDF:', err);
            alert('Failed to download invoice PDF.');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid': return 'bg-emerald/20 text-emerald';
            case 'pending': return 'bg-gold/20 text-gold';
            case 'overdue': return 'bg-ruby/20 text-ruby';
            default: return 'bg-silver/20 text-silver';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'paid': return CheckCircleIcon;
            case 'pending': return ClockIcon;
            case 'overdue': return ClockIcon;
            default: return DocumentTextIcon;
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-light text-white mb-2">Invoices</h1>
                    <p className="text-silver">Manage sales and purchase invoices</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreate}
                    className="btn-primary flex items-center gap-2"
                >
                    <PlusIcon className="w-5 h-5" />
                    Create Invoice
                </motion.button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
                {['all', 'sales', 'purchase'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f as any)}
                        className={`px-4 py-2 rounded-lg transition-all capitalize ${filter === f
                            ? 'bg-gold/20 text-gold border border-gold/30'
                            : 'bg-charcoal text-silver border border-white/[0.08]'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {error && (
                <div className="bg-ruby/10 border border-ruby/20 text-ruby p-4 rounded-lg">
                    {error}
                </div>
            )}

            {/* Invoices Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full p-8 text-center text-silver">Loading invoices...</div>
                ) : invoices.length > 0 ? (
                    invoices.map((invoice, index) => {
                        const StatusIcon = getStatusIcon(invoice.status);
                        const balance = invoice.totalAmount - invoice.paidAmount;

                        return (
                            <motion.div
                                key={invoice.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -5 }}
                                className="card group relative"
                            >
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleEdit(invoice); }}
                                        className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white"
                                    >
                                        <PencilSquareIcon className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <p className="text-gold font-mono text-lg">{invoice.invoiceNo}</p>
                                        <p className="text-silver text-sm">
                                            {invoice.type === 'sales' ? invoice.customerName : invoice.supplierName}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(invoice.status)}`}>
                                        <StatusIcon className="w-3 h-3" />
                                        {invoice.status}
                                    </span>
                                </div>

                                {/* Dates */}
                                <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-white/[0.05]">
                                    <div>
                                        <p className="text-silver text-xs mb-1">Invoice Date</p>
                                        <p className="text-white text-sm">
                                            {new Date(invoice.invoiceDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-silver text-xs mb-1">Due Date</p>
                                        <p className="text-white text-sm">
                                            {new Date(invoice.dueDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Amounts */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between">
                                        <span className="text-silver text-sm">Total Amount</span>
                                        <span className="text-white font-mono">
                                            ${invoice.totalAmount.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-silver text-sm">Paid Amount</span>
                                        <span className="text-emerald font-mono">
                                            ${invoice.paidAmount.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t border-white/[0.05]">
                                        <span className="text-white font-medium">Balance</span>
                                        <span className={`font-mono font-medium ${balance > 0 ? 'text-ruby' : 'text-emerald'}`}>
                                            ${balance.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleDownloadPDF(invoice.id)}
                                        className="flex-1 btn-secondary text-sm flex items-center justify-center gap-2"
                                    >
                                        <ArrowDownTrayIcon className="w-4 h-4" />
                                        PDF
                                    </motion.button>
                                    {invoice.status !== 'paid' && (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex-1 btn-primary text-sm"
                                        >
                                            Mark Paid
                                        </motion.button>
                                    )}
                                </div>

                                {/* Type Badge */}
                                <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <span className={`px-2 py-1 rounded text-xs ${invoice.type === 'sales'
                                        ? 'bg-emerald/20 text-emerald'
                                        : 'bg-blue-500/20 text-blue-400'
                                        }`}>
                                        {invoice.type}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })
                ) : (
                    <div className="col-span-full p-8 text-center text-silver">No invoices found. Click "Create Invoice" to add one.</div>
                )}
            </div>

            <InvoiceForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
                invoice={selectedInvoice}
            />
        </div>
    );
};

export default Invoices;
