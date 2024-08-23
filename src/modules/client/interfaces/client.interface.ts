export interface UniqueClientFields {
    phone: string;
    email: string;
}

export interface ClientInterface {
    id: number;
    client_id: number;
    company_name: string;
    contact_person_name: string;
    phone: string;
    email: string;
    buh_id: string | null;
    balance: number;
    deleted: boolean;
    created_at: Date;
    updated_at: Date;
}
