import { ApplicationServiceType } from '@app/common/interfaces/enums';
import { Client } from '../../../modules/client/entities/client.entity';
import { Voip } from '../entities/voip.entity';
import { OriginateCallStatus, TrunkRegistryStatus } from './voip.enum';

export interface VoipInterface {
    id: number;
    client: Client;
    trunkId: string;
    applicationServiceType: ApplicationServiceType;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateTrunkData {
    client: Client;
    applicationServiceType: ApplicationServiceType;
    authId: string;
    authPassword: string;
    pbxIp: string;
}
export interface TrunkDataResult {
    trunkId: string;
    trunkStatus: TrunkRegistryStatus;
    trunkData: {
        authId: string;
        authPassword: string;
        pbxIp: string;
    };
}

export interface SendCallData {
    clientId: number;
    trunkId: string;
    dstNumber: string;
    srcNumber: string;
}

export interface SendCallResult {
    uniqCallId?: string;
    originateCallStatus: OriginateCallStatus;
}

export interface SendCallWithAudioData extends SendCallData {
    audioPath: string;
}

export interface CreateTrunkResult {
    trunkId: string;
}
export interface VoipPbxService {
    addTrunk(data: CreateTrunkData): Promise<CreateTrunkResult>;
    updateTrunkRegisterStatus(trunkId: string): Promise<void>;
    getTrunkInfo(trunkId: string): Promise<TrunkInfo>;
    sendCall(data: SendCallData): Promise<SendCallResult>;
    updateTrunk(data: UpdateTrunkData): Promise<UpdateTrunkResult>;
    deleteTrunk(trunkId: string): Promise<void>;
    sendCall(data: SendCallData): Promise<SendCallResult>;
    sendCallWithAudio(data: SendCallWithAudioData): Promise<SendCallResult>;
}

export interface VoipCreateTrunkResult {
    trunkStatus: TrunkRegistryStatus;
}

export interface UpdateTrunkResult extends CreateTrunkResult {}

export interface UpdateTrunkData {
    client: Client;
    voip: Voip;
    trunkId: string;
    authId?: string;
    authPassword?: string;
    pbxIp?: string;
}

export interface TrunkInfo {
    authId: string;
    authPassword: string;
    pbxIp: string;
}
