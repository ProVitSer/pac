export interface UniqueClientFields {
    phone: string;
    email: string;
}

export interface ClientInterface {
    id: number;
    clientId: number;
    companyName: string;
    contactPersonName: string;
    phone: string;
    email: string;
    buhId?: string | null;
    balance: number;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
