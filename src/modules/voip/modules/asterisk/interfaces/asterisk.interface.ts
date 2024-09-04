import { CreateTrunkData } from '@app/modules/voip/interfaces/voip.interface';

export interface UsersInterface {
    id: number;
    email: string;
    phoneNumber?: string;
    name: string;
    password: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface UserDataAdapter {
    email: string;
    phoneNumber?: string;
    name: string;
    password: string;
    is_active: boolean;
    registered_date: Date;
}

export interface CreateUserData {
    email: string;
    name: string;
    password: string;
    phone_number: string;
}

export interface CreateTrunkDataWithTrunkId extends CreateTrunkData {
    trunkId: string;
}

export interface AsteriskOriginateResult {
    uniqueid: string;
}
