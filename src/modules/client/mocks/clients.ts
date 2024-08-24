import { Client } from '../entities/client.entity';

export const clients = [
    {
        id: 1,
        client_id: 1724275996401,
        company_name: 'Test Company',
        contact_person_name: 'Ivanov Ivan Ivanovich',
        phone: '79991234567',
        email: 'test@test.ru',
        buh_id: 1,
        balance: 0,
    },
    {
        id: 2,
        client_id: 1724275996402,
        company_name: 'Test Company 2',
        contact_person_name: 'Sidorov Ivan Ivanovich',
        phone: '79991234568',
        email: 'test1@test.ru',
        buh_id: 2,
        balance: 0,
    },
    {
        id: 3,
        client_id: 1724275996403,
        company_name: 'Test Company 3',
        contact_person_name: 'Sokolov Ivan Ivanovich',
        phone: '79991234569',
        email: 'test2@test.ru',
        buh_id: 2,
        balance: 0,
    },
] as unknown as Client[];
