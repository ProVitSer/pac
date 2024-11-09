import { Client } from '../entities/client.entity';

export const clients = [
    {
        id: 1,
        clientId: 1724275996401,
        companyName: 'Test Company',
        contactPersonName: 'Ivanov Ivan Ivanovich',
        phone: '79991234567',
        email: 'test@test.ru',
        buhId: 1,
        balance: 0,
    },
    {
        id: 2,
        clientId: 1724275996402,
        companyName: 'Test Company 2',
        contactPersonName: 'Sidorov Ivan Ivanovich',
        phone: '79991234568',
        email: 'test1@test.ru',
        buhId: 2,
        balance: 0,
    },
    {
        id: 3,
        clientId: 1724275996403,
        companyNamecompanyName: 'Test Company 3',
        contactPersonName: 'Sokolov Ivan Ivanovich',
        phone: '79991234569',
        email: 'test2@test.ru',
        buhId: 2,
        balance: 0,
    },
] as unknown as Client[];
