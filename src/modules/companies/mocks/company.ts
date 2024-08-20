import { Company } from '../entities/company.entity';

export const companies = [
    {
        id: 1,
        name: 'Test Company',
        contact_person_name: 'Ivanov Ivan Ivanovich',
        phone: '79991234567',
        email: 'test@test.ru',
    },
    {
        id: 2,
        name: 'Test Company 2',
        contact_person_name: 'Sidorov Ivan Ivanovich',
        phone: '79991234568',
        email: 'test1@test.ru',
    },
] as Company[];
