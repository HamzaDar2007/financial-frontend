export interface User {
    id: string;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    defaultCompanyId?: string;
}

export interface Company {
    id: string;
    name: string;
    taxId?: string;
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
    currency: string;
}
