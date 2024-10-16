import { CreateTrunkData, UpdateTrunkData } from '@app/modules/voip/interfaces/voip.interface';
import { PsAuths } from '../entities/ps-auths.entity';
import { PsEndpointIdIps } from '../entities/ps-endpointId-ips.entity';
import { PsAors } from '../entities/ps-aors.entity';
import { PsEndpoints } from '../entities/ps-endpoints.entity';
import { PsRegistrations } from '../entities/ps-registrations.entity';

export interface UsersInterface {
    id: number;
    email: string;
    phoneNumber?: string;
    name: string;
    password: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserDataAdapter {
    email: string;
    phoneNumber?: string;
    name: string;
    password: string;
    isActive: boolean;
    registeredDate: Date;
}

export interface CreateUserData {
    email: string;
    name: string;
    password: string;
    phoneNumber: string;
}

export interface CreateTrunkDataWithTrunkId extends CreateTrunkData {
    trunkId: string;
}

export interface AsteriskOriginateResult {
    uniqueid: string;
}

export interface UpdateTrunkDataWithTrunkId extends UpdateTrunkData {
    trunkId: string;
    originalTrunk: TrunkData;
}

export interface TrunkData {
    psAors: PsAors;
    psAuths: PsAuths;
    psEndpointIdIps: PsEndpointIdIps;
    psRegistrations: PsRegistrations;
    psEndpoints: PsEndpoints;
}
