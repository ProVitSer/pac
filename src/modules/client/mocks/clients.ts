import { Client } from '../entities/client.entity';

export const clients = [
    {
        id: 1,
        company_name: 'Test Company',
        contact_person_name: 'Ivanov Ivan Ivanovich',
        phone: '79991234567',
        email: 'test@test.ru',
        client_id: 1,
        buh_id: 1,
        balance: 0,
    },
    {
        id: 2,
        company_name: 'Test Company 2',
        contact_person_name: 'Sidorov Ivan Ivanovich',
        phone: '79991234568',
        email: 'test1@test.ru',
        client_id: 2,
        buh_id: 2,
        balance: 0,
    },
] as unknown as Client[];
