import type { Company } from './common';

export interface Customer {
    id: string;
    name: string;
    email?: string;
    phone?: string;
}

export interface Trader {
    id: string;
    name: string;
}

export interface Broker {
    id: string;
    name: string;
}

export interface SalesOrderLine {
    id: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

export interface SalesOrder {
    id: string;
    company: Company;
    customer?: Customer;
    trader?: Trader;
    brokerage?: Broker;
    orderNumber: string;
    orderDate: string; // ISO Date
    status: 'Pending' | 'Confirmed' | 'Shipped' | 'Completed' | 'Cancelled';
    autoInvoicing: boolean;
    totalAmount: number;
    notes?: string;
    lines: SalesOrderLine[];
    createdAt: string;
    updatedAt: string;
}
