import { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { invoicesAPI, customersAPI, suppliersAPI, itemsAPI } from '../../services/api';

interface InvoiceFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    invoice?: any;
}

interface InvoiceLine {
    itemId: string;
    description: string;
    quantity: number;
    unitPrice: number;
    discountPercentage: number;
    taxPercentage: number;
}

const InvoiceForm = ({ isOpen, onClose, onSuccess, invoice }: InvoiceFormProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [customers, setCustomers] = useState<any[]>([]);
    const [suppliers, setSuppliers] = useState<any[]>([]);
    const [items, setItems] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        invoiceType: 'SALES',
        customerId: '',
        supplierId: '',
        invoiceDate: new Date().toISOString().split('T')[0],
        dueDate: new Date().toISOString().split('T')[0],
        description: '',
        notes: '',
        lines: [] as InvoiceLine[]
    });

    useEffect(() => {
        if (isOpen) {
            fetchDependencies();
        }
    }, [isOpen]);

    useEffect(() => {
        if (invoice) {
            setFormData({
                invoiceType: invoice.invoiceType || invoice.type === 'sales' ? 'SALES' : 'PURCHASE',
                customerId: invoice.customer?.id || invoice.customerId || '',
                supplierId: invoice.supplier?.id || invoice.supplierId || '',
                invoiceDate: invoice.invoiceDate ? new Date(invoice.invoiceDate).toISOString().split('T')[0] : '',
                dueDate: invoice.dueDate ? new Date(invoice.dueDate).toISOString().split('T')[0] : '',
                description: invoice.description || '',
                notes: invoice.notes || '',
                lines: invoice.lines ? invoice.lines.map((l: any) => ({
                    itemId: l.itemId || l.item?.id || '',
                    description: l.description || '',
                    quantity: parseFloat(l.quantity) || 1,
                    unitPrice: parseFloat(l.unitPrice) || 0,
                    discountPercentage: parseFloat(l.discountPercentage) || 0,
                    taxPercentage: parseFloat(l.taxPercentage) || 0
                })) : []
            });
        } else {
            // Reset
            setFormData({
                invoiceType: 'SALES',
                customerId: '',
                supplierId: '',
                invoiceDate: new Date().toISOString().split('T')[0],
                dueDate: new Date().toISOString().split('T')[0],
                description: '',
                notes: '',
                lines: []
            });
            addLine(); // Add one empty line by default
        }
        setError('');
    }, [invoice, isOpen]);

    const fetchDependencies = async () => {
        try {
            const [custRes, suppRes, itemsRes] = await Promise.all([
                customersAPI.getAll(),
                suppliersAPI.getAll(),
                itemsAPI.getAll()
            ]);
            setCustomers(custRes.data);
            setSuppliers(suppRes.data);
            setItems(itemsRes.data);
        } catch (err) {
            console.error('Failed to fetch dependencies:', err);
            setError('Failed to load customers, suppliers, or items.');
        }
    };

    const addLine = () => {
        setFormData(prev => ({
            ...prev,
            lines: [...prev.lines, {
                itemId: '',
                description: '',
                quantity: 1,
                unitPrice: 0,
                discountPercentage: 0,
                taxPercentage: 0
            }]
        }));
    };

    const removeLine = (index: number) => {
        setFormData(prev => ({
            ...prev,
            lines: prev.lines.filter((_, i) => i !== index)
        }));
    };

    const updateLine = (index: number, field: keyof InvoiceLine, value: any) => {
        setFormData(prev => {
            const newLines = [...prev.lines];
            newLines[index] = { ...newLines[index], [field]: value };

            // Auto-fill details if item selected
            if (field === 'itemId') {
                const item = items.find(i => i.id === value);
                if (item) {
                    newLines[index].description = item.description || item.name;
                    newLines[index].unitPrice = prev.invoiceType === 'SALES'
                        ? parseFloat(item.salesPrice)
                        : parseFloat(item.purchasePrice);
                }
            }

            return { ...prev, lines: newLines };
        });
    };

    const calculateTotals = () => {
        let subtotal = 0;
        let totalTax = 0;
        let totalDiscount = 0;

        formData.lines.forEach(line => {
            const lineTotal = line.quantity * line.unitPrice;
            const discount = lineTotal * (line.discountPercentage / 100);
            const taxable = lineTotal - discount;
            const tax = taxable * (line.taxPercentage / 100);

            subtotal += lineTotal;
            totalDiscount += discount;
            totalTax += tax;
        });

        return {
            subtotal,
            totalDiscount,
            totalTax,
            total: subtotal - totalDiscount + totalTax
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = {
                ...formData,
                // Ensure numbers are sent as numbers/strings as expected by backend
                lines: formData.lines.map(l => ({
                    ...l,
                    quantity: Number(l.quantity),
                    unitPrice: Number(l.unitPrice),
                    discountPercentage: Number(l.discountPercentage),
                    taxPercentage: Number(l.taxPercentage)
                }))
            };

            if (invoice) {
                await invoicesAPI.update(invoice.id, payload);
            } else {
                await invoicesAPI.create(payload);
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error('Failed to save invoice:', err);
            setError(err.response?.data?.message || 'Failed to save invoice');
        } finally {
            setLoading(false);
        }
    };

    const totals = calculateTotals();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={invoice ? 'Edit Invoice' : 'New Invoice'}
        >
            <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto pr-2">
                {error && (
                    <div className="p-3 bg-ruby/10 border border-ruby/20 text-ruby rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-silver mb-1">Type</label>
                        <select
                            value={formData.invoiceType}
                            onChange={(e) => setFormData({ ...formData, invoiceType: e.target.value })}
                            className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        >
                            <option value="SALES">Sales Invoice</option>
                            <option value="PURCHASE">Purchase Invoice</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-silver mb-1">
                            {formData.invoiceType === 'SALES' ? 'Customer' : 'Supplier'}
                        </label>
                        <select
                            value={formData.invoiceType === 'SALES' ? formData.customerId : formData.supplierId}
                            onChange={(e) => setFormData({
                                ...formData,
                                [formData.invoiceType === 'SALES' ? 'customerId' : 'supplierId']: e.target.value
                            })}
                            className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                            required
                        >
                            <option value="">Select...</option>
                            {(formData.invoiceType === 'SALES' ? customers : suppliers).map(entity => (
                                <option key={entity.id} value={entity.id}>{entity.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Invoice Date"
                        type="date"
                        value={formData.invoiceDate}
                        onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
                        required
                    />
                    <Input
                        label="Due Date"
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        required
                    />
                </div>

                <Input
                    label="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description..."
                />

                {/* Line Items */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-white font-medium">Items</h3>
                        <Button type="button" variant="secondary" onClick={addLine} className="text-xs py-1">
                            <PlusIcon className="w-4 h-4" /> Add Item
                        </Button>
                    </div>

                    {formData.lines.map((line, index) => (
                        <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
                            <div className="flex justify-between items-start">
                                <span className="text-silver text-xs">Item #{index + 1}</span>
                                <button type="button" onClick={() => removeLine(index)} className="text-ruby hover:text-red-400">
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-12 gap-3">
                                <div className="col-span-4">
                                    <select
                                        value={line.itemId}
                                        onChange={(e) => updateLine(index, 'itemId', e.target.value)}
                                        className="w-full px-2 py-1 bg-black/20 border border-white/10 rounded text-sm text-white"
                                        required
                                    >
                                        <option value="">Select Item</option>
                                        {items.map(item => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <input
                                        type="number"
                                        value={line.quantity}
                                        onChange={(e) => updateLine(index, 'quantity', parseFloat(e.target.value))}
                                        className="w-full px-2 py-1 bg-black/20 border border-white/10 rounded text-sm text-white"
                                        placeholder="Qty"
                                        min="1"
                                    />
                                </div>
                                <div className="col-span-3">
                                    <input
                                        type="number"
                                        value={line.unitPrice}
                                        onChange={(e) => updateLine(index, 'unitPrice', parseFloat(e.target.value))}
                                        className="w-full px-2 py-1 bg-black/20 border border-white/10 rounded text-sm text-white"
                                        placeholder="Price"
                                    />
                                </div>
                                <div className="col-span-3 text-right text-white font-mono text-sm flex items-center justify-end">
                                    ${(line.quantity * line.unitPrice).toFixed(2)}
                                </div>
                            </div>

                            <input
                                type="text"
                                value={line.description}
                                onChange={(e) => updateLine(index, 'description', e.target.value)}
                                className="w-full px-2 py-1 bg-black/20 border border-white/10 rounded text-sm text-silver placeholder-gray-600"
                                placeholder="Item description..."
                            />
                        </div>
                    ))}
                </div>

                {/* Totals */}
                <div className="border-t border-white/10 pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-silver">
                        <span>Subtotal</span>
                        <span>${totals.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-silver">
                        <span>Discount</span>
                        <span>-${totals.totalDiscount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-silver">
                        <span>Tax</span>
                        <span>+${totals.totalTax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-medium text-gold pt-2 border-t border-white/10">
                        <span>Total</span>
                        <span>${totals.total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={loading}>
                        {invoice ? 'Update Invoice' : 'Create Invoice'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default InvoiceForm;
