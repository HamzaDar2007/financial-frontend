import type { Company, User } from './common';

export type AccountType = 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
export type BalanceType = 'DEBIT' | 'CREDIT';
export type EntryType = 'GENERAL' | 'SALES' | 'PURCHASE' | 'PAYMENT' | 'RECEIPT';

export interface Account {
    id: string;
    company: Company;
    accountName: string;
    accountType: AccountType;
    parentAccountId?: string;
    currency?: string;
    initialBalance: number;
    initialBalanceType?: BalanceType;
    createdAt: string;
    updatedAt: string;
    // Frontend specific properties (optional)
    children?: Account[];
    balance?: number; // Calculated on frontend or future backend update
}

export interface JournalLine {
    id: string;
    account: Account;
    debit: number;
    credit: number;
    description?: string;
}

export interface JournalEntry {
    id: string;
    company: Company;
    entryDate: string; // ISO Date string
    reference?: string;
    description?: string;
    createdBy?: User;
    entryType: EntryType;
    lines: JournalLine[];
    createdAt: string;
    updatedAt: string;
}
